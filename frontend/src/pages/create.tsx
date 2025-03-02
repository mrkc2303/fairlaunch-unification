import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

import { getERC20Contract, getFactoryContract, getNetworkConfig } from "../constants/networkMapping";
import Header from "../components/Header";
import ERC20ABI from "../constants/ERC20ABI.json"; // Standard ERC-20 ABI

export default function CreateToken() { 
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [loading, setLoading] = useState(false);
  const [networkConfig, setNetworkConfig] = useState<any>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    ticker: "",
    image: "",
    description: "",
    initialUSDC: "",
    banner: ""
  });

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

    setLoading(true);

    try {
      const factoryContract = await getFactoryContract(signer);
      const usdcContract = await getERC20Contract();
      if (!usdcContract) {
        throw new Error("USDC Contract not available.");
      }

      const usdcAmount = ethers.parseUnits(tokenDetails.initialUSDC.toString(), 6);

      console.log("Checking USDC Balance...");
      const usdcBalance = await usdcContract.balanceOf(address);
      console.log("USDC Balance:", ethers.formatUnits(usdcBalance, 6));

      if (usdcBalance < usdcAmount) {
        alert("Not enough USDC balance!");
        setLoading(false);
        return;
      }

      console.log("Checking Allowance...");
      const allowance = await usdcContract.allowance(address, factoryContract.target);
      console.log("USDC Allowance:", ethers.formatUnits(allowance, 6));

      if (allowance < usdcAmount) {
        console.log("Approving USDC Transfer...");
        const approvalTx = await usdcContract.approve(factoryContract.target, usdcAmount);
        await approvalTx.wait();
        console.log("USDC Approved!");
      }

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
  };

  return (
    <>
      {/* <Header /> */}
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

          <button onClick={handleSubmit} disabled={loading}
                  className="w-full bg-green-500 text-black py-2 rounded-lg">
            {loading ? "Deploying..." : "Deploy Token"}
          </button>
        </div>
      </main>
    </>
  );
}
