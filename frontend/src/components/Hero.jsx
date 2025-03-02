import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
      <div className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-black to-gray-900 text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          MEMECOINS <span className="text-purple-400">LAUNCHPAD</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Are you looking to get in on the NFT craze but don’t know where to start?
        </p>
  
        {/* Buttons Container (Ensure Higher Z-Index) */}
        <div className="mt-6 flex space-x-4 relative z-10">
          <Link 
            href="/create" 
            className="relative px-6 py-3 font-semibold text-white transition-all duration-300 
                      bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg 
                      hover:shadow-blue-500/50 hover:scale-105"
          >
            <span className="absolute inset-0 opacity-50 blur-lg bg-gradient-to-r from-blue-500 to-purple-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              <span>+ Create New Token</span>
            </span>
          </Link>
          {/* <Link className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-all rounded-lg text-lg font-semibold" href="/create">
            
          </Link> */}
        </div>
  
        {/* Rocket Image Container (Lower Z-Index to Avoid Blocking Clicks) */}
        <div className="absolute bottom-[-10%] w-full flex justify-center z-0">
          <Image
            src="/assets/heroImg.png"
            alt="Rocket Launch"
            width={500}
            height={500}
            className="object-contain max-w-sm sm:max-w-md md:max-w-lg"
          />
        </div>
      </div>
    );
}
