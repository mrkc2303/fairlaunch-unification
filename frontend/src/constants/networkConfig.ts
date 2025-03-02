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
        whitelisted: "0x54956bb91f0b5E8337D21905A6408fb60bB8DA4a",
        bonding: "0x147029760F0BCE2Ec97d42e51bE059763A2A56e5",
        factory: "0xd02F1F7162bD14Ca8de19a0EA301464a957ae629",
        USDCToken: "0x944f6B7736622BDC76ED09e40CD77eC7afeCd2cE",
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
