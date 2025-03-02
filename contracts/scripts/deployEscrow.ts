import { ethers, run } from "hardhat";

async function main() {
    const network_name = (await ethers.provider.getNetwork()).name
    if(network_name=="sepolia"){
        const Escrow = await ethers.getContractFactory("EscrowSepolia");
        const escrow = await Escrow.deploy("0x944f6B7736622BDC76ED09e40CD77eC7afeCd2cE");
        console.log("escrow_sepolia deployed:",await escrow.getAddress());
    }
    else{
        const Escrow = await ethers.getContractFactory("EscrowBase");
        const escrow = await Escrow.deploy("0x2d70cad92f320c76C39905bc22B3deF6cd716369","0x891B23C26623625BA43fD5A18c6c6aB08fa59e45");
        console.log("escrow_base deployed:",await escrow.getAddress());
        escrow.setEscrowSepolia("0xAd204a53D76Beab75C4ce17c6F50c6baD43577b9");
    }

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });