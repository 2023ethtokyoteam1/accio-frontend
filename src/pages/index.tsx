import { useState, useContext, ChangeEvent } from "react";
import { Container, Button, TextField } from "@mui/material";
import { Crypto } from "../config/types";
import TitleManager from "@/components/common/TitleManager";
import MyAsset from "@/components/myAssets/MyAsset";
import CollectionsList from "@/components/nftCollections/CollectionsList";
import { balanceContext } from "../hooks/balanceContext";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import {
  FusionSDK,
  Web3ProviderConnector,
  AuctionSalt,
  AuctionSuffix,
  FusionOrder,
  QuoteParams,
  NetworkEnum,
  RelayerRequest,
} from "@1inch/fusion-sdk";
import web3 from "web3";
import { useAccount, useSigner } from "wagmi";
import { signTypedData } from "@wagmi/core";

export default function Home() {
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(true);
  const { balances, setBalances, totalBalance, setTotalBalance } = useContext(balanceContext);
  const { address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();

  const cryptoList: Crypto[] = [
    // mainnet
    // {
    //   name: "Ethereum",
    //   fileName: "eth",
    //   symbol: "ETH",
    //   chainId: 1,
    //   usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    //   wETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    // },
    // BSC for fusion TEST
    {
      name: "BSC",
      fileName: "eth",
      symbol: "BNB",
      chainId: 56,
      usdc: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      wETH: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    // goerli
    // {
    //   name: "Goerli",
    //   fileName: "eth",
    //   symbol: "ETH",
    //   chainId: 5,
    //   usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
    //   wETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    // },
    {
      name: "Mumbai",
      fileName: "matic",
      symbol: "MATIC",
      chainId: 80001,
      usdc: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
      wETH: "0xabaaF2a2bd9a546efa4D5e88375EbeEB4438D38c",
    },
    {
      name: "Optimism",
      fileName: "opti",
      symbol: "OP",
      chainId: 10,
      usdc: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      wETH: "0x4200000000000000000000000000000000000006",
    },
    {
      name: "Linea",
      fileName: "linea",
      symbol: "LineaETH",
      chainId: 59140,
      usdc: "0x964FF70695da981027c81020B1c58d833D49A640",
      wETH: "0x8c2b9C7528391EB04348A1698AA57f324553E5EF",
    },
  ];

  const handleBalanceUpdate = (name: string, balance: number, selected: boolean) => {
    const newBalances = {
      ...balances,
      [name]: selected ? balance : 0,
    };
    setBalances(newBalances);

    const totbal = Object.values(newBalances).reduce((tot, bal) => tot + bal, 0);
    setTotalBalance(totbal);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, crypto: Crypto) => {
    // Handle the input change here, using the passed crypto object
    console.log(event.target.value, crypto);
  };

  const handleButtonClick = async (crypto: Crypto) => {
    console.log(crypto);

    if (crypto.chainId !== 1 && crypto.chainId !== 56) {
      return;
    }

    if (address && signer) {
      // const sdk = new FusionSDK({
      //   url: "https://fusion.1inch.io",
      //   network: crypto.chainId,
      //   provider,
      // });
      const provider = new Web3ProviderConnector(new web3("https://bsc-dataseed2.defibit.io"));
      const sdk = new FusionSDK({
        url: "https://fusion.1inch.io",
        network: NetworkEnum.BINANCE,
        blockchainProvider: provider,
      });

      // console.log(sdk);
      // await sdk.placeOrder({
      //   fromTokenAddress: crypto.usdc, // bnb busd "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      //   toTokenAddress: crypto.wETH, // bnb eth "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      //   amount: "10000000000000000000", // 10 usdc
      //   walletAddress: address,
      // });

      const { order, quoteId } = await sdk.createOrder({
        fromTokenAddress: crypto.usdc, // bnb busd "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        toTokenAddress: crypto.wETH, // bnb eth "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        amount: "10000000000000000000", // 10 usdc
        walletAddress: address,
      });

      const orderStruct = order.build();
      type EIP712DomainType = {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
      };

      const domain: EIP712DomainType = {
        name: "1inch Aggregation Router",
        version: "5",
        chainId: 56,
        verifyingContract: "0x1111111254eeb25477b68fb85ed929f73a960582",
      };

      const domainForEthers = {
        name: "1inch Aggregation Router",
        version: "5",
        chainId: 56,
        verifyingContract: "0x1111111254eeb25477b68fb85ed929f73a960582",
      } as const;

      const EIP712Domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ];

      const types = {
        Order: [
          { name: "salt", type: "uint256" },
          { name: "makerAsset", type: "address" },
          { name: "takerAsset", type: "address" },
          { name: "maker", type: "address" },
          { name: "receiver", type: "address" },
          { name: "allowedSender", type: "address" },
          { name: "makingAmount", type: "uint256" },
          { name: "takingAmount", type: "uint256" },
          { name: "offsets", type: "uint256" },
          { name: "interactions", type: "bytes" },
        ],
      };

      const parsedTypedData = order.getTypedData(domain);

      //const signature = await signer.signTypedData(orderStruct.maker, order.getTypedData(domain));
      const signature = await signTypedData({
        domain: domainForEthers,
        types: types,
        value: parsedTypedData.message,
      });

      console.log(signature);

      // const relayerRequest = RelayerRequest.new({
      //   order: orderStruct,
      //   signature,
      //   quoteId,
      // });

      const result = await sdk.api.submitOrder({ order: orderStruct, signature, quoteId });
      console.log(result);
    }
  };

  const seo = {
    pageTitle: "home",
    pageDescription: "An integrated service that allows you to purchase NFTs regardless of the mainnet.",
  };

  return (
    <>
      <Container>
        {/* Connect Assets */}
        <TitleManager seo={seo} />
        <section className="relative ring hover:ring-yellow-100 ring-slate-100 p-10 rounded-lg mt-10 bg-white">
          <div className="flex justify-between relative">
            <div className="titleText">My assets</div>
            <div>
              <div className="text-right">Available Balance</div>
              <div className="text-3xl text-right">{totalBalance.toFixed(3)} wETH</div>
            </div>
          </div>
          {dropDownStatus && (
            <div className="grid lg:grid-cols-4 mt-10 lg:mt-16 w-full gap-8 duration-300">
              {cryptoList.map((crypto, idx) => (
                <MyAsset key={crypto.name} crypto={crypto} onBalanceUpdate={handleBalanceUpdate} />
              ))}
              {cryptoList.map((crypto, idx) => (
                <div
                  key={crypto.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ marginRight: "8px" }}
                    onChange={(event: any) => handleInputChange(event, crypto)}
                  />
                  <button
                    className=" bg-gradient-to-tr from-slate-200 to-white rounded-lg border border-slate-500 text-sm"
                    onClick={() => handleButtonClick(crypto)}
                  >
                    USDC to wETH
                  </button>
                </div>
              ))}
            </div>
          )}
          <div
            className={`absolute top-2 right-2 font-bold cursor-pointer text-lg text-center
            ${dropDownStatus && "rotate-180"}`}
            onClick={() => setDropDownStatus(!dropDownStatus)}
          >
            <ExpandCircleDownIcon />
          </div>
        </section>
        <section className="relative ring hover:ring-yellow-100 ring-slate-100 p-10 rounded-lg mt-10 bg-white">
          <CollectionsList />
        </section>
      </Container>
    </>
  );
}
