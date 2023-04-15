import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Crypto {
    name: string;
    fileName: string;
    symbol: string;
}

interface CryptoIconProps {
    crypto: Crypto;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ crypto }) => {
    const [iconColor, setIconColor] = useState("black");
    const [selected, setSelected] = useState(false);
    const [isConnected, setIsConnected] = useState(false)

    const handleMouseEnter = () => {
        if (!selected) {
            setIconColor("color");
        }
    };
    const handleMouseLeave = () => {
        if (!selected) {
            setIconColor("black");
        }
    };
    const handleClick = () => {
        setSelected(!selected);
        setIconColor(selected ? "black" : "color");
    };

    const imagePath = `/img/crypto/${iconColor}/${crypto.fileName}.png`;

    return (
        <motion.div
            className={`flex relative items-center font-pop cursor-pointer bg-slate-100 rounded-xl h-24 hover:bg-white hover:border hover:border-slate-200 hover:shadow-xl ${
                selected ? "bg-white shadow-xl border border-slate-200" : "bg-slate-100"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", damping: 10 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            animate={selected ? { scale: 1.05, y: -5 } : {}}
        >
            <div className="m-3 px-auto text-center text-xs ">
                <Image src={imagePath} alt={crypto.name} width={300} height={300} className="w-16 aspect-square mb-1 mt-3" />
                {/* <div> {crypto.symbol}</div> */}
            </div>
            <div className="ml-1 relative w-full">
                <div className="font-extrabold text-slate-600"> {crypto.name}</div>
                <div className={`mt-3 ml-5 mr-3 bg-white rounded-l-lg p-2 text-right pr-5 ${!selected && 'shadow'  } `}>{selected ? <span>123,456 USD</span> : <span className="text-xs text-slate-600 ">Connect Wallet</span>}</div>
            </div>
            
            { selected && (<div className="absolute right-2 top-2 text-green-500 font-pop text-xs font-semibold">connected</div>)}
        </motion.div>
    );
};

export default CryptoIcon;
