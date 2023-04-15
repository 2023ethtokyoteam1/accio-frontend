import React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TransitionLoading() {
  return (
    <>
      <div className="fixed w-screen h-screen left-0 bottom-0 z-[100] bg-black opacity-70 flex justify-center font-pop font-bold items-center text-white">
        <motion.div className="flex justify-center items-center gap-2 animate-pulse">
          <Image
            src="/img/accio.png"
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
