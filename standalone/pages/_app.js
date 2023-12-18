import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

import '@rainbow-me/rainbowkit/styles.css';

import { default as React, useEffect, useState } from 'react';

import Head from 'next/head'

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, useProvider } from 'wagmi';
import {
  mainnet,
} from 'wagmi/chains';



import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { Toaster } from 'react-hot-toast';
import Script from "next/script";

import HeaderMetadata from '@/components/commons/headerMetadata';

import '@/DateTimePicker.css';

import {
  ReservoirKitProvider,
  lightTheme,
} from '@reservoir0x/reservoir-kit-ui'

const theme = lightTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
})



function MyApp({ Component, pageProps }) {

  const [availableChains, setAvailableChains] = useState([
    mainnet,
  ]);

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    availableChains,
    [
      publicProvider(),
      alchemyProvider({ apiKey: "8geS2cIqjhJTgXjZ" + "UebWKe7Gnpwh1CgC" })
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'FastDapp',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    chains
  });


  let wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
  });

  useEffect(() => {



  }, []);

  return (
    <div data-theme="mytheme">
      <Head>
        <meta property="og:url" content={process.env.url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={process.env.title} />
        <meta name="twitter:description" content={process.env.description} />
        <meta name="twitter:image" content="https://fastdapp.xyz/api/og?title=Fast%20Dapp&subtitle=Create%20websites%20for%20your%20DAPP%20in%20minutes." />      </Head>
      <HeaderMetadata />
      <ReservoirKitProvider
        options={{
          chains: [{
            id: 1,
            baseApiUrl: "https://api.reservoir.tools",
            default: true,
            apiKey: process.env.NEXT_PUBLIC_RESERVOIR_API_KEY
          }],
          source: "reservoir.market"

        }}
        theme={theme}
      >
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={darkTheme()} showRecentTransactions={true}>
            <div class="h-screen">
              <Toaster position="top-right" />
              <Component {...pageProps} />
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReservoirKitProvider >
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </div>
  );
}

export default MyApp;
