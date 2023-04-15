import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import CryptoIcon from "../components/common/CryptoIcon";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { toPercentage } from "chart.js/dist/helpers/helpers.core";

export default function Home() {
    const [inputCollection, setInputCollection] = useState("");
    const [searching, setSearching] = useState(false);
    const [availableBalance, setAvailableBalance] = useState<number>(42412);
    const [sliderValue, setSliderValue] = useState<number>(1);

    const cryptoList = [
        { name: "Ethereum", fileName: "eth", symbol: "ETH" },
        { name: "Polygon", fileName: "matic", symbol: "MATIC" },
        { name: "Bitcoin", fileName: "btc", symbol: "BTC" },
        { name: "USDC", fileName: "usdc", symbol: "USDC" },
        { name: "Tether", fileName: "usdt", symbol: "USDT" },
        { name: "Gnosis", fileName: "gno", symbol: "GNO" },
        { name: "Solana", fileName: "sol", symbol: "SOL" },
        { name: "Celo", fileName: "celo", symbol: "CELO" },
        { name: "Optimism", fileName: "opti", symbol: "OP" },
        { name: "Bnb", fileName: "bnb", symbol: "BNB" },
        { name: "Dai", fileName: "dai", symbol: "DAI" },
        { name: "Filecoin", fileName: "fil", symbol: "FIL" },
    ];

    const cryptoBoxes = [];

    for (let i = 0; i < 48; i++) {
        const boxColor = i >= 36 ? "bg-blue-200" : "bg-blue-500";
        cryptoBoxes.push(<div className={`w-4 h-4 ${boxColor} opacity-80`} key={i}></div>);
    }

    function calculateValue(value: number) {
        const calculatedValue = availableBalance * value;
        const formattedBalance = calculatedValue.toLocaleString("en-US", { style: "currency", currency: "USD" });
        return formattedBalance;
    }
    const toPercentage = (value: number) => value * 100;

    const sliderOnChange = (event: Event, sliderValue: number | number[]) => {
        if (typeof sliderValue === "number") {
            setSliderValue(sliderValue);
        }
    };

    const inputOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setInputCollection(value);
    };

    return (
        <>
            <section>
                <Container>
                    {/* Floating MenuBar, Only Support PC */}
                    <div className="fixed top-32 left-40 ">
                        <div className="flex justify-center items-center shadow-xl p-10 rounded-2xl bg-yellow-100 bg-opacity-50 w-80 h-96">
                            <div>
                                <button>Balance / NavIcon</button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center shadow-xl p-10 mt-10 rounded-2xl bg-yellow-100 bg-opacity-50 w-80 h-40">
                            <div>
                                <button>Status / Send / withdraw... </button>
                            </div>
                        </div>
                    </div>
                    {/* Connect Assets */}
                    <section className="relative shadow-xl p-10 rounded-lg mt-10 bg-white bg-opacity-50">
                        <div className="flex justify-between relative">
                            <div className="font-bold text-2xl text-slate-600">My assets</div>
                            <div>
                                <button>select All</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 mt-5 w-full gap-8">
                            {cryptoList.map((crypto, idx) => (
                                <CryptoIcon key={crypto.name} crypto={crypto} />
                            ))}
                        </div>
                        <section className="relative mt-10">
                            <div className="flex justify-between">
                                <div className="col-span-1 grid grid-cols-10 grid-rows-4 gap-0 w-50 h-24">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-4 h-4 ${i < 12 ? "bg-blue-500" : "bg-blue-200"} opacity-80`}
                                        />
                                    ))}
                                </div>

                                <div>
                                    <p className="text-right">Available Balance</p>
                                    <div className="text-3xl text-right"> {calculateValue(sliderValue)}</div>
                                    <Slider
                                        value={sliderValue}
                                        min={0.01}
                                        step={0.01}
                                        max={1}
                                        scale={(value) => toPercentage(value)} 
                                        onChange={sliderOnChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `${value.toLocaleString()}%`}
                                        aria-labelledby="continuous-slider"
                                    />
                                </div>
                            </div>
                        </section>
                    </section>
                    {/* NFT CollectionList */}
                    <section className="relative shadow-xl p-10 rounded-lg mt-10 bg-white bg-opacity-50">
                        <div className="flex justify-between">
                            <div className="font-bold text-2xl text-slate-600">NFT Collections</div>
                        </div>
                        <div className="my-5 flex relative">
                            <input
                                type="search"
                                id="search"
                                className="pl-12 p-3 text-slate-800 rounded-xl ring ring-cyan-500 shadow-lg
                                           text-sm  focus:outline-none w-full"
                                placeholder="SEARCH"
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
                        <div className="grid grid-cols-1 mt-16 w-full gap-10">
                            {cryptoList.map(
                                (crypto, idx) =>
                                    crypto.name.toLowerCase().includes(inputCollection.toLowerCase()) && (
                                        <CryptoIcon key={crypto.name} crypto={crypto} />
                                    )
                            )}
                        </div>
                    </section>
                </Container>
            </section>
        </>
    );
}
