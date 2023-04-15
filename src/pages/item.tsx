import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Grid,
  Typography,
  Modal,
  Button,
  Container,
  Theme,
  TextField,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TitleManager from "@/components/common/TitleManager";
import axios from "axios";
import { BigNumber, ethers, providers } from "ethers";
import { ERC20, ERC20__factory } from "../typechain";
import { Address, useProvider, useSigner } from "wagmi";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { latestTx } from "@/config/types";
import { openseaData } from "@/config/types";
import ScatterChart from "../components/common/ScatterChart";
import { DateTime } from "luxon";
import Tooltip from "@mui/material/Tooltip";
import { lineaGoerliTestnet } from "@/config/chains";
import { deployedContracts } from "@/config/deployed_contracts";
import LiquidityAggregator from "../abis/ILiquidityAggregator.json";
import NFTMarket from "../abis/INFTMarket.json";
import LinkedSliders from "../components/LinkedSliders";
import SimpleModal from "../components/SimpleModal";
import { useEvmEvent } from "@/hooks/useEvmEvent";
import { goerli, polygonMumbai } from "wagmi/chains";
import TransitionLoading from "@/components/common/TransitionLoading";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

interface Steps {
  id: number;
  title: string;
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
  const [requsetedId, setRequestedId] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalChainId, setModalChainId] = useState<number>(0);
  const [isNetworkChangeModalOpen, setIsNetworkChangeModalOpen] =
    useState<boolean>(false);
  const { data: signer, isError, isLoading } = useSigner();
  // TODO : Hardcoded linea address
  const wETHContractMumbai = useTokenContract(deployedContracts.mumbai.weth);
  const wETHContractLinea = useTokenContract(deployedContracts.linea.weth);
  const provider = useProvider();
  // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  // Linea LiquidityAggregator#buy BuyMessageDispatched
  const {
    data: laBuyEventList,
    refetch: laBuyEventRefetch,
    error: laBuyEventError,
  } = useEvmEvent({
    chainId: lineaGoerliTestnet.id,
    contractAddress: deployedContracts.linea.liquidity_aggregator,
    abi: LiquidityAggregator.abi,
    eventName: "BuyMessageDispatched",
  });

  // Mumbai LiquidityAggregator#handle DispatchWithTokensMessageDispatched
  const {
    data: laHandleEventList,
    refetch: laHandleEventRefetch,
    error: laHandleEventError,
  } = useEvmEvent({
    chainId: polygonMumbai.id,
    contractAddress: deployedContracts.mumbai.liquidity_aggregator,
    abi: LiquidityAggregator.abi,
    eventName: "DispatchWithTokensMessageDispatched",
  });

  // Linea LiquidityAggregator#handleWithTokens FundFulfilled
  const {
    data: laHandleWithTokensEventList,
    refetch: laHandleWithTokensEventRefetch,
    error: laHandleWithTokensEventError,
  } = useEvmEvent({
    chainId: lineaGoerliTestnet.id,
    contractAddress: deployedContracts.linea.liquidity_aggregator,
    abi: LiquidityAggregator.abi,
    eventName: "FundFulfilled",
  });

  // Linea NFTMarket#buyNFT NFTSold
  const {
    data: marketBuyNFTEventList,
    refetch: marketBuyNFTRefetch,
    error: marketBuyNFTError,
  } = useEvmEvent({
    chainId: lineaGoerliTestnet.id,
    contractAddress: deployedContracts.linea.nft_market,
    abi: NFTMarket.abi,
    eventName: "NFTSold",
  });

  const [buyTxStatus, setBuyTxStatus] = useState(0);

  useEffect(() => {
    console.log("CurrentBuyStatus", buyTxStatus);
    console.log("Current Requested Id", requsetedId);
    if (requsetedId !== 0 && buyTxStatus !== 4) {
      try {
        console.log("CurrentBuyStatus", buyTxStatus);
        if (laHandleEventList && buyTxStatus == 1) {
          const singleEvent = laHandleEventList[laHandleEventList.length - 1];

          const reqId = singleEvent.args[0].toNumber();
          console.log("reqId", reqId);
          console.log("requsetedId", requsetedId);
          if (reqId === requsetedId) {
            console.log("handle success", laHandleEventList);
            setBuyTxStatus(2);
          }
        }

        if (laHandleWithTokensEventList && buyTxStatus == 2) {
          const singleEvent =
            laHandleWithTokensEventList[laHandleWithTokensEventList.length - 1];

          const reqId: number = singleEvent.args[0].toNumber();
          if (reqId === requsetedId) {
            console.log(
              "handleWithTokens success",
              laHandleWithTokensEventList
            );
            setBuyTxStatus(3);
          }
        }

        if (marketBuyNFTEventList && buyTxStatus === 3 && selectedItem) {
          const singleEvent =
            marketBuyNFTEventList[marketBuyNFTEventList.length - 1];

          const nftId: number = singleEvent.args[0].toNumber();
          console.log(nftId);
          console.log(selectedItem.id);
          if (nftId == selectedItem.id) {
            console.log("marketBuyNFT success", marketBuyNFTEventList);
            setBuyTxStatus(4);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [
    buyTxStatus,
    laBuyEventList,
    laHandleEventList,
    laHandleWithTokensEventList,
    marketBuyNFTEventList,
    requsetedId,
    laBuyEventList?.length,
    laHandleEventList?.length,
    laHandleWithTokensEventList?.length,
    marketBuyNFTEventList?.length,
  ]);

  const { chain } = useNetwork();
  const {
    isLoading: chainSwitchIsLoadingLinea,
    switchNetworkAsync: switchNetworkToLinea,
  } = useSwitchNetwork({
    chainId: lineaGoerliTestnet.id,
  });

  const {
    isLoading: chainSwitchIsLoadingMumbai,
    switchNetworkAsync: switchNetworkToMumbai,
  } = useSwitchNetwork({
    chainId: polygonMumbai.id,
  });

  const [txHistory, setTxHistory] = useState<latestTx[] | null>();
  const [osData, setOsData] = useState<openseaData | null>();

  const handleBuyButtonClick = async () => {
    setOpen(true);

    const nftInfo = {
      nftContract: deployedContracts.linea.nft,
      nftId: selectedItem?.id,
    };

    const funds = [
      {
        chainId: lineaGoerliTestnet.id,
        localWeth: deployedContracts.linea.weth,
        localWethAmount: ethers.utils.parseEther(sliderValue2.toString()),
      },
      {
        chainId: polygonMumbai.id,
        localWeth: deployedContracts.mumbai.hyp_weth,
        localWethAmount: ethers.utils.parseEther(sliderValue1.toString()),
      },
    ];

    if (signer && provider) {
      const LAContract = new ethers.Contract(
        (deployedContracts as any).linea.liquidity_aggregator,
        LiquidityAggregator.abi,
        provider
      );

      try {
        const tx = await LAContract.connect(signer).buy(nftInfo, funds);
        await tx.wait();

        const filter = LAContract.filters["BuyMessageDispatched"]();
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = Math.max(currentBlock - 100, 0); // Ensure the fromBlock is not negative
        const eventLogs = await provider.getLogs({
          ...filter,
          fromBlock: fromBlock,
          toBlock: "latest",
        });

        const parsedEvents = eventLogs.map((log: any) =>
          LAContract.interface.parseLog(log)
        );
        const requestId =
          parsedEvents[parsedEvents.length - 1].args[0].toNumber();
        setRequestedId(requestId);
        setBuyTxStatus(1);
        console.log("requestId", requestId);
        setOpen(false);
      } catch (e) {
        console.log(e);
        setOpen(false);
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
      } else if (
        modalChainId === lineaGoerliTestnet.id &&
        switchNetworkToLinea
      ) {
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
          await wETHContractMumbai
            .connect(signer)
            .approve(await signer.getAddress(), ethers.constants.MaxUint256);
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
          await wETHContractLinea
            .connect(signer)
            .approve(await signer.getAddress(), ethers.constants.MaxUint256);
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

  const steps = [
    { id: 0, title: "Buy transaction confirmed" },
    { id: 1, title: "Token message dispatched" },
    { id: 2, title: "Fund Fullfilled" },
    { id: 3, title: "NFT Recieved" },
  ];

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
  }, [colName, isModalOpen, mainnet, slug]);

  const fetchOsData = async () => {
    setInitLoading(true);
    const options = { method: "GET" };
    try {
      const res = await axios.get(
        `https://api.opensea.io/api/v1/collection/${slug}`,
        options
      );
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
        const airStack_key = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;
        const options = { headers: { authorization: airStack_key } };
        const response = await axios.post(
          "/api/latestTx",
          { colAddress },
          options
        );
        const response2 = await axios.post(
          "/api/collection",
          { colAddress },
          options
        );

        console.log("MetaData", response2);
        console.log("tx", response);

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

  const maxValue = 1;
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);

  const handleSlider1Change = (value: number) => {
    setSliderValue1(value);
    setSliderValue2(maxValue - value);
  };

  const handleSlider2Change = (value: number) => {
    setSliderValue1(maxValue - value);
    setSliderValue2(value);
  };

  const modalStyle = {
    zIndex: (theme: Theme) => theme.zIndex.modal,
  };

  const backdropStyle = {
    color: "#fff",
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  };

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
                  src={
                    osData?.banner_image_url
                      ? osData.banner_image_url
                      : "/img/defaultBanner.jpg"
                  }
                  width={400}
                  height={200}
                  className="w-full"
                  alt="BannerImg"
                />
              </div>
              <Grid
                container
                item
                className="mt-10 mx-10 rounded-t-lg z-10 h-60 bg-white"
              >
                <Grid item xs={7} className="mt-5 pl-5">
                  <div className="">
                    <Typography className=" font-bold text-[50px] text-slate-500 leading-[60px]">
                      {collectionQuery.id ? collectionQuery.id : "project NAME"}
                    </Typography>
                    <div className="flex gap-5">
                      <Tooltip title="Market Cap">
                        <Button
                          variant="contained"
                          className="px-3 bg-pink-400"
                          size="small"
                          aria-label="add"
                        >
                          MarketCap : {osData?.stats?.market_cap?.toFixed(3)}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Average Price">
                        <Button
                          variant="contained"
                          className="px-3 bg-green-400"
                          size="small"
                          aria-label="add"
                        >
                          Average : {osData?.stats?.average_price?.toFixed(3)}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Floor Price">
                        <Button
                          variant="contained"
                          className="px-3 bg-blue-400"
                          size="small"
                          aria-label="add"
                        >
                          Floor : {osData?.stats?.floor_price?.toFixed(3)}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Typography className="m-2 p-5 h-32 overflow-y-scroll">
                    {osData?.description ? osData.description : "Greeting from Tokyo. We are a group of artists and developers who are passionate about NFTs. We are currently working on a new project called 'NFTs for the People' and we are looking for talented artists to join us. If you are interested, please contact us at"}
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
                  <Grid
                    container
                    item
                    alignItems="top"
                    spacing={4}
                    padding={10}
                  >
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
                          <Typography className="font-medium text-lg">
                            {item.name}
                          </Typography>
                          <Typography className="font-medium text-lg mt-2">
                            {item.price.toFixed(2)} wETH
                          </Typography>
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
                <Modal
                  open={isModalOpen}
                  onClose={handleModalClose}
                  sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}
                >
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
                          <div>
                            <div className="mb-10">
                              <span className="font-bold text-xl font-roboto">
                                NFT info
                              </span>
                              <div className="bg-slate-200 rounded mt-2">
                                <Typography
                                  variant="h6"
                                  className="text-lg p-2 rounded-lg"
                                >
                                  Name : {selectedItem.name}{" "}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  className="text-lg p-2 rounded-lg"
                                >
                                  Price : {selectedItem.price.toFixed(2)} wETH
                                </Typography>
                              </div>
                            </div>
                            <Grid container direction="row" alignItems="center">
                              <Grid
                                item
                                xs={6}
                                marginBottom={2}
                                className="flex justify-center"
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled
                                  onClick={handleApproveButtonClickMumbai}
                                  style={{
                                    backgroundColor: "#1e90ff",
                                    alignSelf: "center",
                                    fontSize: "1rem",
                                    padding: "0.4rem 1rem",
                                  }}
                                >
                                  Approved on Mumbai
                                </Button>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                marginBottom={2}
                                className="flex justify-center"
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled
                                  onClick={handleApproveButtonClickLinea}
                                  style={{
                                    backgroundColor: "#1e90ff",
                                    alignSelf: "center",
                                    fontSize: "1rem",
                                    padding: "0.4rem 1rem",
                                  }}
                                >
                                  Approved on Linea
                                </Button>
                              </Grid>
                              <Grid item xs={2} className="flex justify-center">
                                <TextField
                                  variant="outlined"
                                  size="medium"
                                  style={{ marginRight: "8px" }}
                                  onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (val === '' || (val[val.length - 1] === '.' && !isNaN(parseFloat(val.slice(0, -1))))) {
                                      setSliderValue1(val); // Allow empty input or input ending with a period
                                    } else {
                                      const numVal = parseFloat(val);
                                      if (!isNaN(numVal)) {
                                        setSliderValue1(numVal);
                                      }
                                      // Ignore non-numeric inputs
                                    }
                                  }}
                                  value={sliderValue1}
                                />{" "}
                              </Grid>
                              <Grid item xs={4} className="flex justify-center">
                                <Typography
                                  variant="h5"
                                  className="font-medium mb-1"
                                >
                                  wETH from Mumbai
                                </Typography>
                              </Grid>
                              <Grid item xs={2} className="flex justify-center">
                                <TextField
                                  variant="outlined"
                                  size="medium"
                                  style={{ marginRight: "8px" }}
                                  onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (val === '' || (val[val.length - 1] === '.' && !isNaN(parseFloat(val.slice(0, -1))))) {
                                      setSliderValue2(val); // Allow empty input or input ending with a period
                                    } else {
                                      const numVal = parseFloat(val);
                                      if (!isNaN(numVal)) {
                                        setSliderValue2(numVal);
                                      }
                                      // Ignore non-numeric inputs
                                    }
                                  }}
                                  value={sliderValue2}
                                />{" "}
                              </Grid>
                              <Grid item xs={4} className="flex justify-center">
                                <Typography
                                  variant="h5"
                                  className="font-medium mb-1"
                                >
                                  wETH from Linea
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                className="flex justify-center"
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleBuyButtonClick}
                                  style={{
                                    backgroundColor: "#1e90ff",
                                    alignSelf: "center",
                                    fontSize: "1.2rem",
                                    padding: "0.4rem 1rem",
                                    marginTop: "1rem",
                                  }}
                                >
                                  Buy Now
                                </Button>
                              </Grid>
                            </Grid>
                          </div>

                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            className="mb-10"
                          ></Grid>
                        </div>
                      </>
                    )}
                    <div>
                      <div className="absolute flex rounded-lg outline-none justify-between p-10 mt-5 bg-white w-[800px]">
                        <Stepper
                          activeStep={buyTxStatus}
                          alternativeLabel
                          className="w-full"
                        >
                          {steps.map((label: Steps, idx: number) => (
                            <Step className="" key={label.id}>
                              <StepLabel
                                className={`text-lg ${
                                  buyTxStatus == label.id
                                    ? "animate-pulse"
                                    : null
                                }`}
                              >
                                <span className="text-xl">{label.title}</span>
                              </StepLabel>
                              {/* <Button
                                className={`${
                                  stepStatus !== label.id
                                    ? "text-slate-600"
                                    : null
                                } pl-20`}
                                onClick={() => {
                                  setStepStatus(label.id);
                                }}
                              >
                                TestBtn
                              </Button> */}
                            </Step>
                          ))}
                        </Stepper>
                      </div>
                    </div>
                  </div>
                </Modal>
                <SimpleModal
                  isOpen={isNetworkChangeModalOpen}
                  onButtonClick={handleNetworkChangeButtonClick}
                  chainId={modalChainId}
                  onClose={handleNetworkChangeModalClose}
                />
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
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
