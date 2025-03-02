"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import { useOkto } from "@okto_web3/react-sdk";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession(); // Get user session
  const { login, isAuthenticated, walletAddress, logout } = useOkto();
  const [useOktoWallet, setUseOktoWallet] = useState(false);

  return (
    <div className="flex flex-row w-full justify-between items-center px-6 py-4 bg-gray-900 text-white">
      {/* Logo */}
      <Link href="/" className="w-96">
        <Image src="/assets/logoflat.png" alt="FairLaunch Logo" width={200} height={80} />
      </Link>

      <div className="flex flex-row gap-4 items-center">
        {/* Authentication Buttons */}
        {session ? (
          <div className="flex flex-row items-center gap-3">
            <span className="text-sm">
              Logged in as: {session.user?.email || "User"}
            </span>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
        )}

        {/* Wallet Connection */}
        {useOktoWallet ? (
          isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Wallet: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
              <button
                className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
                onClick={() => {
                  logout();
                  setUseOktoWallet(false);
                }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
              onClick={login}
            >
              Connect Okto Wallet
            </button>
          )
        ) : (
          <ConnectButton />
        )}

        {/* Toggle Wallet Selection */}
        <button
          className="bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-800"
          onClick={() => setUseOktoWallet(!useOktoWallet)}
        >
          {useOktoWallet ? "Use RainbowKit" : "Use Okto Wallet"}
        </button>
      </div>
    </div>
  );
}
