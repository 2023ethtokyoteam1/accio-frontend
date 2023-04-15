import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

interface CollectionItem {
  ranking: number;
  imageUrl: string;
  name: string;
  slug: string;
  floorPrice: number;
  volume: number;
  mainnet: string;
  address: string;
}

interface DataItemProps {
  item: CollectionItem;
}

const CryptoImage = ({ item }: DataItemProps) => {
  let imageSrc = "";

  switch (item.mainnet) {
    case "eth":
      imageSrc = "/img/crypto/color/eth.png";
      break;
    case "matic":
      imageSrc = "/img/crypto/color/matic.png";
      break;
    case "linea":
      imageSrc = "/img/crypto/color/linea.png";
      break;
    default:
      imageSrc = "/path/to/default-image.png";
      break;
  }

  return (
    <div>
      <Image src={imageSrc} alt="item image" width={30} height={30} />
    </div>
  );
};


const DataItem: React.FC<DataItemProps> = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname : "/item",
      query : 
        {
          id : item.name,
          address : item.address,
          slug : item.slug,
          mainnet : item.mainnet,
        }
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <Grid
      container
      item
      wrap="nowrap"
      alignItems="center"
      className="border border-gray-300 p-4 rounded-lg space-x-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 hover:shadow"
      onClick={handleClick}
    >
      <Grid item xs={1}>
        <CryptoImage item={item} />
      </Grid>
      <Grid item xs={3}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={50}
          height={50}
          className="w-16 h-16 border border-gray-400 rounded-md"
        />
      </Grid>
      <Grid item xs={4}>
        <Typography className="font-medium">{item.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{item.floorPrice.toFixed(2)} wETH</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{item.volume.toFixed(2)} wETH</Typography>
      </Grid>
    </Grid>
  );
};

