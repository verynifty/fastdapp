import MDX from '@mdx-js/runtime';
var yamlFront = require('yaml-front-matter');

import { default as React, useState, useEffect } from 'react';

import { useNetwork, useSwitchNetwork } from 'wagmi'


import DisplayVariable from 'components/render/displayVariable';
import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';
import TokenBalance from 'components/render/tokenBalance';
import ContractRead from 'components/render/contractRead';
import ContractWrite from 'components/render/contractWrite';

import Uniswap from 'components/render/uniswap';
import ReservoirSweep from 'components/render/reservoirSweep';

import { readContract, getAccount } from '@wagmi/core'

import ERC20ABI from 'ABIS/ERC20.json';
import ERC721ABI from 'ABIS/ERC721.json';
import ERC1155ABI from 'ABIS/ERC1155.json';

const THEMES = [
    {
        "name": "default",
        "classes": "prose max-w-none"
    },
    {
        "name": "dark",
        "classes": "prose  max-w-none dark:prose-invert bg-slate-950"
    },
    {
        "name": "pepe",
        "classes": "prose  max-w-none dark:prose-invert bg-green-700"
    }
]

let value = "// some comment";
const components = {
    "DisplayVariable": DisplayVariable,
    "BlockNumber": BlockNumber,
    "Balance": Balance,
    "TokenBalance": TokenBalance,
    "SendTransaction": SendTransaction,
    "ContractRead": ContractRead,
    "ContractWrite": ContractWrite,
    "Uniswap": Uniswap,
    "ReservoirSweep": ReservoirSweep
}
const scope = {
    "ABIs": { "ERC20": ERC20ABI, "ERC1155": ERC1155ABI, "ERC721": ERC721ABI },
    "userAddress": "",
    "useState": useState,
    "value": 55,
    "readContract": readContract,
    "getAccount": getAccount
};

const Render = (props) => {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [requiredChain, setRequiredChain] = React.useState(null);
    const [theme, setTheme] = React.useState(THEMES[0]);

    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()


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
        console.log("CONTENT CHANGED")
        let parsedFront = yamlFront.loadFront(props.content);
        console.log("PARSED FRONT", parsedFront);
        setContent(parsedFront.__content);
        console.log("CONTENT SET");
        setRequiredChain(parsedFront.chain != null ? parseInt(parsedFront.chain) : 1);
        console.log("REQUIRED  CHAIN");

        let theme = THEMES.filter((t) => { return t.name == parsedFront.theme });
        console.log("THEME  CHAIN");

        if (theme.length > 0) {
            setTheme(theme[0]);
        } else {
            setTheme(THEMES[0]);
        }
        console.log("END PROP");

    }

    // This will run only once
    useEffect(() => {
        async function load() {
            try {
                const account = await getAccount();
                scope.userAddress = account.address;
                setContentFromProp();
                setIsLoaded(true);
            } catch (error) {
                console.log("ERROR", error);
            }

        }
        load();
    }, []);

    useEffect(() => {
        setContentFromProp();
    }, [props.content]);

    if (!isLoaded) {
        return (<div>loading</div>);
    }

    const getRender = () => {
        if ((chain != null ) && chain.id != requiredChain) {
            return (
                <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 class="mt-2 text-sm font-semibold text-gray-900">Wrong network</h3>
                    <p class="mt-1 text-sm text-gray-500">Please connect your wallet to the correct network to continue.</p>
                    <div class="mt-6">
                        <button onClick={() => switchNetwork?.(requiredChain)} type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
            <div className={theme.classes}>
                {getRender()}
            </div>
        </React.Fragment>
    );
}

export default Render;