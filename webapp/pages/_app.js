import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

import '@rainbow-me/rainbowkit/styles.css';

import { default as React, useEffect } from 'react';

import Head from 'next/head'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig, useProvider } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { Toaster } from 'react-hot-toast';
import Script from "next/script";

import HeaderMetadata from '@/components/commons/headerMetadata';


import '@/DateTimePicker.css';

import {
    ReservoirKitProvider,
    darkTheme,
} from '@reservoir0x/reservoir-kit-ui'

const theme = darkTheme({
    headlineFont: "Sans Serif",
    font: "Serif",
    primaryColor: "#323aa8",
    primaryHoverColor: "#252ea5",
})

import { Header } from '@/components/Header'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        goerli
    ],
    [
        publicProvider(),
        alchemyProvider({ apiKey: "8geS2cIqjhJTgXjZ" + "UebWKe7Gnpwh1CgC" })
    ]
);

/*
const connectors = [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
];
*/

const { connectors } = getDefaultWallets({
    appName: 'test',
    projectId: process.env.WALLET_CONNECT_PROJECT_ID,
    chains
});


const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
});



function MyApp({ Component, pageProps }) {

    useEffect(() => {
    }, []);

    return (
        <div data-theme="light" >
            <Head>
                <meta property="og:url" content="https://fastdapp.xyz" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Fast Dapp" />
                <meta name="twitter:description" content="Create web3 frontends in minutes" />
                <meta name="twitter:image" content="https://fastdapp.xyz/api/og?title=Fast%20Dapp&subtitle=Create%20websites%20for%20your%20DAPP%20in%20minutes." />
            </Head>
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
                    <RainbowKitProvider chains={chains} showRecentTransactions={true}>
                        <Toaster position="top-right" />
                        <Header />
                        <Component {...pageProps} />
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
