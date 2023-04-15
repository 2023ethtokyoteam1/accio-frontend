import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Grid, Typography, Modal, Button, Container } from "@mui/material";
import TitleManager from "@/components/common/TitleManager";
import axios from "axios";
import { ethers, providers } from "ethers";
import { ERC20, ERC20__factory } from "../typechain";
import { Address, useProvider, useSigner } from "wagmi";
import { useNetwork, useSwitchNetwork } from "wagmi";
import PurchaseStepGuide from "@/components/nftCollections/PurchaseStepGuide";
import { latestTx } from "@/config/types";
import { openseaData } from "@/config/types";
import ScatterChart from "../components/common/ScatterChart";
import { DateTime } from "luxon";
import Tooltip from "@mui/material/Tooltip";
import { lineaGoerliTestnet } from "@/config/chains";
import { deployedContracts } from "@/config/deployed_contracts";
import LiquidityAggregator from "../abis/ILiquidityAggregator.json";
import LinkedSliders from "../components/LinkedSliders";
import SimpleModal from "../components/SimpleModal";
import { useEvmEvent } from "@/hooks/useEvmEvent";
import { goerli, polygonMumbai } from "wagmi/chains";
// import TransitionLoading from "../components/common/TransitionLoading";

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
  const [modalChainId, setModalChainId] = useState<number>(0);
  const [isNetworkChangeModalOpen, setIsNetworkChangeModalOpen] = useState<boolean>(false);
  const { data: signer, isError, isLoading } = useSigner();
  // TODO : Hardcoded linea address
  const wETHContractMumbai = useTokenContract(deployedContracts.mumbai.weth);
  const wETHContractLinea = useTokenContract(deployedContracts.linea.weth);
  const provider = useProvider();
  // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")

  // Linea LiquidityAggregator#buy BuyMessageDispatched
  // Mumbai LiquidityAggregator#handle DispatchWithTokensMessageDispatched
  // Linea LiquidityAggregator#handleWithTokens FundFulfilled
  // Linea NFTMarket#buyNFT NFTSold
  const {
    data: laBuyEventList,
    refetch,
    error,
  } = useEvmEvent({
    chainId: lineaGoerliTestnet.id,
    contractAddress: deployedContracts.linea.liquidity_aggregator,
    abi: LiquidityAggregator.abi,
    eventName: "BuyMessageDispatched",
  });

  useEffect(() => {
    if (laBuyEventList) {
      console.log("laBuyEventList", laBuyEventList);
    }
  }, [laBuyEventList]);

  const { chain } = useNetwork();
  const { isLoading: chainSwitchIsLoadingLinea, switchNetworkAsync: switchNetworkToLinea } = useSwitchNetwork({
    chainId: lineaGoerliTestnet.id,
  });

  const { isLoading: chainSwitchIsLoadingMumbai, switchNetworkAsync: switchNetworkToMumbai } = useSwitchNetwork({
    chainId: polygonMumbai.id,
  });

  const [txHistory, setTxHistory] = useState<latestTx[] | null>();
  const [osData, setOsData] = useState<openseaData | null>();

  const handleBuyButtonClick = async () => {
    const nftInfo = { nftContract: deployedContracts.linea.nft, nftId: 0 };

    const funds = [
      { chainId: lineaGoerliTestnet.id, localWeth: deployedContracts.linea.weth, localWethAmount: 500_000_000_000 },
      { chainId: polygonMumbai.id, localWeth: deployedContracts.mumbai.hyp_weth, localWethAmount: 500_000_000_000 },
    ];
    if (signer && provider) {
      const LAContract = new ethers.Contract(
        (deployedContracts as any).linea.liquidity_aggregator,
        LiquidityAggregator.abi,
        provider
      );

      try {
        await LAContract.connect(signer).buy(nftInfo, funds);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleNetworkChangeButtonClick = async () => {
    try {
      if (modalChainId === polygonMumbai.id && switchNetworkToMumbai) {
        await switchNetworkToMumbai();
      } else if (modalChainId === lineaGoerliTestnet.id && switchNetworkToLinea) {
        await switchNetworkToLinea();
      }
    } catch (e) {
      console.log(e);
    }

    setModalChainId(0);
    setIsNetworkChangeModalOpen(false);
  };

  const handleNetworkChangeModalClose = () => {
    setModalChainId(0);
    setIsNetworkChangeModalOpen(false);
  };

  const handleApproveButtonClickMumbai = async () => {
    if (wETHContractMumbai && !isError && !isLoading && signer && chain) {
      try {
        console.log(chain.id);
        if (chain.id !== polygonMumbai.id && switchNetworkToMumbai) {
          setModalChainId(polygonMumbai.id);
          setIsNetworkChangeModalOpen(true);
        } else {
          await wETHContractMumbai.connect(signer).approve(await signer.getAddress(), ethers.constants.MaxUint256);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleApproveButtonClickLinea = async () => {
    if (wETHContractLinea && !isError && !isLoading && signer && chain) {
      try {
        if (chain.id !== lineaGoerliTestnet.id && switchNetworkToLinea) {
          setModalChainId(lineaGoerliTestnet.id);
          setIsNetworkChangeModalOpen(true);
        } else {
          await wETHContractLinea.connect(signer).approve(await signer.getAddress(), ethers.constants.MaxUint256);
        }
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
    } catch (e) {
      console.error(e);
      setOsData(null);
    }
    setInitLoading(false);
  };

  const fetchAirStackTx = async () => {
    setInitLoading(true);
    if (colAddress) {
      try {
        const response = await axios.post("/api/latestTx", { colAddress });

        const data = response.data.map((d: any) => ({
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

  const maxValue = 100;
  const [sliderValue1, setSliderValue1] = useState(maxValue / 2);
  const [sliderValue2, setSliderValue2] = useState(maxValue / 2);

  const handleSlider1Change = (value: number) => {
    setSliderValue1(value);
    setSliderValue2(maxValue - value);
  };

  const handleSlider2Change = (value: number) => {
    setSliderValue1(maxValue - value);
    setSliderValue2(value);
  };

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
          {!initLoading ? (
            <>
              <div className="w-full absolute left-0 -top-20 overflow-hidden h-80">
                <Image
                  src={osData?.banner_image_url ? osData.banner_image_url : "/img/defaultBanner.jpg"}
                  width={400}
                  height={200}
                  className="w-full"
                  alt="BannerImg"
                />
              </div>
              <Grid container item className="mt-10 mx-10 rounded-t-lg z-10 h-60 bg-white">
                <Grid item xs={7} className="mt-5 pl-5">
                  <div className="">
                    <Typography className=" font-bold text-[50px] text-slate-500 leading-[60px]">
                      {collectionQuery.id ? collectionQuery.id : "project NAME"}
                    </Typography>
                    <div className="flex gap-5">
                      <Tooltip title="Market Cap">
                        <Button variant="contained" className="px-3 bg-pink-400" size="small" aria-label="add">
                          MarketCap : {osData?.stats?.market_cap?.toFixed(3)}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Average Price">
                        <Button variant="contained" className="px-3 bg-green-400" size="small" aria-label="add">
                          Average : {osData?.stats?.average_price?.toFixed(3)}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Floor Price">
                        <Button variant="contained" className="px-3 bg-blue-400" size="small" aria-label="add">
                          Floor : {osData?.stats?.floor_price?.toFixed(3)}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Typography className="m-2 p-5 h-32 overflow-y-scroll">
                    {osData?.description ? osData.description : "description not found."}
                  </Typography>
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
              <Grid item xs={12} style={{ overflow: "hidden" }}>
                <Grid
                  container
                  className="w-full"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "80vh",
                    height: "60vh",
                  }}
                >
                  <Grid container item alignItems="top" spacing={4} padding={10}>
                    {items.map((item) => (
                      <Grid key={item.id} item xs={3}>
                        <div className="bg-gray-100 p-2 rounded-lg border border-gray-300 w-56 flex flex-col items-center justify-center">
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
                          <Typography className="font-medium text-lg mt-2">{item.price.toFixed(2)} wETH</Typography>
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
                            paddingRight: 20,
                          }}
                        >
                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={6} marginBottom={2} className="flex justify-center">
                              <Typography variant="h5" className="font-medium mb-1">
                                {selectedItem.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} marginBottom={2} className="flex justify-center">
                              <Typography variant="h5" className="font-medium mb-1">
                                {selectedItem.price.toFixed(2)} wETH
                              </Typography>
                            </Grid>
                            {/* <Grid item xs={6} marginBottom={2} className="flex justify-center">
                              <div>
                                <LinkedSliders
                                  maxValue={maxValue}
                                  sliderValue1={sliderValue1}
                                  sliderValue2={sliderValue2}
                                  onSlider1Change={handleSlider1Change}
                                  onSlider2Change={handleSlider2Change}
                                />
                                <Typography variant="h5" className="font-medium mb-1">
                                  {sliderValue1} wETH from Mumbai
                                </Typography>
                                <Typography variant="h5" className="font-medium mb-1">
                                  {sliderValue2} wETH from Linea
                                </Typography>
                              </div>
                            </Grid> */}
                          </Grid>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flexGrow: 1,
                              paddingLeft: 80,
                              paddingRight: 80,
                            }}
                          >
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={6} className="flex justify-center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleApproveButtonClickMumbai}
                                  style={{
                                    backgroundColor: "#1e90ff",
                                    alignSelf: "center",
                                    fontSize: "1rem",
                                    padding: "0.4rem 1rem",
                                  }}
                                >
                                  Approve on Mumbai
                                </Button>
                              </Grid>
                              <Grid item xs={6} className="flex justify-center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleApproveButtonClickLinea}
                                  style={{
                                    backgroundColor: "#1e90ff",
                                    alignSelf: "center",
                                    fontSize: "1rem",
                                    padding: "0.4rem 1rem",
                                  }}
                                >
                                  Approve on Linea
                                </Button>
                              </Grid>
                              <Grid item xs={12} className="flex justify-center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleBuyButtonClick}
                                  style={{
                                    backgroundColor: "#1e90ff",
                                    alignSelf: "center",
                                    fontSize: "1rem",
                                    padding: "0.4rem 1rem",
                                    marginTop: "1rem",
                                  }}
                                >
                                  Buy Now
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </>
                    )}
                    <PurchaseStepGuide />
                  </div>
                </Modal>
                <SimpleModal
                  isOpen={isNetworkChangeModalOpen}
                  onButtonClick={handleNetworkChangeButtonClick}
                  chainId={modalChainId}
                  onClose={handleNetworkChangeModalClose}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};

export default ItemPage;
