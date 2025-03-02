import Header from "../components/Header";
import { useState } from "react";

export default function BuyToken() {
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    console.log("Buying Tokens:", amount);
    // Call Wormhole NTT function here
  };

  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Buy Tokens</h2>

        <div className="bg-white shadow p-6 rounded-lg">
          <label className="block mb-2">Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter USDC Amount"
          />

          <button
            onClick={handleBuy}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Buy Tokens
          </button>
        </div>
      </main>
    </>
  );
}
