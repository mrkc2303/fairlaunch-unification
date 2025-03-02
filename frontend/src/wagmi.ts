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

const AvailZK1 = defineChain({
  id: 271,
  name: 'ZK Sync Nexus 1',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://zksync1.nexus.avail.tools'] },
    public: { http: ['https://zksync1.nexus.avail.tools'] },
  },
  blockExplorers: {
    default: { name: 'Zircuit Garfield Explorer', url: 'https://explorer.garfield-testnet.zircuit.com/' },
  },
  network: 'avail-zk-nexus-1',
});

const AvailZK2 = defineChain({
  id: 272, 
  name: 'ZK Sync Nexus 2',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://zksync2.nexus.avail.tools'] },
    public: { http: ['https://zksync2.nexus.avail.tools'] },
  },
  network: 'avail-zk-nexus-2',
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
    zircuitGarfieldTestnet,
    AvailZK1,
    AvailZK2
  ],
  ssr: true,
});
