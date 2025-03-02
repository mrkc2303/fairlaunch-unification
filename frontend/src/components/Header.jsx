import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import ErrorMessage from "./ErrorMessage"; // Import Error Component

export default function Header() {
  const [error, setError] = useState(""); // ✅ Remove incorrect type declaration

  return (
    <div>
      {/* Error Message */}
      <ErrorMessage error={error} clearError={() => setError("")} />

      <div className="flex flex-row w-full justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
        {/* Logo */}
        <Link href="/" className="w-96">
          <Image src="/assets/logoflat.png" alt="FairLaunch Logo" width={200} height={80} />
        </Link>

        <div className="flex items-center gap-4">
          {/* NTT Swap Button */}
          <Link 
            href="/swapNTT" 
            className="relative px-6 py-3 font-semibold text-white transition-all duration-300 
                      bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg 
                      hover:shadow-blue-500/50 hover:scale-105"
          >
            <span className="absolute inset-0 opacity-50 blur-lg bg-gradient-to-r from-blue-500 to-purple-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.25 8.75a.75.75 0 01.75-.75h4a.75.75 0 110 1.5h-4a.75.75 0 01-.75-.75zm-.75 4a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 3.25a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z" clipRule="evenodd"/>
              </svg>
              <span>NTT Swap</span>
            </span>
          </Link>

          {/* Wallet Connection */}
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
