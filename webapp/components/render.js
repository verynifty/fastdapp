import MDX from '@mdx-js/runtime';
var yamlFront = require('yaml-front-matter');

import { default as React, useState, useEffect } from 'react';

import { useNetwork, useSwitchNetwork } from 'wagmi'
import Head from 'next/head'

import Moment from 'react-moment';
import toast from 'react-hot-toast';

import AddressDisplay from 'components/render/addressDisplay';
import DisplayVariable from 'components/render/displayVariable';
import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';
import TokenBalance from 'components/render/tokenBalance';
import ContractRead from 'components/render/contractRead';
import ContractWrite from 'components/render/contractWrite';
import Events from 'components/render/events';
import WatchEvents from 'components/render/watchEvents';

import Uniswap from 'components/render/uniswap';
import ReservoirSweep from 'components/render/reservoirSweep';
import ReservoirNFTDisplay from 'components/render/reservoirNFTDisplay';

import APICall from 'components/render/apiCall';

import { getAccount } from '@wagmi/core';
import { useAccount } from 'wagmi';

import ERC20ABI from 'ABIS/ERC20.json';
import ERC721ABI from 'ABIS/ERC721.json';
import ERC1155ABI from 'ABIS/ERC1155.json';

function formatAddress(address) {
    return (
        address.substring(0, 6) +
        "..." +
        address.substring(address.length - 4, address.length)
    );
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const components = {
    "AddressDisplay": AddressDisplay,
    "DisplayVariable": DisplayVariable,
    "BlockNumber": BlockNumber,
    "Balance": Balance,
    "TokenBalance": TokenBalance,
    "SendTransaction": SendTransaction,
    "ContractRead": ContractRead,
    "ContractWrite": ContractWrite,
    "Uniswap": Uniswap,
    "ReservoirSweep": ReservoirSweep,
    "ReservoirNFTDisplay": ReservoirNFTDisplay,
    "Events": Events,
    "WatchEvents": WatchEvents,
    "APICall": APICall,
    "Moment": Moment,
}
const scope = {
    "ABIs": { "ERC20": ERC20ABI, "ERC1155": ERC1155ABI, "ERC721": ERC721ABI },
    "userAddress": "",
    "location": "",
    "Toast": toast,
    "useState": useState,
    "formatAddress": formatAddress,
    "sleep": sleep,
};

const Render = (props) => {

    const [isLoaded, setIsLoaded] = React.useState(false);

    const [content, setContent] = React.useState("");
    const [requiredChain, setRequiredChain] = React.useState(null);
    const [theme, setTheme] = React.useState("light");

    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { address, isConnecting, isDisconnected } = useAccount()


    // Not used for now
    function cleanContent(c) {
        console.log("Clean content", c);
        let lines = c.split("\n");
        for (let i = 0; i < lines.length; i++) {
            //lines[i] = lines[i].trim();
        }
        /*lines = lines.filter((line) => {
            return !line == "";
        })*/
        c = lines.join("\n");
        console.log("Lines", c);
        return c;
    }

    function getChainName() {
        if (chains == null) {
            return "";
        }
        let ret = chains.filter((c) => { return c.id == requiredChain })
        if (ret.length > 0) {
            return ret[0].name;
        }
    }

    function setContentFromProp() {
        let parsedFront = yamlFront.loadFront(props.content);
        let content = parsedFront.__content;
        // remove tabs at begining of line
        content = content.replace(/\t/g, "");
        setContent(content);
        setRequiredChain(parsedFront.chain != null ? parseInt(parsedFront.chain) : 1);
        setTheme(parsedFront.theme != null ? parsedFront.theme : "light");
    }

    // This will run only once
    useEffect(() => {
        async function load() {
            try {
                setIsLoaded(false);
                const account = await getAccount();
                scope.userAddress = account.address;
                scope.location = props.location == null ? "editor" : props.location;
                const params = new URLSearchParams(window.location.search);
                for (var value of params.keys()) {
                    if (value != "template" && value != "ipfs") {
                        scope[value] = params.get(value);
                    }
                }
                setContentFromProp();
                setIsLoaded(true);
            } catch (error) {
                console.log("ERROR", error);
            }

        }
        console.log("RELOADDDDDD", address)
        load();
    }, [props.content, address]);


    if (!isLoaded) {
        return (<div>loading</div>);
    }

    const getRender = () => {
        if ((chain != null) && chain.id != requiredChain) {
            return (
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Wrong network</h3>
                    <p className="mt-1 text-sm text-gray-500">Please connect your wallet to the correct network to continue.</p>
                    <div className="mt-6">
                        <button onClick={() => switchNetwork?.(requiredChain)} type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Connect to: {getChainName(requiredChain)}
                        </button>
                    </div>
                </div>
            );
        } else {
            return (<MDX components={components} scope={scope}>{content}</MDX>);
        }
    }


    return (
        <React.Fragment>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/daisyui@3.1.1/dist/full.css" rel="stylesheet" type="text/css" />
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <div className="" data-theme={theme} class="min-h-screen">
                <div className={'mt-0 right-0 prose  max-w-none min-h-full'}>
                    {getRender()}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Render;