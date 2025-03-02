import { ethers, run } from "hardhat";
import {TokenFactory} from "../typechain-types/contracts/TokenFactory.ts";
async function main() {
    const network_name = (await ethers.provider.getNetwork()).name
    const AddressWhitelister = await ethers.getContractFactory("AddressWhitelister");
    const whitelister = await AddressWhitelister.attach("0x94ef8D6711Cf8500d84eB99312DfBd4C974b4174");
    console.log("whitelister deployed:",await whitelister.getAddress());
    const BondingCurve = await ethers.getContractFactory("BondingCurve");
    const bonding = await BondingCurve.attach("0x54f93D4A3c2878cA4998730a6e37D1C46d79131e");
    console.log("bonding deployed:",await bonding.getAddress());
    const TokenFactoy = await ethers.getContractFactory("TokenFactory");
    const factory = await TokenFactoy.attach("0x0e80657fDa77c22516395756Fe1E6D90bCF7512b");
    console.log("factory deployed:",await factory.getAddress());
    
    const USDC = await ethers.getContractFactory("TestUSDC");
    const usd = await USDC.attach("0x9Fb12C42Fd17062EC67D29ac7C35Ad3957D1620b");
    const campaign:TokenFactory.CampaignParamsStruct = {tokenName: "test",tokenTicker: "test",description: "test",image: "test"}
    await usd.approve(await factory.getAddress(), 1000000000000);
    await factory.deployToken(campaign,100000000);
    // console.log(await factory.tokenCreator("0x3240A7e0688e552EaA0Bf05b036c7991c8060dDB"));
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });