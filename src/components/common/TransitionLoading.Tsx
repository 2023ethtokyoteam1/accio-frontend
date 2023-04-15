import React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TransitionLoading() {
    const variants = {
        hidden: {
            opacity: 0.6,
            y: 3,
        },
        visible: (i : number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
            },
        }),
    };

    return (
        <>
            <div className="fixed w-screen h-screen left-0 bottom-0 z-[100] bg-black opacity-70 flex justify-center font-pop font-bold items-center text-white">
                <motion.div 
                    className="flex justify-center items-center gap-2 animate-pulse"
                >
                    <Image
                        src="/img/symbol.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className=""
                    />
                    Loading...
                </motion.div>
            </div>
        </>
    );
}
