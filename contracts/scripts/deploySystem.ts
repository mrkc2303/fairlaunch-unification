import { ethers, run } from "hardhat";

async function main() {
    const network_name = (await ethers.provider.getNetwork()).name
    const AddressWhitelister = await ethers.getContractFactory("AddressWhitelister");
    const whitelister = await AddressWhitelister.deploy();
    console.log("whitelister deployed:",await whitelister.getAddress());
    const BondingCurve = await ethers.getContractFactory("BondingCurve");
    const bonding = await BondingCurve.deploy();
    console.log("bonding deployed:",await bonding.getAddress());
    const TokenFactoy = await ethers.getContractFactory("TokenFactory");
    const factory = await TokenFactoy.deploy(await bonding.getAddress(),await whitelister.getAddress());
    console.log("factory deployed:",await factory.getAddress());

    await whitelister.setTokenFactory(await factory.getAddress());
    await bonding.setTokenFactory(await factory.getAddress());

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });