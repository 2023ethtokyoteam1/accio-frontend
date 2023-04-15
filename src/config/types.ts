import { Address } from "wagmi";

export interface Crypto {
  name: string;
  fileName: string;
  symbol: string;
  chainId: number;
  usdc: Address;
  wETH: Address;
}

export interface latestTx {
  NFTSaleTransactions: {
    NFTSaleTransaction: {
      id: string;
      from: { identity: string };
      to: { identity: string };
      paymentAmount: string;
      paymentToken: { symbol: string };
      blockTimestamp: string;
      nfts: {
        tokenId: string;
        tokenNft: {
          metaData: {
            image: string;
            name: string;
          };
          rawMetaData: string;
        };
      }[];
      royalties: {
        beneficiaryAddress: string;
        amount: string;
        formattedAmount: string;
      }[];
      feeAmountInUSDC: string;
    }[];
    pageInfo: {
      prevCursor: string | null;
      nextCursor: string | null;
    };
  }[];
}

export interface TokenBalance {
  amount: string;
  tokenType: string;
  token: {
    name: string;
    contractMetaData: {
      image: string;
      name: string;
    };
    tokenNfts: {
      id: string;
      metaData: {
        name: string;
        description: string;
        image: string;
      };
      contentValue: {
        image: {
          medium: string;
          extraSmall: string;
          large: string;
          original: string;
          small: string;
        };
      };
    }[];
  };
  tokenNfts: {
    tokenId: string;
    metaData: {
      name: string;
      description: string;
      image: string;
    };
    contentValue: {
      image: {
        medium: string;
        extraSmall: string;
        large: string;
        original: string;
        small: string;
      };
    };
  }[];
}

