import { useState, useContext, ChangeEvent } from "react";
import { Container, Button, TextField } from "@mui/material";
import { Crypto } from "../config/types";
import TitleManager from "@/components/common/TitleManager";
import MyAsset from "@/components/myAssets/MyAsset";
import CollectionsList from "@/components/nftCollections/CollectionsList";
import { balanceContext } from "../hooks/balanceContext";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { FusionSDK, PrivateKeyProviderConnector } from "@1inch/fusion-sdk";
import web3 from "web3";

export default function Home() {
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(true);
  const { balances, setBalances, totalBalance, setTotalBalance } =
    useContext(balanceContext);

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
    // goerli
    {
      name: "Goerli",
      fileName: "eth",
      symbol: "ETH",
      chainId: 5,
      usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      wETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    },
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

  const handleBalanceUpdate = (
    name: string,
    balance: number,
    selected: boolean
  ) => {
    const newBalances = {
      ...balances,
      [name]: selected ? balance : 0,
    };
    setBalances(newBalances);

    const totbal = Object.values(newBalances).reduce(
      (tot, bal) => tot + bal,
      0
    );
    setTotalBalance(totbal);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    crypto: Crypto
  ) => {
    // Handle the input change here, using the passed crypto object
    console.log(event.target.value, crypto);
  };

  const handleButtonClick = (crypto: Crypto) => {
    // Handle the button click here, using the passed crypto object
    // const blockchainProvider = new PrivateKeyProviderConnector(
    //   "0x00",
    //   new web3(nodeURL)
    // );
    // console.log(crypto);
    // const sdk = new FusionSDK({
    //   url: "https://fusion.1inch.io",
    //   network: crypto.chainId,
    //   blockchainProvider,
    // });
    // console.log(sdk);
    // sdk
    //   .placeOrder({
    //     fromTokenAddress: crypto.usdc, // bnb busd "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    //     toTokenAddress: crypto.wETH, // bnb eth "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    //     amount: "54300000000000000000", // 0.01 native token
    //     walletAddress: address,
    //     fee: {
    //       takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
    //       takingFeeReceiver: "0x0000000000000000000000000000000000000000", //  fee receiver address
    //     },
    //   })
    //   .then(console.log);
  };

  const seo = {
    pageTitle: "home",
    pageDescription:
      "An integrated service that allows you to purchase NFTs regardless of the mainnet.",
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
              <div className="text-3xl text-right">
                {totalBalance.toFixed(3)} wETH
              </div>
            </div>
          </div>
          {dropDownStatus && (
            <div className="grid lg:grid-cols-4 mt-10 lg:mt-16 w-full gap-8 duration-300">
              {cryptoList.map((crypto, idx) => (
                <MyAsset
                  key={crypto.name}
                  crypto={crypto}
                  onBalanceUpdate={handleBalanceUpdate}
                />
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
