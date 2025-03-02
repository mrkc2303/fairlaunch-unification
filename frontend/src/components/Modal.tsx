import { useRouter } from "next/router";

export default function Modal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const router = useRouter();

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1A1A2E] p-6 rounded-lg border border-[#FF0000] shadow-xl text-white w-96 text-center">
        <h2 className="text-lg font-bold text-red-500">Cross-Chain Deployment Required</h2>
        <p className="text-sm text-gray-400 my-4">
          Since you're deploying from <span className="text-blue-500">BaseSepolia</span>, you need to swap NTTs first.
        </p>

        <div className="flex justify-between gap-4 mt-4">
          <button
            className="bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md text-white hover:scale-105"
            onClick={() => router.push("/swapNTT")}
          >
            Yes, Go to Swap
          </button>
        </div>
      </div>
    </div>
  );
}
