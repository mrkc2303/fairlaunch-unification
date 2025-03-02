import { ethers } from "ethers";
import { factory, getNetworkConfig } from "../constants/networkMapping"; // TokenFactory contract address
import TokenFactoryABI from "../constants/TokenFactoryABI.json"; // Ensure ABI is correct
import { startBlock } from "../constants/networkMapping"

const BLOCK_CHUNK_SIZE = 50000;

export async function getCampaignCreatedEvents() {
  try {
    const netConfig = await getNetworkConfig();
    const provider = new ethers.JsonRpcProvider(netConfig.rpcUrl);
    const contract = new ethers.Contract(netConfig?.factory, TokenFactoryABI, provider);

    const latestBlock = await provider.getBlockNumber();
    console.log("Latest Block:", latestBlock);

    let fromBlock = netConfig?.startBlock;
    let events = [];

    // Fetch events in chunks
    while (fromBlock < latestBlock) {
      let toBlock = Math.min(fromBlock + BLOCK_CHUNK_SIZE, latestBlock);

      console.log(`Fetching events from block ${fromBlock} to ${toBlock}...`);

      const chunkEvents = await contract.queryFilter("CampaignCreated", fromBlock, toBlock);
      events = [...events, ...chunkEvents];

      fromBlock = toBlock + 1;
    }

    const data = events.map((event) => ({
      tokenName: event.args._campaign.tokenName,
      tokenTicker: event.args._campaign.tokenTicker,
      description: event.args._campaign.description,
      image: event.args._campaign.bannerUrl,
      posterUrl: event.args._campaign.posterUrl,
      tokenAddress: event.args._token,
      blockNumber: event.blockNumber,
    }));

    console.log("Fetched campaign events:", data);
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
