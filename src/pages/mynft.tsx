import { ethers, providers } from "ethers";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import axios from "axios";
import TitleManager from "@/components/common/TitleManager";
import TransitionLoading from "../components/common/TransitionLoading";
import Image from "next/image";
import { Grid, Typography, Modal, Button, Container } from "@mui/material";
import { TokenBalance, createEmptyTokenNft, defaultTokenBalance } from "@/config/types";
import { useProvider, useAccount } from "wagmi";
import { deployedContracts } from "@/config/deployed_contracts";
import NFTContract from "../abis/NFTContract.json";

const MyNFT: React.FC = () => {
  const [initLoading, setInitLoading] = useState(false);
  const [data, setData] = useState<TokenBalance[] | any>({ TokenBalance: [] });
  const [account, setAccount] = useState<string | null>(null);
  const provider = useProvider();
  const { address } = useAccount();
  const nftImage = [
    "https://i.ibb.co/w7Yvh1Z/avatar-0000.png",
    "https://i.ibb.co/NVBd9h8/avatar-0001.png",
    "https://i.ibb.co/Nsv1cMw/avatar-0002.png",
    "https://i.ibb.co/fYVgCM2/avatar-0003.png",
    "https://i.ibb.co/sgR3q6S/avatar-0004.png",
    "https://i.ibb.co/kGdSm3G/avatar-0005.png",
    "https://i.ibb.co/PzYT6wP/avatar-0006.png",
    "https://i.ibb.co/hCHkvWK/avatar-0007.png",
    "https://i.ibb.co/TtS1Fqf/avatar-0008.png",
    "https://i.ibb.co/tmkL8WQ/avatar-0009.png",
  ];

  interface Nft {
    tokenId: number;
    image: string;
    name: string;
  }

  const [testData, setTestData] = useState<Nft[]>([]);
  const fetchNftByAddress = async () => {
    setInitLoading(true);
    if (provider && account && address) {
      const MyNFT = new ethers.Contract((deployedContracts as any).linea.nft, NFTContract.abi, provider);

      let oldData = [...testData];
      for (let i = 0; i < 10; i++) {
        const owner: any = await MyNFT.ownerOf(i);
        if (owner == address) {
          let newNFT = {
            tokenId: i,
            image: nftImage[i],
            name: "XUniFT #" + i.toString(),
          };
          oldData = [...oldData, newNFT];
        }
      }
      setTestData(oldData);
      console.log(testData);
    }
    setInitLoading(false);
  };

  async function getAccount(): Promise<string | null> {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the user's account address
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        // console.log("User account:", account);
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

  const handleImgError = (event: any) => {
    event.target.src = "/img/defaultImg.png";
  };

  const fetchAirStackNft = async () => {
    setInitLoading(true);
    if (account) {
      try {
        const airStack_key = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;
        const options = { headers: { authorization: airStack_key } };
        const response = await axios.post("/api/accountdata", { account }, options);

        setData(response.data.TokenBalances);
      } catch (error) {
        console.error(error);
      }
    }
    setInitLoading(false);
  };

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  useEffect(() => {
    //fetchAirStackNft();
    fetchNftByAddress();
  }, [provider, account, address]);

  const seo = {
    pageTitle: "MyNFTs",
    pageDescription: "An integrated service that allows you to purchase NFTs regardless of the mainnet.",
  };

  return (
    <>
      {/* Connect Assets */}
      <TitleManager seo={seo} />
      {!initLoading ? (
        <Container>
          <section className="relative ring hover:ring-yellow-100 ring-slate-100 p-10 rounded-lg mt-10 bg-white w-full">
            <div className="flex justify-between relative ">
              <div className="titleText">My NFTs : {testData?.length}</div>
            </div>
            <Grid container direction="column" alignItems="center" spacing={2} className="">
              <div className="grid grid-cols-4 mt-10 w-full gap-8">
                {testData &&
                  testData.map((nft: any, index: number) => (
                    <div key={index}>
                      <div className="w-48 h-48 overflow-hidden rounded-lg hover:scale-105 duration-300">
                        {nft.image ? (
                          <Image
                            src={nft.image}
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
                      <p>{nft.name}</p>
                      <p>{nft.tokenId}</p>
                    </div>
                  ))}
              </div>
            </Grid>
          </section>
        </Container>
      ) : (
        <TransitionLoading />
      )}
    </>
  );

  // return (
  //   <>
  //     {/* Connect Assets */}
  //     <TitleManager seo={seo} />
  //     {!initLoading ? (
  //       <Container>
  //         <section className="relative ring hover:ring-yellow-100 ring-slate-100 p-10 rounded-lg mt-10 bg-white w-full">
  //           <div className="flex justify-between relative ">
  //             <div className="titleText">My NFTs : {data.TokenBalance?.length}</div>
  //           </div>
  //           <Grid container direction="column" alignItems="center" spacing={2} className="">
  //             <div className="grid grid-cols-4 mt-10 w-full gap-8">
  //               {data.TokenBalance &&
  //                 data.TokenBalance.map((nft: any, index: number) => (
  //                   <div key={index}>
  //                     <div className="w-48 h-48 overflow-hidden rounded-lg hover:scale-105 duration-300">
  //                       {nft.tokenNfts.metaData.image ? (
  //                         <Image
  //                           src={nft.tokenNfts.metaData.image}
  //                           width={200}
  //                           height={200}
  //                           onError={handleImgError}
  //                           className="aspect-square"
  //                           unoptimized={true}
  //                           alt="nftImages"
  //                         />
  //                       ) : (
  //                         <Image
  //                           src="/img/defaultImg.png"
  //                           width={200}
  //                           height={200}
  //                           className="aspect-square"
  //                           unoptimized={true}
  //                           alt="nftImages"
  //                         />
  //                       )}
  //                     </div>
  //                     <p>{nft.token.name}</p>
  //                     <p>{nft.tokenNfts.tokenId}</p>
  //                   </div>
  //                 ))}
  //             </div>
  //           </Grid>
  //         </section>
  //       </Container>
  //     ) : (
  //       <TransitionLoading />
  //     )}
  //   </>
  // );
};

export default MyNFT;
