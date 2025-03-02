export const NETWORK_CONFIG: { [key: number]: { 
    name: string;
    rpcUrl: string;
    whitelisted: string;
    bonding: string;
    factory: string;
    USDCToken: string;
    startBlock: number;
} } = {
    11155111: {
        name: "Sepolia",
        rpcUrl: "https://gateway.tenderly.co/public/sepolia",
        whitelisted: "0x7c353533C192e5096cE01C3F2D8BA2CDeC184920",
        bonding: "0xd6B1CC8a1eD4DAbEF0A0425030CcbE3571A239d4",
        factory: "0x1030beED2D98c68f45B791B9Bdc9E184bc53fef4",
        USDCToken: "0x9Fb12C42Fd17062EC67D29ac7C35Ad3957D1620b",
        startBlock: 7800000,
    },
    48898: {
        name: "Zircuit Garfield Testnet",
        rpcUrl: "https://garfield-testnet.zircuit.com/",
        whitelisted: "0x92C878b7e49050563420aCa88c6507BDdAd497C0",
        bonding: "0x6eA996dB06678C1E4221B13ed4F3e2aA98331cE6",
        factory: "0x1Eb10f1CD0a9219fAEe2D22CEEb52dfd3525ED30",
        USDCToken: "0xD93650A627df8b4b6756853531f7bf8e0ecA6d22",
        startBlock: 251254,
    },
};
