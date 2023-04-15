import { Ethereum } from '@types/ethersproject-networks';

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}