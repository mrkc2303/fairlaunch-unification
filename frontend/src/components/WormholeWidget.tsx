import WormholeConnect, {
    WormholeConnectConfig,
    nttRoutes,
    WormholeConnectTheme,
  } from '@wormhole-foundation/wormhole-connect';
  
  const wormholeConfig: WormholeConnectConfig = {
    network: 'Testnet',
    chains: ['Sepolia', 'BaseSepolia'],
    tokens: ['WSVsep', 'WSVbase'],
    ui: {
      title: 'Wormhole NTT UI',
      defaultInputs: {
        fromChain: 'BaseSepolia',
        toChain: 'Sepolia'
      },
    },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: 'Sepolia',
              manager: '0x17fb7F692870c5C1Ac84526BC6B0BF2FB19811CB',
              token: '0x944f6B7736622BDC76ED09e40CD77eC7afeCd2cE',
              transceiver: [
                {
                  address: '0xc41679Ce3D92293A163B02347E1443ee4Ff41f4e',
                  type: 'wormhole',
                },
              ],
            },
            {
              chain: 'BaseSepolia',
              manager: '0x2d70cad92f320c76C39905bc22B3deF6cd716369',
              token: '0x891B23C26623625BA43fD5A18c6c6aB08fa59e45',
              transceiver: [
                {
                  address: '0x2f209ca250E2C30DACD94594100C36447B423b64',
                  type: 'wormhole',
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      WSVsep: {
        symbol: 'WSV',
        name: 'WSV',
        tokenId: {
          chain: 'Sepolia',
          address: '0x944f6B7736622BDC76ED09e40CD77eC7afeCd2cE'
        },
        icon: 'https://wormhole.com/token.png',
        decimals: 18
      },
      WSVbase: {
        symbol: 'WSV',
        tokenId: {
          chain: 'BaseSepolia',
          address: '0x891B23C26623625BA43fD5A18c6c6aB08fa59e45'
        },
        icon: 'https://wormhole.com/token.png',
        decimals: 18
      }
    }
  };
  
  const theme: WormholeConnectTheme = {
    mode: 'dark',
    primary: '#78c4b6',
  };
  
  export default function WormholeWidget() {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-[#0D0D0D]">
        <div className="w-full max-w-3xl p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-white text-2xl font-bold mb-4">Cross-Chain Transfers</h2>
          <WormholeConnect config={wormholeConfig} theme={theme} />
        </div>
      </div>
    );
  }
  