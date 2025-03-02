import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 animate-fadeOut">
      <Image 
        src={"/assets/logo2.png"}
        alt="FairLaunch Logo"
        width={500}
        height={500}
        className="animate-fadeIn"
      />
    </div>
  );
}
