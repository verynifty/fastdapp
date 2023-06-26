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

import { GoogleAnalytics } from "nextjs-google-analytics";
import TagManager from 'react-gtm-module';
import { Toaster } from 'react-hot-toast';

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
        TagManager.initialize({ gtmId: 'G-SV30RLSQGW' });
    }, []);

    return (
        <div data-theme="light" >
            <Head>
                <title>Fast Dapp</title>
                <meta property="og:title" content="Fast Dapp" />
                <meta property="og:description" content="Create web3 frontends in minutes" />
                <meta
                    property="og:image"
                    content="https://fastdapp.xyz/api/og?title=Fast%20Dapp&subtitle=Create%20websites%20for%20your%20DAPP%20in%20minutes."
                />
                <meta property="og:url" content="https://fastdapp.xyz" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="fastdapp.xyz" />
                <meta property="twitter:url" content="https://fastdapp.xyz" />
                <meta name="twitter:title" content="Fast Dapp" />
                <meta name="twitter:description" content="Create web3 frontends in minutes" />
                <meta name="twitter:image" content="https://fastdapp.xyz/api/og?title=Fast%20Dapp&subtitle=Create%20websites%20for%20your%20DAPP%20in%20minutes." />
                <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
                <noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
            </Head>
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
                        <GoogleAnalytics trackPageViews />
                        <Header />
                        <Component {...pageProps} />
                    </RainbowKitProvider>
                </WagmiConfig>
            </ReservoirKitProvider >
        </div>
    );
}

export default MyApp;
