'use client';

import MDX from '@mdx-js/runtime';

import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef, useEffect } from 'react';

import DisplayVariable from 'components/render/displayVariable';
import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';

import { readContract, getAccount } from '@wagmi/core'



import TokenBalance from 'components/render/tokenBalance';

let value = "// some comment";
const components = { "DisplayVariable": DisplayVariable, "BlockNumber": BlockNumber, "Balance": Balance, "TokenBalance": TokenBalance, "SendTransaction": SendTransaction }
const scope = { "useState": useState, value: 55, readContract: readContract, getAccount: getAccount };





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