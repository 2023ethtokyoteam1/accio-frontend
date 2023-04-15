import { ethers } from "ethers";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import axios from "axios";
import TitleManager from "@/components/common/TitleManager";
import Image from "next/image";
import { Grid, Typography, Modal, Button, Container } from "@mui/material";
import { TokenBalance } from "@/config/types";

export default function mynft() {
  const [initLoading, setInitLoading] = useState(false);
  const [data, setData] = useState<TokenBalance[] | any>({ TokenBalance: [] });
  const [account, setAccount] = useState<string | null>(null);

  async function getAccount(): Promise<string | null> {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the user's account address
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        console.log("User account:", account);
        return account;
      } catch (error) {
        console.error("User denied account access:", error);
        return null;
      }
    } else {
      console.error("Non-Ethereum browser detected. Please install MetaMask or another web3-compatible browser.");
      return null;
    }
  }

  const handleImgError = (event) => {
    event.target.src = "/img/defaultImg.png";
  };

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  useEffect(() => {
    if (account) {
      (async () => {
        setInitLoading(true);
        const response = await axios.post("/api/accountdata", { account });
        setData(response.data.TokenBalances);
        setInitLoading(false);
      })();
    }
  }, [account]);

  const seo = {
    pageTitle: "MyNFTs",
    pageDescription: "An integrated service that allows you to purchase NFTs regardless of the mainnet.",
  };

  return (
    <>
      {/* Connect Assets */}
      <TitleManager seo={seo} />
        <Container>
          <section className="relative ring hover:ring-yellow-100 ring-slate-100 p-10 rounded-lg mt-10 bg-white bg-opacity-50">
            <div className="flex justify-between relative">
              <div className="titleText">My NFTs : {data.TokenBalance.length}</div>
            </div>
            <Grid container direction="column" alignItems="center" spacing={2} className="">
              <div className="grid grid-cols-4 mt-10 w-full gap-8">
                {data.TokenBalance &&
                  data.TokenBalance.map((nft, index: number) => (
                    <div key={index}>
                      <div className="w-48 h-48 overflow-hidden rounded-lg hover:scale-105 duration-300">
                        {nft.tokenNfts.metaData.image ? (
                          <Image
                            src={nft.tokenNfts.metaData.image}
                            width={200}
                            height={200}
                            onError={handleImgError}
                            className="aspect-square"
                            unoptimized={true}
                            alt="nftImages"
                          />
                        ) : (
                          <Image
                            src="/img/defaultImg.png"
                            width={200}
                            height={200}
                            className="aspect-square"
                            unoptimized={true}
                            alt="nftImages"
                          />
                        )}
                      </div>
                      <p>{nft.token.name}</p>
                      <p>{nft.tokenNfts.tokenId}</p>
                    </div>
                  ))}
              </div>
            </Grid>
          </section>
        </Container>
    </>
  );
}
