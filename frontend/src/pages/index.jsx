import { useCampaigns } from "../context/CampaignContext";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  const { campaigns } = useCampaigns();

  return (
    <div>
      <Header />
      <Hero />
      
      <div className="mx-5 py-10">

        {/* <div className="mt-6">
          <Link href="/create">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              + Create New Token
            </button>
          </Link>
        </div> */}

        <h2 className="text-2xl font-bold mb-4">Live & Upcoming Token Launches</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {campaigns.length > 0 ? (
            campaigns.map((token, index) => (
              <Link key={index} href={`/token/${token.tokenAddress}`} passHref>
                <div className="cursor-pointer bg-[#111827] bg-opacity-80 backdrop-blur-lg border border-[#292B3A] hover:border-[#7B3FE4] 
                  p-5 rounded-xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-neon-glow relative group h-full flex flex-col">
                  
                  {/* Image Wrapper */}
                  <div className="relative w-full h-40 overflow-hidden rounded-lg">
                    <Image 
                      src={(token.image !== "test" || token.image || token.image != undefined) ? token.image : "https://picsum.photos/400/300?random=" + index} 
                      alt={token.tokenName} 
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-300 group-hover:scale-110 rounded-lg"
                    />
                  </div>

                  {/* Token Details */}
                  <div className="flex flex-col flex-grow mt-4">
                    <h3 className="text-2xl font-semibold text-white tracking-wide group-hover:text-[#7B3FE4] transition duration-300">
                      {token.tokenName} ({token.tokenTicker})
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Token Address: <span className="text-green-400">{token.tokenAddress.slice(0, 11) + "..."}</span></p>
                    <p className="text-sm text-gray-400">Description: {token.description}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No campaigns found.</p>
          )}
        </div>

        
      </div>
    </div>
  );
}
