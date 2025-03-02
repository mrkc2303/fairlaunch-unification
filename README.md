# 🚀 FairLaunch  

## 🌍 Access it here  
🔗 [FairLaunch dApp](https://fairlaunch-unification.vercel.app)  

## 🔹 Overview  
FairLaunch is a **sybil-resistant, multichain** token launchpad enabling fair participation in **meme coins, AI agents, and community-driven tokens**. Using **Humanity Protocol** for proof of personhood and **Zircuit** for secure transactions, we ensure **organic growth and bot prevention**.  

FairLaunch now integrates **Wormhole NTT** to allow seamless **cross-chain token funding and deployment**—bridging liquidity across multiple ecosystems!  

---

## 🔥 Key Features  
✅ **Sybil-Resistant Token Launches** – Humanity Protocol ensures only **verified users** can participate.  
✅ **Bot Prevention** – Protection against **sniper bots** for **fair token allocation**.  
✅ **Cross-Chain Deployments (via Wormhole NTT)** – Deploy tokens using USDC from **Base Sepolia** to **Ethereum Sepolia** seamlessly.  
✅ **Dynamic Bonding Curve** – Sustainable token pricing model to prevent market manipulation.  
✅ **Automated Market Making (Future)** – Planned **Uniswap V4** integration for seamless liquidity.  
✅ **Web2-Like UX** – Uses **Okto embedded wallets** for **one-click transactions**.  

---

## 🛠️ Tech Stack  
- **Blockchain**: Zircuit, Ethereum Sepolia, Base Sepolia (via Wormhole)  
- **Authentication**: Humanity Protocol  
- **Cross-Chain Transfers**: Wormhole NTT  
- **Smart Contracts**: Solidity (ERC-20, Bonding Curve)  
- **Frontend**: Next.js, TailwindCSS, Wormhole Connect  
- **Wallet & UX**: Okto SDK, RainbowKit  
- **Future Integrations**: Uniswap V4, Wormhole Queries  

---

## 📜 Smart Contract Architecture  

### 🔹 Token Factory  
- Deploys **ERC-20 tokens** with **bonding curve mechanics**.  
- Supports **custom token metadata** and supply constraints.  

### 🔹 Bonding Curve Contract  
- Implements **dynamic buy/sell curves** for token pricing.  
- Prevents **rug pulls** by restricting early withdrawals.  

### 🔹 Cross-Chain Deployments (Wormhole NTT)  
- Enables **USDC funding across multiple chains** (Base Sepolia → Ethereum Sepolia).  
- Uses **NTT Transfers** for **gas-efficient liquidity bridging**.  

### 🔹 Sybil Resistance Verification  
- **Humanity Protocol** ensures only **unique** verified wallets participate.  
- Eliminates **multi-account farming** in token launches.  

---

## 🌉 Cross-Chain Token Flow (via Wormhole NTT)  

### 1️⃣ **Native Deployment (Ethereum Sepolia)**  
- User directly deploys **ERC-20 tokens** on **Ethereum Sepolia**.  
- USDC balance is used from **Sepolia network**.  

### 2️⃣ **Cross-Chain Deployment (Base Sepolia → Sepolia via Wormhole NTT)**  
- Users can **use USDC from Base Sepolia** to deploy a token on **Ethereum Sepolia**.  
- **NTT Transfers** bridge assets across chains **without liquidity fragmentation**.  
- Integrated using **Wormhole SDK + Wormhole Connect**.  

---

## 🖥️ User Interaction Flow  
1. **Create a Meme Campaign** – Deploy a **new token** with **custom parameters**.  
2. **Verify Identity** – Authenticate using **Humanity Protocol**.  
3. **Select Funding Method**:  
   - **Direct Funding (Sepolia USDC)** – Deploy tokens directly.  
   - **Cross-Chain (Base Sepolia USDC via NTT)** – Transfer USDC from **Base Sepolia to Sepolia** before deployment.  
4. **Deploy & Trade Tokens** – Tokens **graduate** to Uniswap V4 for open trading.  

---

## 🏆 Wormhole Bounty Submission  

### 🔹 Wormhole Native Token Transfers (NTT) Integration  
✅ **Supports USDC Transfers via Wormhole NTT**  
✅ **Cross-chain liquidity for token deployment**  
✅ **Integrated with Wormhole Connect**  
✅ **Live Demo & GitHub Repository**  

**🎯 Impact:** Enables **multichain token funding** for fair launches across chains.  

---

## 📸 Screenshots  


---

## 🏗️ Setup & Installation  

### 1️⃣ **Clone & Install**  
```bash
git clone https://github.com/mrkc2303/FairLaunch.git
cd FairLaunch
npm install
npm run dev
```
