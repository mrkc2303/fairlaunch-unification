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
        whitelisted: "0xbc542815b0c9279f9D9696B6c9C1B50EfA630e1A",
        bonding: "0xE519048E665274e1B17F9a3EC9F2964D6CF5A71B",
        factory: "0xb7c798Eb5512F68f5C79f1a99F909ed72F2310d3",
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
