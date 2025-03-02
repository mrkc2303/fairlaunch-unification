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
        rpcUrl: "https://sepolia.infura.io/v3/ac4daccf4fac48e6b0cafbd45dd05da0",
        whitelisted: "0x435c561Bec7582B8D46C744C80C0B8044419Ed29",
        bonding: "0x33D6Ca727268D39bFCFA2e1b559768E6Ee3b7798",
        factory: "0xcf1de34De1d344733E43150788dc02f0d2f21951",
        USDCToken: "0x944f6B7736622BDC76ED09e40CD77eC7afeCd2cE",
        startBlock: 7819000,
    },
    48898: {
        name: "Zircuit Garfield Testnet",
        rpcUrl: "https://sepolia.infura.io/v3/ac4daccf4fac48e6b0cafbd45dd05da0",
        whitelisted: "0x92C878b7e49050563420aCa88c6507BDdAd497C0",
        bonding: "0x6eA996dB06678C1E4221B13ed4F3e2aA98331cE6",
        factory: "0x1Eb10f1CD0a9219fAEe2D22CEEb52dfd3525ED30",
        USDCToken: "0xD93650A627df8b4b6756853531f7bf8e0ecA6d22",
        startBlock: 251254,
    },
};
