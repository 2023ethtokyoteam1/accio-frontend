import { Chain } from "wagmi/chains";

export const lineaGoerliTestnet: Chain = {
  /** ID in number form */
  id: 59140,
  /** Human-readable name */
  name: "linea goerli",
  /** Internal network name */
  network: "lineagoerli",
  /** Currency used by chain */
  nativeCurrency: { name: "LineaETH", symbol: "LineaETH", decimals: 18 },
  /** Collection of RPC endpoints */
  rpcUrls: {
    default: {
      http: ['https://rpc.goerli.linea.build/'],
    },
    public : {
      http: ['https://rpc.goerli.linea.build/'],
    }
  },
  testnet: true,
};
