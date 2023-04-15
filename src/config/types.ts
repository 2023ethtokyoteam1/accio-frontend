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

export function defaultTokenBalance(): TokenBalance {
  return {
    amount: "",
    tokenType: "",
    token: {
      name: "",
      contractMetaData: {
        image: "",
        name: "",
      },
      tokenNfts: [],
    },
    tokenNfts: [],
  };
}

export function createEmptyTokenNft(): any {
  return {
    tokenId: "",
    metaData: {
      name: "",
      description: "",
      image: "",
    },
    contentValue: {
      image: {
        medium: "",
        extraSmall: "",
        large: "",
        original: "",
        small: "",
      },
    },
  };
}

export interface openseaData {
  banner_image_url: string | null;
  chat_url: string | null;
  created_date: string;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: { card_display_style: string };
  editors: string[];
  external_url: string;
  featured: boolean;
  featured_image_url: string | null;
  fees: {
    seller_fees: Record<string, any>;
    opensea_fees: Record<string, any>;
  };
  hidden: boolean;
  image_url: string;
  instagram_username: string;
  is_collection_offers_enabled: boolean;
  is_creator_fees_enforced: boolean;
  is_nsfw: boolean;
  is_rarity_enabled: boolean;
  is_subject_to_whitelist: boolean;
  is_trait_offers_enabled: boolean;
  large_image_url: string | null;
  medium_username: string | null;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: number;
  payment_tokens: {
    id: number;
    symbol: string;
    address: string;
    image_url: string;
    name: string;
    decimals: number;
    eth_price: string;
    usd_price: string;
  }[];
  payout_address: string;
  primary_asset_contracts: {
    address: string;
    asset_contract_type: string;
    created_date: string;
    name: string;
    nft_version: string;
    opensea_version: string | null;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description: string | null;
    external_link: string | null;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: string;
    wiki_link: string | null;
    config: string | null;
    short_description: string | null;
  }[];
  require_email: boolean;
  safelist_request_status: string;
  short_description: string | null;
  slug: string;
  stats: {
    one_minute_volume: number;
    one_minute_change: number;
    one_minute_sales: number;
    one_minute_sales_change: number;
    one_minute_average_price: number;
    one_minute_median_price: number;
    one_minute_lowest_price: number;
    one_minute_highest_price: number;
    one_minute_num_sales: number;
    one_minute_last_sale: string | null;
    one_minute_last_sale_usd: number | null;
    one_minute_last_sale_eth: number | null;
    one_minute_last_sale_price: number | null;
    seven_day_volume: number;
    seven_day_change: number;
    seven_day_sales: number;
    seven_day_sales_change: number;
    seven_day_average_price: number;
    seven_day_median_price: number;
    seven_day_lowest_price: number;
    seven_day_highest_price: number;
    seven_day_num_sales: number;
    seven_day_last_sale: string | null;
    seven_day_last_sale_usd: number | null;
    seven_day_last_sale_eth: number | null;
    seven_day_last_sale_price: number | null;
    thirty_day_volume: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    thirty_day_sales_change: number;
    thirty_day_average_price: number;
    thirty_day_median_price: number;
    thirty_day_lowest_price: number;
    thirty_day_highest_price: number;
    thirty_day_num_sales: number;
    thirty_day_last_sale: string | null;
    thirty_day_last_sale_usd: number | null;
    thirty_day_last_sale_eth: number | null;
    thirty_day_last_sale_price: number | null;
    total_volume: number;
    total_sales: number;
    total_supply: number;
    count: number;
    num_owners: number;
    average_price: number;
    num_reports: number | null;
    market_cap: number | null;
    floor_price: number | null;
    num_unique_buyers: number | null;
    num_unique_sellers: number | null;
  };
  telegram_url: string | null;
  traits: {
    [traitName: string]: {
      value: string;
      display_type: string | null;
      trait_type: string | null;
    }[];
  };
  twitter_username: string;
  wiki_url: string | null;
}
