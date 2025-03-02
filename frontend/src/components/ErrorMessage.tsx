import { useState } from "react";

export default function ErrorMessage({ error, clearError }: { error: string; clearError: () => void }) {
  if (!error) return null; 

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] md:w-2/3 lg:w-1/2 
                    bg-red-900/20 backdrop-blur-md text-red-400 border border-red-600 
                    shadow-lg shadow-red-500/50 rounded-lg p-4 z-50 animate-slide-in">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold tracking-wider">
          ⚠️ {error}
        </span>
        <button 
          onClick={clearError}
          className="text-red-300 hover:text-red-500 transition px-2 py-1 rounded-md"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
