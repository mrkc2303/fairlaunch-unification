import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row w-full justify-between items-center px-6 py-4 bg-gray-900 text-white">
      {/* Logo */}
      <Link href="/" className="w-96">
        <Image 
          src="/assets/logoflat.png" 
          alt="FairLaunch Logo" 
          width={200}
          height={80}
        />
      </Link>
      {/* Wallet Connect Button */}
      <ConnectButton />
    </div>
  );
}
