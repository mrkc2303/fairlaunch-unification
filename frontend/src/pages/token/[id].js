
  
  import { useRouter } from "next/router";
  import { useState, useEffect } from "react";
  import Header from "../../components/Header";
  import Image from "next/image";
  import { getNetworkConfig } from "../../constants/networkMapping"; // ✅ Import network config
  import BondingCurveChart from "../../components/BondingCurveChart";
  import { useCampaigns } from "../../context/CampaignContext"; 
  import { ethers } from "ethers";
  import ERC20ABI from "../../constants/ERC20ABI.json";
  import BondingCurveABI from "../../constants/BondingCurveABI.json";
  import { useAccount } from "wagmi";
  import Loader from "../../components/Loader"
  
  export default function TokenDetail() {
      const router = useRouter();
      const { id } = router.query;
      const { campaigns } = useCampaigns();
      const { address } = useAccount();
    
      const [token, setToken] = useState(null);
      const [tradeType, setTradeType] = useState("buy");
      const [amount, setAmount] = useState(0);
      const [balance, setBalance] = useState(null);
      const [holders, setHolders] = useState([]);
      const [bondingCurveHoldings, setBondingCurveHoldings] = useState();
      const [provider, setProvider] = useState(null);
      const [netConfig, setNetConfig] = useState(null);
      const [loading, setLoading] = useState(false);
    
      // ✅ Fetch Network Config inside useEffect
      useEffect(() => {
        const fetchNetworkConfig = async () => {
          const config = await getNetworkConfig(); // ✅ Fetch config here
          setNetConfig(config);
          setProvider(new ethers.JsonRpcProvider(config.rpcUrl)); // ✅ Set provider after fetching
        };
    
        fetchNetworkConfig();
      }, []);
    
      // ✅ Fetch Token Data
      useEffect(() => {
        if (!id || !campaigns.length || !netConfig) return;
    
        const foundToken = campaigns.find((t) => t.tokenAddress.toLowerCase() === id.toLowerCase());
        if (foundToken) {
          setToken({
            ...foundToken,
            marketCap: 50000, // Placeholder
            supply: 1000000, // Placeholder
            price: 1.5, // Placeholder
            image: foundToken.image !== "test" ? foundToken.image : `https://picsum.photos/400/300?random=${foundToken.tokenAddress}`,
          });
        }
      }, [id, campaigns, netConfig]);
    
      // ✅ Fetch USDC Balance
      useEffect(() => {
        if (!address || !netConfig || !provider) return;
    
        const getBalance = async () => {
          try {
            const contract = new ethers.Contract(netConfig.USDCToken, ERC20ABI, provider);
            const bal = await contract.balanceOf(address);
            setBalance(ethers.formatUnits(bal, 6));
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        };
    
        getBalance();
      }, [address, netConfig, provider]);
    
      // ✅ Fetch Holder Distribution
      useEffect(() => {
        if (!token || !netConfig || !provider) return;
    
        const getHolderDistribution = async () => {
          try {
            const TRANSFER_EVENT_TOPIC = ethers.id("Transfer(address,address,uint256)");
            const MAX_BLOCK_RANGE = 50000;
            const latestBlock = await provider.getBlockNumber();
            let holderBalances = {};
    
            let fromBlock = netConfig.startBlock; // ✅ Use netConfig dynamically
            while (fromBlock <= latestBlock) {
              const toBlock = Math.min(fromBlock + MAX_BLOCK_RANGE, latestBlock);
              console.log(`Fetching logs from ${fromBlock} to ${toBlock}...`);
    
              const logs = await provider.getLogs({
                address: token.tokenAddress,
                fromBlock: ethers.toBeHex(fromBlock),
                toBlock: ethers.toBeHex(toBlock),
                topics: [TRANSFER_EVENT_TOPIC],
              });
    
              // ✅ Process logs
              for (const log of logs) {
                const from = "0x" + log.topics[1].slice(26);
                const to = "0x" + log.topics[2].slice(26);
                const amount = ethers.getBigInt(log.data);
    
                if (!holderBalances[to]) holderBalances[to] = BigInt(0);
                if (!holderBalances[from]) holderBalances[from] = BigInt(0);
    
                holderBalances[to] += amount;
                holderBalances[from] -= amount;
              }
    
              fromBlock = toBlock + 1;
            }
    
            // ✅ Fetch total supply
            const tokenContract = new ethers.Contract(token.tokenAddress, ERC20ABI, provider);
            const totalSupplyRaw = await tokenContract.totalSupply();
            const totalSupply = parseFloat(ethers.formatUnits(totalSupplyRaw, 18));
    
            let bondingCurveHoldings = 0;
    
            // ✅ Compute percentages
            const holderArray = Object.entries(holderBalances)
              .map(([addr, bal]) => {
                let balance = parseFloat(ethers.formatUnits(bal, 18));
    
                if (addr.toLowerCase() === "0x0000000000000000000000000000000000000000") {
                  return null;
                }
    
                if (addr.toLowerCase() === netConfig.bonding.toLowerCase()) {
                  bondingCurveHoldings = balance;
                }
    
                return {
                  address: addr,
                  balance: balance,
                  percentage: ((balance / totalSupply) * 100).toFixed(2) + "%",
                };
              })
              .filter((holder) => holder !== null)
              .sort((a, b) => a.balance - b.balance);
    
            setHolders(holderArray);
            setBondingCurveHoldings(bondingCurveHoldings);
          } catch (error) {
            console.error("Error fetching holder distribution:", error);
          }
        };
    
        getHolderDistribution();
      }, [token, netConfig, provider]);


    const handleBuy = async () => {
        if (!address  || !token || !amount || amount <= 0) {
        alert("Invalid transaction. Check wallet connection and input.");
        return;
        }
    
        setLoading(true);
    
        try {
        const signer = await provider.getSigner();
        const usdcContract = new ethers.Contract(netConfig?.USDCToken, ERC20ABI, signer);
        const bondingCurveContract = new ethers.Contract(netConfig?.bonding, BondingCurveABI, signer);
    
        // ✅ Convert amount to USDC's decimal format (6 decimals)
        const usdcAmount = ethers.parseUnits(amount.toString(), 6);
    
        // ✅ Step 1: Check Allowance
        const allowance = await usdcContract.allowance(address, bonding);
        if (allowance < usdcAmount) {
            console.log("Approving USDC spending...");
            const approveTx = await usdcContract.approve(bonding, usdcAmount);
            await approveTx.wait();
            console.log("Approval successful!");
        }
    
        // ✅ Step 2: Buy Token
        console.log("Buying token...");
        const buyTx = await bondingCurveContract.buyToken(token.tokenAddress, usdcAmount);
        await buyTx.wait();
        console.log("Token purchase successful!");
    
        alert("Token purchased successfully!");
    
        // ✅ Refresh balance after purchase
        const newBalance = await usdcContract.balanceOf(address);
        setBalance(ethers.formatUnits(newBalance, 6));
        } catch (error) {
        console.error("Error buying token:", error);
        alert("Transaction failed! Check console for details.");
        }
    
        setLoading(false);
    };
    
    if (!token) return <div className="text-white text-center mt-20">Loading...</div>;
    
  
    return (
      <>
        {loading ? <Loader /> : <></>}
        <Header />
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Bonding Curve Chart + Token Image */}
            <div className="bg-[#1A1A2E] p-6 rounded-lg border border-[#292B3A]">
              <BondingCurveChart totalSupply={token.supply} bondingCurveHoldings={bondingCurveHoldings} />
  
              <div className="mt-6 text-center">
                  <Image src={token.image} alt={token.tokenName} width={300} height={200} className="rounded-lg mx-auto" />
                  <h3 className="text-xl text-white mt-4">{token.tokenName} ({token.tokenTicker})</h3>
                  <p className="text-gray-400">Market Cap: ${token.marketCap ? token.marketCap.toLocaleString() : "Loading..."}</p>
                  <p className="text-gray-400">Total Supply: {token.supply ? token.supply.toLocaleString() : "Loading..."}</p>
                  <p className="text-gray-400">Current Price: {token.price ? `${token.price} USDC` : "Loading..."}</p>
              </div>
            </div>
  
            {/* Right: Buy/Sell & Leaderboard */}
            <div>
              <h2 className="text-3xl font-bold text-white text-center">{token.tokenName} ({token.tokenTicker})</h2>
  
              {/* Buy/Sell Toggle */}
              <div className="flex justify-center mt-6">
                <button 
                  className={`px-4 py-2 rounded-l-lg w-1/2 ${tradeType === "buy" ? "bg-green-500 text-black" : "bg-gray-700 text-gray-400"}`}
                  onClick={() => setTradeType("buy")}
                >
                  Buy
                </button>
                <button 
                  className={`px-4 py-2 rounded-r-lg w-1/2 ${tradeType === "sell" ? "bg-red-500 text-black" : "bg-gray-700 text-gray-400"}`}
                  onClick={() => setTradeType("sell")}
                >
                  Sell
                </button>
              </div>
  
              {/* Trade Box */}
              <div className="bg-[#1A1A2E] p-6 mt-4 rounded-lg border border-[#292B3A]">
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Balance:</span>
                  <span>{balance !== null ? `${balance} USDC` : "Loading..."}</span>
                </div>
  
                <div className="relative mt-2">
                  <label className="text-gray-300 text-sm">In USDC</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Enter amount" 
                    className="w-full bg-[#2A2D3E] border border-[#3B3E5A] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>
  
                <button 
                  onClick={tradeType === "buy" ? handleBuy : console.log("SELL")}
                  className={`w-full py-3 rounded-lg mt-4 hover:scale-105 transition ${tradeType === "buy" ? "bg-green-500 text-black" : "bg-red-500 text-white"}`}>
                  {tradeType === "buy" ? `Buy Token` : `Sell Token`}
                </button>
              </div>
  
              {/* Leaderboard - Holder Distribution */}
              <div className="bg-[#1A1A2E] p-6 mt-6 rounded-lg border border-[#292B3A]">
                  <h3 className="text-white font-bold text-lg mb-4">Holder Distribution</h3>
                  <ul className="text-gray-400 text-sm">
                      {holders.map((holder, index) => (
                      <li key={index} className="flex justify-between">
                          <span>{index + 1}. {holder.address}</span>
                          <span>{holder.balance.toLocaleString()} tokens ({holder.percentage})</span>
                      </li>
                      ))}
                  </ul>
                  <h4 className="text-white font-bold text-lg mt-4">Bonding Curve Holdings</h4>
                  <p className="text-gray-400">{bondingCurveHoldings?.toLocaleString()} tokens</p>
              </div>
  
            </div>
          </div>
        </main>
      </>
    );
  }
  