import { useState, useEffect, useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { getERC20Contract, getFactoryContract, getNetworkConfig } from "../constants/networkMapping";
import Header from "../components/Header";
import ERC20ABI from "../constants/ERC20ABI.json";
import Modal from "../components/Modal";


export default function CreateToken() { 
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [loading, setLoading] = useState(false);
  const [networkConfig, setNetworkConfig] = useState<any>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    ticker: "",
    image: "",
    description: "",
    initialUSDC: "",
    banner: ""
  });


  const chains = {
    BaseSepolia: {
      id: 84532,
      name: "Base Sepolia",
      token: "0x891B23C26623625BA43fD5A18c6c6aB08fa59e45",
      rpc: "https://base-sepolia.infura.io/v3/ac4daccf4fac48e6b0cafbd45dd05da0"
    },
    Sepolia: {
      id: 11155111,
      name: "Ethereum Sepolia",
      token: "0x944f6B7736622BDC76ED09e40CD77eC7afeCd2cE",
      rpc: "https://sepolia.infura.io/v3/ac4daccf4fac48e6b0cafbd45dd05da0"
    }
  } as const;
  

  const [selectedChain, setSelectedChain] = useState("Sepolia");
  const [usdcBalance, setUsdcBalance] = useState<string>("0.0");

  // Fetch signer and USDC balance
  useEffect(() => {
    async function initialize() {
      if (!walletClient) return;
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
      const _signer = await newProvider.getSigner();
      setSigner(_signer);

      const config = await getNetworkConfig();
      setNetworkConfig(config);

      // Fetch USDC balance
      await fetchUSDCBalance();
    }

    initialize();
  }, [walletClient, selectedChain]);

  const fetchUSDCBalance = useCallback(async () => {
    if (!provider || !signer) return;
  
    try {
  
      // Reinitialize provider to ensure it's on the right chain
      const provider = new ethers.JsonRpcProvider(chains[selectedChain as keyof typeof chains].rpc);
      
      // Ensure the contract exists before calling balanceOf
      const bytecode = await provider.getCode(chains[selectedChain as keyof typeof chains].token);
      if (bytecode === "0x") {
        throw new Error("❌ Contract does not exist on the selected chain!");
      }
  
      const usdcContract = new ethers.Contract(
        chains[selectedChain as keyof typeof chains].token,
        ERC20ABI,
        provider
      );
  
      const balance = await usdcContract.balanceOf(address);
      console.log("Raw Balance:", balance.toString());
  
      setUsdcBalance(ethers.formatUnits(balance, 18)); // Assuming USDC has 6 decimals
    } catch (error) {
      console.error("Error fetching USDC balance:", error);
      setUsdcBalance("0");
    }
  }, [provider, signer, selectedChain, address]);

  useEffect(() => {
    fetchUSDCBalance();
  }, [fetchUSDCBalance]);
  
  const handleChainChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChain(event.target.value);
  };

  // ✅ Fetch signer and network config only once
  useEffect(() => {
    async function initialize() {
      if (!walletClient) return;

      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
      
      const _signer = await newProvider.getSigner();
      setSigner(_signer);

      const config = await getNetworkConfig();
      setNetworkConfig(config);
    }

    initialize();
  }, [walletClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTokenDetails({ ...tokenDetails, [e.target.name]: e.target.value });
  };

  const getERC20Contract = async () => {
    if (!provider || !networkConfig) return null;
    const signer = await provider.getSigner();
    return new ethers.Contract(networkConfig.USDCToken, ERC20ABI, signer);
  };

  const handleSubmit = async () => {
    if (!signer || !networkConfig) {
      alert("Connect your wallet first!");
      return;
    }

    if(selectedChain === "Sepolia") {
      setLoading(true);

      try {
        const factoryContract = await getFactoryContract(signer);
        const usdcContract = await getERC20Contract();
        if (!usdcContract) {
          throw new Error("USDC Contract not available.");
        }
  
        const usdcAmount = ethers.parseUnits(tokenDetails.initialUSDC.toString(), 18);
  
        // console.log("Checking USDC Balance...");
        // const usdcBalance = await usdcContract.balanceOf(address);
        // console.log("USDC Balance:", ethers.formatUnits(usdcBalance, 18));
  
        // if (usdcBalance < usdcAmount) {
        //   alert("Not enough USDC balance!");
        //   setLoading(false);
        //   return;
        // }
  
        // console.log("Checking Allowance...");
        // const allowance = await usdcContract.allowance(address, factoryContract.target);
        // console.log("USDC Allowance:", ethers.formatUnits(allowance, 18));
  
        // if (allowance < usdcAmount) {
          console.log("Approving USDC Transfer...");
          const approvalTx = await usdcContract.approve(factoryContract.target, usdcAmount);
          await approvalTx.wait();
          console.log("USDC Approved!");
        // }
  
        console.log("Deploying Token...");
        const tx = await factoryContract.deployToken(
          {
            tokenName: tokenDetails.name,
            tokenTicker: tokenDetails.ticker,
            description: tokenDetails.description,
            bannerUrl: tokenDetails.banner,
            posterUrl: tokenDetails.image,
          },
          usdcAmount,
          { gasLimit: 800000 }
        );
        await tx.wait();
  
        alert("Token Deployed Successfully!");
      } catch (error) {
        console.error("Deployment Error:", error);
        alert("Token Deployment Failed! Check console logs.");
      }
  
      setLoading(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)} />

      <main className="container mx-auto p-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Create a New Token</h2>
        <div className="bg-[#1A1A2E] shadow p-6 rounded-lg border border-[#292B3A]">
          <label className="block mb-2 text-gray-300">Token Name</label>
          <input type="text" name="name" value={tokenDetails.name} onChange={handleChange}
                 className="w-full border p-2 rounded bg-[#2A2D3E] text-white mb-4"
                 placeholder="Enter Token Name" />

          <label className="block mb-2 text-gray-300">Ticker</label>
          <input type="text" name="ticker" value={tokenDetails.ticker} onChange={handleChange}
                 className="w-full border p-2 rounded bg-[#2A2D3E] text-white mb-4"
                 placeholder="Enter Token Symbol (e.g. MEME)" />

          <label className="block mb-2 text-gray-300">Banner Image URL</label>
          <input type="text" name="banner" value={tokenDetails.banner} onChange={handleChange}
                 className="w-full border p-2 rounded bg-[#2A2D3E] text-white mb-4"
                 placeholder="Enter Banner Image URL" />

          <label className="block mb-2 text-gray-300">Token Image URL</label>
          <input type="text" name="image" value={tokenDetails.image} onChange={handleChange}
                 className="w-full border p-2 rounded bg-[#2A2D3E] text-white mb-4"
                 placeholder="Enter Image URL" />

          <label className="block mb-2 text-gray-300">Description</label>
          <textarea name="description" value={tokenDetails.description} onChange={handleChange}
                    className="w-full border p-2 rounded bg-[#2A2D3E] text-white mb-4"
                    placeholder="Enter Token Description"></textarea>

          <label className="block mb-2 text-gray-300">Initial USDC Amount</label>
          <input type="number" name="initialUSDC" value={tokenDetails.initialUSDC} onChange={handleChange}
                 className="w-full border p-2 rounded bg-[#2A2D3E] text-white mb-4"
                 placeholder="Enter USDC Amount for Token Launch" />

          <h2 className="text-2xl font-bold text-white mb-4">Create a New Token</h2>
          <div className="bg-[#1A1A2E] shadow p-6 rounded-lg border border-[#292B3A]">
            
            {/* Chain Selector with USDC Balance */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Select Source Chain</label>
                <select
                  className="border p-2 rounded bg-[#2A2D3E] text-white"
                  value={selectedChain}
                  onChange={handleChainChange}
                >
                  {Object.entries(chains).map(([key, value]) => (
                    <option key={key} value={key}>{value.name}</option>
                  ))}
                </select>
              </div>

              {/* Display USDC Balance */}
              <div className="text-white text-sm">
                <p>💰 USDC Balance: {usdcBalance}</p>
              </div>
            </div>

            {/* Deploy Token Button */}
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full bg-green-500 text-black py-2 rounded-lg"
            >
              {loading 
                ? "Deploying..."
                : selectedChain === "Sepolia"
                  ? `Deploy Token from ${chains[selectedChain as keyof typeof chains].name}`
                  : `Cross-Chain Deploy via NTT from ${chains[selectedChain as keyof typeof chains].name} to Sepolia`
              }
            </button>

          </div>
        </div>
      </main>
    </>
  );
}
