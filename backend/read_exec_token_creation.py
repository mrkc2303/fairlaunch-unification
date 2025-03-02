import requests
from web3 import Web3
import asyncio
# Replace with your actual RPC URL
BASE_SEPOLIA_RPC_URL = "https://flashy-alpha-replica.ethereum-sepolia.quiknode.pro/671871ad987938633fab184e0b067237759d4458"
SEPOLIA_RPC_URL = "https://flashy-alpha-replica.base-sepolia.quiknode.pro/671871ad987938633fab184e0b067237759d4458"

# Initialize Web3 instance
w3_sepolia = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))
w3_base = Web3(Web3.HTTPProvider(BASE_SEPOLIA_RPC_URL))

# Contract address and ABI
CONTRACT_ADDRESS = "0x75Bc64E36eaC8c503ff42fCd2184e2338D9215DA"
CONTRACT_ABI = [    {
      "anonymous": False,
      "inputs": [
        {
          "indexed": False,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "tokenName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenTicker",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "bannerUrl",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "posterUrl",
              "type": "string"
            }
          ],
          "indexed": False,
          "internalType": "struct EscrowBase.CampaignParams",
          "name": "params",
          "type": "tuple"
        },
        {
          "indexed": False,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokenReceived",
      "type": "event"
    }]

# Define the event you want to listen to
event_filter = w3_base.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI).events.TokenReceived.create_filter(
    from_block=7810000,
    to_block="latest"
)

def send_tx_sepolia(campaign_name, description,banner_url, poster_url,token):
    web3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))
    contract_address = "0xAd204a53D76Beab75C4ce17c6F50c6baD43577b9"
    contract_abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "tokenName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenTicker",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "bannerUrl",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "posterUrl",
              "type": "string"
            }
          ],
          "internalType": "struct TokenFactory.CampaignParams",
          "name": "_campaign",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "_tokenToPay",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "initialBuy",
          "type": "uint256"
        }
      ],
      "name": "release_funds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }]  # Your contract's ABI
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    account_address = "0x3240A7e0688e552EaA0Bf05b036c7991c8060dDB"
    private_key = ""
    nonce = web3.eth.get_transaction_count(account_address)
    transaction = contract.functions.release_funds([campaign_name,campaign_name,description,banner_url,poster_url],token).build_transaction({
        'chainId': web3.eth.chain_id,  # Replace with your network's chain ID
        'gas': 2000000,
        'gasPrice': web3.to_wei('20', 'gwei'),
        'nonce': nonce,
        'from': account_address,
    })
    signed_transaction = web3.eth.account.sign_transaction(transaction, private_key)
    transaction_hash = web3.eth.send_raw_transaction(signed_transaction.raw_transaction)
    print(f"Transaction hash: {transaction_hash.hex()}")
    transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)
    print(f"Transaction status: {transaction_receipt['status']}")

async def listen_for_events(campaign_name, description,banner_url, poster_url,):
    while True:
        for event in event_filter.get_new_entries():
            # Access event details
            print(f"Event: CampaignCreated")
            print(event['args']['_campaign']['tokenName'])
            print(event['args']['_campaign']['description'])
            print(event['args']['_campaign']['posterUrl'])
            print(event['args']['_campaign']['bannerUrl'])
            print(event['args']['amount'])
            send_tx_sepolia(event['args']['_campaign']['tokenName'],event['args']['_campaign']['description'],event['args']['_campaign']['bannerUrl'],event['args']['_campaign']['posterUrl'],event['args']['_token'])

        await asyncio.sleep(1)  # Adjust polling interval as needed

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(listen_for_events())
    loop.close()
    # requests.post("https://faucet.testnet.humanity.org/api/claim",json={"address": "0x3240A7e0688e552EaA0Bf05b036c7991c8060dDB"})