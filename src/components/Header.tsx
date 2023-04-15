import { useState, useEffect } from "react";
import Link from "next/link";
import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const pages = [
    { title: "my wallet", href: "/wallet" },
    { title: "bidding", href: "/bidding" },
    { title: "collection", href: "/collection" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
                className={`sticky top-0 z-20 flex py-3 shadow-md my-auto"
        }`}
            >
                <AppBar position="static" className=" bg-slate-700">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <a href="/.">
                                <Image src="/img/logo.png" width={200} height={50} className="aspect-auto w-48" alt="logo" />
                            </a>
                            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            </Box>

                            {/* <Box sx={{ flexGrow: 0 }} className='flex items-center'>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Image
                                            alt="profile"
                                            src="/img/photo_sample.jpg"
                                            width={300}
                                            height={300}
                                            className="rounded-full w-16 aspect-square"
                                        />
                                    </IconButton>
                                </Tooltip>
                                
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page.title} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{page.title}</Typography>
                                        </MenuItem>
                                    ))}
                                    
                                </Menu>
                                
                            </Box> */}
                            <ConnectButton accountStatus="avatar"/>
                            
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </>
    );
}
