import { ethers, run } from "hardhat";

async function main() {
    const network_name = (await ethers.provider.getNetwork()).name
    const USDC = await ethers.getContractFactory("TestUSDC");
    const usd = await USDC.deploy();
    console.log("usdc deployed:",await usd.getAddress());
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });