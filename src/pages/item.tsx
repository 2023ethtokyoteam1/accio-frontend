import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Grid, Typography, Modal, Button, Container } from "@mui/material";
import TitleManager from "@/components/common/TitleManager";
import axios from "axios";
import { ethers, providers } from "ethers";
import {
  ERC20,
  MockWethToken,
  MockWethToken__factory,
  MockInterchainAccountRouter,
  MockInterchainAccountRouter__factory,
  LiquidityAggregator,
  LiquidityAggregator__factory,
  MockLiquidityLayerRouter,
  MockLiquidityLayerRouter__factory,
  SeaportInterface__factory,
  ERC20__factory,
  ERC721__factory,
  ERC1155__factory,
  MockInterchainGasPaymaster,
  MockInterchainGasPaymaster__factory,
  IWETH9__factory,
  IWETH9,
} from "../typechain";
import { Address, useProvider, useSigner } from "wagmi";
import { useNetwork, useSwitchNetwork } from "wagmi";
import PurchaseStepGuide from "@/components/nftCollections/PurchaseStepGuide";
import { latestTx } from "@/config/types";
import ScatterChart from "../components/common/ScatterChart";
import { DateTime } from "luxon";
import TransitionLoading from "../components/common/TransitionLoading";
import Tooltip from "@mui/material/Tooltip";

interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  expiryDate: number;
}
interface ItemProps {
  crypto: Crypto;
  onBalanceUpdate: (name: string, balance: number, selected: boolean) => void;
}

const useLAContract = (address: Address) => {
  const [contract, setContract] = useState<LiquidityAggregator>();
  const provider = useProvider();

  useEffect(() => {
    if (address && provider) {
      const contractInstance = LiquidityAggregator__factory.connect(address, provider);
      setContract(contractInstance);
    }
  }, [address, provider]);

  return contract;
};

const useTokenContract = (address: Address) => {
  const [contract, setContract] = useState<ERC20>();
  const provider = useProvider();

  useEffect(() => {
    if (address && provider) {
      const contractInstance = ERC20__factory.connect(address, provider);
      setContract(contractInstance);
    }
  }, [address, provider]);

  return contract;
};

const ItemPage: React.FC = () => {
  const router = useRouter();
  const collectionQuery = router.query;
  const colName = collectionQuery.id;
  const colAddress = collectionQuery.address;
  const slug = collectionQuery.slug;
  const mainnet = collectionQuery.mainnet;

  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: signer, isError, isLoading } = useSigner();
  const wETHContract = useTokenContract("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");
  const LAContract = useLAContract("0xLAContractAddress");
  const { chain } = useNetwork();
  const { chains, error, isLoading: chainSwitchIsLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  const [txHistory, setTxHistory] = useState<latestTx[] | any>([]);
  const [osData, setOsData] = useState([]);

  const handleBuyButtonClick = () => {
    alert("You have purchased this item!");
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleApproveButtonClick = async () => {
    // alert("You have approved this item!");
    if (wETHContract && !isError && !isLoading && signer && chain) {
      try {
        // TODO : switch network to mainnet
        if (chain.id !== 1 && switchNetwork) {
          switchNetwork(1);
        }

        await wETHContract.connect(signer).approve(await signer.getAddress(), ethers.constants.MaxUint256);
      } catch (e) {
        console.log("error");
      }
    }
  };

  const seo = {
    pageTitle: selectedItem ? selectedItem.name : "collection",
    pageDescription: selectedItem
      ? `Purchase ${selectedItem.name} on our integrated NFT purchasing platform`
      : "An integrated service that allows you to purchase NFTs regardless of the mainnet.",
  };

  const scatterData = {
    datasets: [
      {
        label: "Last 30 Transactions",
        data: txHistory,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const fetchItems = async () => {
      const filename = `/data/mock/${mainnet}/${slug}.json`;
      const response = await fetch(filename);
      const json = await response.json();
      const items = json.map((item: any) => ({
        id: item.id,
        name: `${colName} #${item.id}`,
        imageUrl: item.image_url,
        price: item.price,
      }));
      setItems(items);
    };
    fetchItems();
  }, [isModalOpen]);

  const fetchOsData = async () => {
    setInitLoading(true);
    const options = { method: "GET" };
    try {
      const res = await axios.get(`https://api.opensea.io/api/v1/collection/${slug}`, options);
      const result = res.data;
      setOsData(result.collection);
    } catch {
      console.error(error);
    }
    setInitLoading(false);
  };

  const fetchAirStackTx = async () => {
    setInitLoading(true);
    if (colAddress) {
      try {
        const response = await axios.post("/api/latestTx", { colAddress });

        const data = response.data.map((d) => ({
          x: DateTime.fromISO(d.blockTimestamp.substring(0, 10)),
          y: Number(ethers.utils.formatEther(d.paymentAmount)),
        }));

        setTxHistory(data);
      } catch (error) {
        console.error(error);
      }
    }
    setInitLoading(false);
  };

  useEffect(() => {
    fetchAirStackTx();
    fetchOsData();
  }, []);

  console.log("osData", osData);
  // console.log("txHistory", txHistory);

  return (
    <>
      <TitleManager seo={seo} />
      <Container>
        <Grid
          container
          className="relative ring ring-slate-100 hover:ring-2 hover:ring-yellow-100 rounded-lg mt-10 bg-white overflow-hidden"
        >
          {!initLoading && osData ? (
            <>
              <div className="w-full absolute left-0 -top-20 overflow-hidden">
                <Image src={osData.banner_image_url} width={400} height={200} className="w-full" alt="BannerImg" />
              </div>
              <Grid container item className="mt-10 mx-10 rounded-t-lg bg-white z-10 h-60">
                <Grid item xs={7} className="mt-5 pl-5">
                  <div className="">
                    <Typography className=" font-bold text-[50px] text-slate-500 leading-[60px]">
                      {collectionQuery.id}
                    </Typography>
                    <div className="flex gap-5">
                      <Tooltip title="Market Cap">
                        <Button variant="extended" className="px-3 bg-pink-100" size="small" aria-label="add">
                          MarketCap : {osData.stats?.market_cap?.toFixed(3)}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Average Price">
                        <Button variant="extended" className="px-3 bg-green-100" size="small" aria-label="add">
                          Average : {osData.stats?.average_price?.toFixed(3)}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Floor Price">
                        <Button variant="extended" className="px-3 bg-blue-100" size="small" aria-label="add">
                          Floor : {osData.stats?.floor_price?.toFixed(3)}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Typography className="m-2 p-5 h-32 overflow-y-scroll">{osData.description}</Typography>
                </Grid>
                <Grid item xs={5} className="mt-2 relative">
                  {/* { !txHistory && 
                  <div className="absolute left-0 top-0 bg-slate-600 w-full h-72 bg-opacity-30 rounded-lg flex items-center justify-center">
                    Sorry. We currently only support Ethereum.
                  </div>
                  } */}
                  <ScatterChart data={scatterData} />
                </Grid>
              </Grid>
              <Grid item style={{ overflow: "hidden" }}>
                <Grid
                  container
                  className="w-full"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "80vh",
                    maxWidth: "130vh",
                  }}
                >
                  <Grid container item alignItems="center" spacing={4} padding={10}>
                    {items.map((item) => (
                      <Grid key={item.id} item xs={3}>
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-300 w-52 flex flex-col items-center justify-center">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            height={50}
                            width={50}
                            style={{
                              borderRadius: "0.5rem",
                            }}
                            className="w-[12vh] aspect-square mb-4"
                          />
                          <Typography className="font-medium text-lg">{item.name}</Typography>
                          <Typography className="font-medium text-lg mt-2">{item.price.toFixed(2)} ETH</Typography>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleCardClick(item)}
                              style={{ backgroundColor: "#1e90ff" }}
                              className="mt-4"
                            >
                              Buy
                            </Button>
                          </Grid>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Modal open={isModalOpen} onClose={handleModalClose}>
                  <div
                    className="bg-white py-4 rounded-lg outline-none"
                    style={{
                      margin: "auto",
                      width: "80%",
                      maxWidth: "800px",
                      height: "80%",
                      maxHeight: "600px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      border: "1px solid #ccc",
                      marginTop: "10rem",
                    }}
                  >
                    {selectedItem && (
                      <>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "70%",
                            marginBottom: "1rem",
                            borderRadius: "0.5rem",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={selectedItem.imageUrl}
                            alt={selectedItem.name}
                            style={{
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "0.5rem",
                              transform: "translateX(-50%)",
                              position: "absolute",
                              left: "50%",
                              boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            paddingLeft: 20,
                          }}
                        >
                          <Typography variant="h5" className="font-medium mb-1">
                            {selectedItem.name}
                          </Typography>
                          <Typography variant="h6" className="mb-4">
                            {selectedItem.price.toFixed(2)} ETH
                          </Typography>

                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={6} marginBottom={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleApproveButtonClick}
                                style={{
                                  backgroundColor: "#1e90ff",
                                  alignSelf: "center",
                                  fontSize: "1.2rem",
                                  padding: "0.75rem 1.5rem",
                                }}
                              >
                                Approve on Polygon
                              </Button>
                            </Grid>
                            <Grid item xs={6} marginBottom={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBuyButtonClick}
                                style={{
                                  backgroundColor: "#1e90ff",
                                  alignSelf: "center",
                                  fontSize: "1.2rem",
                                  padding: "0.75rem 1.5rem",
                                }}
                              >
                                Approve on Eth
                              </Button>
                            </Grid>
                          </Grid>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBuyButtonClick}
                            style={{
                              backgroundColor: "#1e90ff",
                              alignSelf: "center",
                              fontSize: "1.2rem",
                              padding: "0.75rem 1.5rem",
                              marginTop: "1.5rem",
                            }}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </>
                    )}
                    <PurchaseStepGuide />
                  </div>
                </Modal>
              </Grid>
            </>
          ) : (
            <TransitionLoading />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ItemPage;