const CollectionsList: React.FC = () => {
  const [data, setData] = useState<CollectionItem[]>([]);
  const [inputCollection, setInputCollection] = useState<string>("");
  const [collectionGrid, setCollectionGrid] = useState<number>(12);
  const [mainNetFilter, setMainNetFilter] = useState("all");

  const inputOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setInputCollection(value);
  };

  useEffect(() => {
    const fetchData = async () => {
        const ethResponse = await fetch("/data/mock/eth/collections.json");
        const ethData = await ethResponse.json();
  
        const polygonResponse = await fetch(
          "/data/mock/polygon/collections.json"
        );
        const polygonData = await polygonResponse.json();

        const lineaResponse = await fetch(
          "/data/mock/linea/collections.json"
        );
        const lineaData = await lineaResponse.json();
  
        const newData3 = ethData.map((item) => ({
          ranking: item.rank,
          imageUrl: item.image_url || "https://via.placeholder.com/100",
          name: item.name || `Data Item`,
          slug : item.slug || 'Data Slug',
          floorPrice: item.floor_price || Math.random() * 1000,
          volume: item.one_day_volume || Math.random() * 10000,
          mainnet: "eth",
          address: item.address
        }));
        const newData2 = polygonData.map((item) => ({
          ranking: item.rank,
          imageUrl: item.image_url || "https://via.placeholder.com/100",
          name: item.name || `Data Item`,
          slug : item.slug || 'Data Slug',
          floorPrice: item.floor_price || Math.random() * 1000,
          volume: item.one_day_volume || Math.random() * 10000,
          mainnet: "matic",
        }));
        const newData1 = lineaData.map((item) => ({
          ranking: item.rank,
          imageUrl: item.image_url || "https://via.placeholder.com/100",
          name: item.name || `Data Item`,
          slug : item.slug || 'Data Slug',
          floorPrice: item.floor_price || Math.random() * 1000,
          volume: item.one_day_volume || Math.random() * 10000,
          mainnet: "linea",
        }));
  
        setData(newData1.concat(newData2).concat(newData3));
      };
  
      fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const response = await fetch("/data/nftCollection.json");
  //     const json = await response.json();
  //     console.log(json)
  //     const items : CollectionItem[] = json.map((item: any) => ({
  //       id: item.id,
  //       name: `Nakamigos #${item.id}`,
  //       imageUrl: item.image_url,
  //       price: item.price,
  //     }));
  //     setAirStackData(items);
  //   };
  //   fetchItems();
  // }, []);

  return (
    <>
      <div className="flex justify-between">
        <div className="titleText">NFT Collections</div>
        <Grid
          item
          className="flex items-center justify-end gap-1 border border-slate-200 rounded-lg translate-y-5"
        >
          <button
            onClick={() => setMainNetFilter("all")}
            className={`py-2 px-2 ${
              mainNetFilter == "all" && "bg-slate-300"
            } rounded-l-lg hover:scale-110 duration-300`}
          >
            <Typography>All Chains</Typography>
          </button>
          <button
            onClick={() => setMainNetFilter("eth")}
            className={`py-2 px-1 ${
              mainNetFilter == "eth" && "bg-slate-300"
            } hover:scale-110 flex items-center justfiy-center py-2 px-2 duration-300`}
          >
            <Image
              src="/img/crypto/color/eth.png"
              width={50}
              height={50}
              alt="Polygon"
              className={`w-6 h-6 ${
                mainNetFilter == "matic"
                  ? "grayscale hover:grayscale-0 hover:scale-110"
                  : "grayscale-0"
              }`}
            />
          </button>
          <button
            onClick={() => setMainNetFilter("matic")}
            className={`py-2 px-1 ${
              mainNetFilter == "matic" && "bg-slate-300"
            } rounded-r-lg hover:scale-110 flex items-center justfiy-center py-2 px-2 duration-300`}
          >
            <Image
              src="/img/crypto/color/matic.png"
              width={50}
              height={50}
              alt="Polygon"
              className={`w-6 h-6 ${
                mainNetFilter == "eth"
                  ? "grayscale hover:grayscale-0 hover:scale-110"
                  : "grayscale-0"
              }`}
            />
          </button>
          <button
            onClick={() => setMainNetFilter("linea")}
            className={`py-2 px-1 ${
              mainNetFilter == "linea" && "bg-slate-300"
            } rounded-r-lg hover:scale-110 flex items-center justfiy-center py-2 px-2 duration-300`}
          >
            <Image
              src="https://linea.build/favicon-32x32.png"
              width={50}
              height={50}
              className={`w-6 h-6 ${
                mainNetFilter == "linea"
                  ? "grayscale hover:grayscale-0 hover:scale-110"
                  : "grayscale-0"
              }`}
              alt="Linea"
              
            />
          </button>
        </Grid>
      </div>
      <div className="flex relative mt-10">
        <input
          type="search"
          id="search"
          className="pl-12 p-3 text-slate-800 rounded-xl ring ring-[#00BCD4] shadow-lg
                                       text-sm focus:outline-none w-full"
          placeholder="Search"
          onChange={inputOnChange}
          value={inputCollection || ""}
        />
        <div className="flex absolute inset-y-0 left-4 items-center pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid container item className="w-full" spacing={4}>
          <Grid container item direction="column" xs={12} spacing={2}>
            {collectionGrid == 6 ? (
              <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={1}>
                  <Typography>Floor</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>Volume</Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={1}>
                  <Typography>Floor</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>Volume</Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                  <Typography>Floor</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Volume</Typography>
                </Grid>
              </Grid>
            )}
            <Grid item style={{ overflow: "hidden", overflowY: "scroll" }}>
              <Grid
                container
                className="w-full"
                spacing={2}
                style={{ height: "80vh" }}
              >
                {data
                  .filter(
                    (item) =>
                      mainNetFilter === "all" || item.mainnet === mainNetFilter
                  )
                  .map(
                    (item, index) =>
                      item.name
                        .toLowerCase()
                        .includes(inputCollection.toLowerCase()) && (
                        // item.floorPrice < availableBalance &&
                        <Grid item xs={collectionGrid} key={index}>
                          <DataItem key={index} item={item} />
                        </Grid>
                      )
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CollectionsList;
