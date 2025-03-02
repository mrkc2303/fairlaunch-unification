import { okto } from '@okto_web3/wagmi-adapter';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { polygon, mainnet, optimism } from 'wagmi/chains';

export function getConfig() {
  return createConfig({
    chains: [polygon], // You can add other chains here
    connectors: [
      okto({
        environment: (process.env.NEXT_PUBLIC_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
        clientPrivateKey: process.env.NEXT_PUBLIC_CLIENT_PRIVATE_KEY?.startsWith("0x")
        ? process.env.NEXT_PUBLIC_CLIENT_PRIVATE_KEY
        : `0x${process.env.NEXT_PUBLIC_CLIENT_PRIVATE_KEY}` || '',
        clientSWA: process.env.NEXT_PUBLIC_CLIENT_SWA?.startsWith("0x")
        ? process.env.NEXT_PUBLIC_CLIENT_SWA
        : `0x${process.env.NEXT_PUBLIC_CLIENT_SWA}` || '',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [polygon.id]: http(),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
