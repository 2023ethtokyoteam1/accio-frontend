import { useState, useEffect } from "react";
import Link from "next/link";
import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface InternalLinkProps {
  href?: string;
  children: React.ReactNode;
}

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // console.log(window.ethereum);
    // // if (typeof window.ethereum !== "undefined") {
    // try {
    //   const web = new ethers(window.ethereum);
    //   setEthers(web);
    // } catch (err) {
    //   console.log(err);
    // }
  }, []);

  // useEffect(() => {
  //   const listener = () => {
  //     if (window.scrollY > 140) {
  //       setAnimateHeader(true);
  //     } else setAnimateHeader(false);
  //   };
  //   window.addEventListener("scroll", listener);

  //   return () => {
  //     window.removeEventListener("scroll", listener);
  //   };
  // }, []);

  return (
    <>
      <div
        className={`sticky top-0 z-20 flex pb-3 shadow-md my-auto bg-white"
        }`}
      >
        <AppBar position="static" className=" bg-slate-700">
          <Container maxWidth="xl">
            <Toolbar disableGutters className="flex justify-between">
              <a href="/.">
                <Image
                  src="/img/accio.png"
                  width={300}
                  height={100}
                  className="aspect-auto w-28"
                  alt="logo"
                  priority={true}
                />
              </a>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <div className="flex">
                <Link href="/mynft" className="lg:hidden">
                  <Button className="text-slate-300 mr-3">My NFTs </Button>
                </Link>
                <ConnectButton accountStatus="avatar" />
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  );
}
