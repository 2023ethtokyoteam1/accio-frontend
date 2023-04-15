import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { ListItem, Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { balanceContext } from "../hooks/balanceContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const { totalBalance: sidebarwETH, setTotalBalance } = useContext(balanceContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const steps = ["Wallet & Mainnet Connect ", "Find & Buy NFT", "Wait & Receive NFT"];

  return (
    <>
      {/* Floating MenuBar, Only Support PC */}
      <Container className="mt-10 mx-10 hidden lg:block">
        <div
          className={`flex justify-center items-center shadow-g hover:ring hover:ring-yellow-100 p-10 rounded-2xl bg-white bg-opacity-50 w-80 h-96 relative overflow-hidden ${
            open ? "bg-[#00BCD4]" : "bg-white"
          }`}
        >
          <div>
            <Link
              href="/"
              className={`absolute -left-28 -top-20 bg-[#2196F3] ${
                open ? "opacity-0 translate-x-10 translate-y-10" : "opacity-40"
              } -rotate-[37deg] w-96 h-48 flex items-end hover:scale-105 hover:opacity-70 duration-300`}
            >
              <div className="rotate-[37deg] translate-x-28 -translate-y-12 text-2xl bg-slate font-pop font-bold underline italic">
                HOME
              </div>
            </Link>
            <Link
              href="/mynft"
              className={`absolute -right-28 -bottom-20 bg-[#4CAF50] ${
                open ? "opacity-0 -translate-x-10 -translate-y-10" : "opacity-40"
              } -rotate-[37deg] w-96 h-48 flex items-start hover:scale-105 hover:opacity-70 duration-300`}
            >
              <div className="rotate-[37deg] translate-x-44 translate-y-12 text-2xl bg-slate font-pop font-bold underline italic">
                MY NFT
              </div>
            </Link>
            <motion.button
              onClick={handleClickOpen}
              initial
              animate={{ translateX: [0, 3, -2, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Image
                src="/img/symbol_q.png"
                width={200}
                height={50}
                className="aspect-auto w-60 hover:scale-110 duration-300"
                alt="logo"
                priority={true}
              />
            </motion.button>
          </div>
        </div>
        <div className="flex justify-center items-center shadow-lg hover:ring hover:ring-yellow-100 ring-slate-100 mt-10 rounded-2xl bg-yellow-100 w-80 h-20 relative">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Available Balance"
              secondary={
                <>
                  <Typography sx={{ display: "inline" }} component="span" variant="h5" color="text.primary">
                    {sidebarwETH.toFixed(4)}
                  </Typography>
                  {" wETH "}
                </>
              }
            />
          </ListItem>
        </div>
      </Container>
      {/* Dialog */}
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          CrossUniFT
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="h1" align="center">
            🛫
          </Typography>
          <Typography gutterBottom my={2} className="font-roboto text-slate-800">
            Discover CrossUniFT, the game-changing service that unifies the process of purchasing NFTs across multiple
            chains. Say goodbye to the constraints of individual networks. With CrossUniFT, effortlessly combine your
            virtual currencies from various chains to acquire the NFTs you have been eyeing.
          </Typography>
          <Typography gutterBottom my={2} className="font-roboto text-slate-800">
            Picture this: 3 ETH on Ethereum, 2 WETH on Gnosis, and 1 WETH on Optimism - with CrossUniFT, you can
            smoothly pool these assets to purchase an NFT priced at 6 ETH, all through one intuitive platform.
          </Typography>
          <Typography gutterBottom my={2} className="font-roboto text-slate-800">
            CrossUniFT dismantles the barriers between blockchain networks, offering users a cohesive and efficient
            solution for buying NFTs, no matter the mainnet they belong to. Embrace the power of true cross-chain
            unification, and explore limitless opportunities in the NFT realm with CrossUniFT!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLOSE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
