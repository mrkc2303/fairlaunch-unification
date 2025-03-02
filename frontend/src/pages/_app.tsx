import Head from 'next/head';
import { useState, useEffect } from "react";
import "../styles/globals.css";
import SplashScreen from "../components/SplashScreen";
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import AppProvider from "../components/providers";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from "next-auth/react";

import { config } from '../wagmi';
import { CampaignProvider } from '../context/CampaignContext';
import Header from '../components/Header';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps & { pageProps: { session?: any } }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Head>
              <link rel="icon" href="/favicon.ico" />
              <title>FairLaunch</title>
            </Head>
            <CampaignProvider>
              {/* Ensure session is passed to AppProvider */}
              <AppProvider session={pageProps.session}>
                <div className="min-h-screen bg-[#0D0D0D] text-white font-poppins">
                  {loading ? <SplashScreen onFinish={() => setLoading(false)} /> : 
                    <div>
                      <Header />
                      <Component {...pageProps} />
                    </div>
                    
                  }
                </div>
              </AppProvider>
            </CampaignProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}

export default MyApp;
