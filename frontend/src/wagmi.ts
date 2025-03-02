import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem'

import {
  arbitrum,
  base,
  baseSepolia,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zircuitTestnet,
} from 'wagmi/chains';

const zircuitGarfieldTestnet = defineChain({
  id: 48898, // Chain ID
  name: 'Zircuit Garfield Testnet',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://garfield-testnet.zircuit.com/'] },
    public: { http: ['https://garfield-testnet.zircuit.com/'] },
  },
  blockExplorers: {
    default: { name: 'Zircuit Garfield Explorer', url: 'https://explorer.garfield-testnet.zircuit.com/' },
  },
  network: 'zircuit-garfield-testnet',
});

export const config = getDefaultConfig({
  appName: 'FairLaunch',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    // mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    sepolia,
    baseSepolia,
    zircuitTestnet,
    zircuitGarfieldTestnet
  ],
  ssr: true,
});
