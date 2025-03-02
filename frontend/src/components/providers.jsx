"use client";
import { headers } from 'next/headers';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, cookieToInitialState } from 'wagmi';
import { getConfig } from '../wagmi';

export default async function AppProvider({ children }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  );

  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
