import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Ethers from "ethers";
import { useAccount, useBalance, Address } from "wagmi";
import { utils } from "ethers";
import useQuote from "../../hooks/useQuote";
import { Crypto } from "../../config/types";
import { useLocalStorageState } from "@/hooks/useLocalStorageComponent";

interface CryptoIconProps {
  crypto: Crypto;
  onBalanceUpdate: (name: string, balance: number, selected: boolean) => void;
}

const tokens = ["0x0"];

function useBalanceHook(
  address: Address | undefined,
  chainId?: number | undefined,
  token?: Address | undefined
) {
  const { data, isSuccess } = useBalance({
    address: address,
    chainId: chainId,
    token: token,
  });

  return {
    data: data
      ? utils
          .formatUnits(data.value, data.decimals === 6 ? "szabo" : "ether")
          .slice(0, 5)
      : undefined,
    isSuccess,
  };
}

// chainId
// 1: ETH Mainnet
// 137: Polygon Mainnet
// 5: Goerli
// 80001: Mumbai

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

const MyAsset: React.FC<CryptoIconProps> = ({ crypto, onBalanceUpdate }) => {
  const isMounted = useIsMounted();

  const [iconColor, setIconColor] = useState("black");
  const [selected, setSelected] = useLocalStorageState(
    "selected" + crypto.name,
    false
  );
  const { address, connector, isConnected } = useAccount();
  // const [balUSD, setBalUSD] = useState(0);
  const [balwETH, setBalwETH] = useState(0);
  const { data: nativeBalance, isSuccess: nativeSuccess } = useBalanceHook(
    address,
    crypto.chainId
  );
  const { data: usdcBalance, isSuccess: usdcSuccess } = useBalanceHook(
    address,
    crypto.chainId,
    crypto.usdc
  );
  const { data: wETHBalance, isSuccess: wETHSuccess } = useBalanceHook(
    address,
    crypto.chainId,
    crypto.wETH
  );

  const nativeTokenAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const amount = "1000000";
  const amount18 = "1";
  const {
    data: usdcData,
    loading: usdcLoading,
    error: usdcError,
  } = useQuote(crypto.usdc, crypto.wETH, amount, crypto.chainId);

  const {
    data: nativeData,
    loading: nativeLoading,
    error: nativeError,
  } = useQuote(nativeTokenAddress, crypto.wETH, amount18, crypto.chainId);

  //   const handleMouseEnter = () => {
  //     if (!selected) {
  //       setIconColor("color");
  //     }
  //   };
  //   const handleMouseLeave = () => {
  //     if (!selected) {
  //       setIconColor("black");
  //     }
  //   };
  const handleClick = () => {
    setSelected(!selected);
    setIconColor(selected ? "black" : "color");
  };

  useEffect(() => {
    if (
      usdcSuccess &&
      nativeSuccess &&
      wETHSuccess &&
      !usdcLoading &&
      !usdcError &&
      !nativeLoading &&
      !nativeError
    ) {
      const calcBalwETH =
        Number(nativeBalance) / Number(nativeData.toTokenAmount) +
        Number(wETHBalance) +
        Number(usdcBalance) / Number(usdcData.toTokenAmount);

      console.log(nativeBalance);
      console.log(Number(nativeBalance) / Number(nativeData.toTokenAmount));
      console.log(wETHBalance);
      console.log(usdcBalance);
      console.log(Number(usdcBalance) / Number(usdcData.toTokenAmount));
      console.log(calcBalwETH);

      setBalwETH(calcBalwETH);
      onBalanceUpdate(crypto.name, calcBalwETH, selected);
    }
  }, [usdcSuccess, nativeSuccess, wETHSuccess, selected, usdcLoading, usdcError, nativeLoading, nativeError]);

  const imagePath = `/img/crypto/${selected ? "color" : "black"}/${
    crypto.fileName
  }.png`;

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      className={`flex relative items-center font-pop cursor-pointer bg-slate-100 rounded-xl hover:border hover:border-slate-200 hover:shadow-xl ${
        selected ? "bg-white shadow-xl border border-slate-200" : "bg-slate-100"
      }`}
      whileHover={{ scale: 1.03, y: -10 }}
      transition={{ type: "spring", damping: 10 }}
      whileTap={{ scale: 0.95 }}
      //   onMouseEnter={handleMouseEnter}
      //   onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={selected ? { scale: 1.05, y: -5 } : {}}
    >
      <div className="mb-10 lg:mb-20 m-3 px-auto text-center text-xs ">
        <Image
          src={imagePath}
          alt={crypto.name}
          width={300}
          height={300}
          className="w-16 aspect-square"
        />
        {/* <div> {crypto.symbol}</div> */}
      </div>
      <div className="ml-1 relative w-full">
        <div className="font-extrabold text-slate-600"> {crypto.name}</div>
        <div
          className={`mt-3 mr-3 h-12 bg-white rounded-l-lg p-4 flex flex-col justify-center items-end ${
            !selected && "shadow"
          } `}
        >
          {selected ? (
            <>
              <span className="text-xs">
                {nativeBalance} {crypto.symbol}
              </span>
              <span className="text-xs">{wETHBalance} wETH</span>
              <span className="text-xs">{usdcBalance} USDC</span>
              <span className="text-xs font-bold">
                {balwETH.toFixed(3)} wETH
              </span>
            </>
          ) : (
            <>
              <span className="text-xs text-slate-600">Utilize this Chain</span>
            </>
          )}
        </div>
      </div>

      {selected && (
        <div className="absolute right-2 top-2 text-[#4CAF50] font-pop text-xs font-semibold">
          selected
        </div>
      )}
    </motion.div>
  );
};

export default MyAsset;
