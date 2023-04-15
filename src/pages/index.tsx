import { useState, useContext } from "react";
import { Container } from "@mui/material";
import { Crypto } from "../config/types";
import TitleManager from "@/components/common/TitleManager";
import MyAsset from "@/components/myAssets/MyAsset";
import CollectionsList from "@/components/nftCollections/CollectionsList";
import { balanceContext } from "../hooks/balanceContext";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

export default function Home() {
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(true);
  const { balances, setBalances, totalBalance, setTotalBalance } =
    useContext(balanceContext);

  const cryptoList: Crypto[] = [
    {
      name: "Ethereum",
      fileName: "eth",
      symbol: "ETH",
      chainId: 1,
      usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      wETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
      name: "Polygon",
      fileName: "matic",
      symbol: "MATIC",
      chainId: 137,
      usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      wETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
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
      wETH: "0x2C1b868d6596a18e32E61B901E4060C872647b6C",
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
              <div className="h-40">testtesttest</div>
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
