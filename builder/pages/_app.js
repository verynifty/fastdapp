import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig, useProvider } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

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
    [publicProvider()]
);

const connectors = [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
];


const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
});


function MyApp({ Component, pageProps }) {
    return (
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
                    <Header />
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </WagmiConfig>
        </ReservoirKitProvider >
    );
}

export default MyApp;