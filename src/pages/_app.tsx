import { useEffect, Fragment, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  lightTheme,
  getDefaultWallets,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { coinbaseWallet, metaMaskWallet, trustWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import {
  mainnet,
  goerli,
  arbitrum,
  avalanche,
  celo,
  filecoin,
  gnosis,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  localhost,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { lineaGoerliTestnet } from "@/config/chains";
import { balanceContext } from "../hooks/balanceContext";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    goerli,
    arbitrum,
    avalanche,
    celo,
    filecoin,
    gnosis,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    localhost,
    lineaGoerliTestnet,
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "CrossUnift",
  chains,
});

const appInfo = {
  appName: "CrossUnift",
};

const connectors = connectorsForWallets(wallets);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const progress = new ProgressBar({
  size: 6,
  color: "#00BCD4",
  className: "z-50",
  delay: 100,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeComplete", progress.finish);
    router.events.on("routeChangeError", progress.finish);

    return () => {
      router.events.off("routeChangeStart", progress.start);
      router.events.off("routeChangeComplete", progress.finish);
      router.events.off("routeChangeError", progress.finish);
    };
  }, [router]);

  return (
    <>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} theme={lightTheme({ borderRadius: "small" })} appInfo={appInfo}>
          <balanceContext.Provider value={{ balances, setBalances, totalBalance, setTotalBalance }}>
            <Layout>
              {/* <CssBaseline /> */}
              <Component {...pageProps} />
            </Layout>
          </balanceContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
