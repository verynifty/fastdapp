'use client';

import MDX from '@mdx-js/runtime';

import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef, useEffect } from 'react';

import DisplayVariable from 'components/render/displayVariable';
import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';
import TokenBalance from 'components/render/tokenBalance';
import ContractRead from 'components/render/contractRead';
import Uniswap from 'components/render/uniswap';

import { readContract, getAccount } from '@wagmi/core'




import ERC20ABI from 'ABIS/ERC20.json';
import ERC721ABI from 'ABIS/ERC721.json';
import ERC1155ABI from 'ABIS/ERC1155.json';

let value = "// some comment";
const components = {
    "DisplayVariable": DisplayVariable,
    "BlockNumber": BlockNumber,
    "Balance": Balance,
    "TokenBalance": TokenBalance,
    "SendTransaction": SendTransaction,
    "ContractRead": ContractRead,
    "Uniswap": Uniswap
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

    // This will run only once
    useEffect(() => {
        async function load() {
            try {
                const account = await getAccount();
                scope.userAddress = account.address;
                setIsLoaded(true);
            } catch (error) {
            }

        }
        load();
    }, []);

    const getRender = () => {
        if (!isLoaded) {
            return (<div>loading</div>);
        } else {
            console.log(scope.userAddress)
            return (<MDX components={components} scope={scope}>{props.content}</MDX>);
        }
    }


    return (
        <React.Fragment>
            {getRender()}
        </React.Fragment>
    );
}

export default Render;