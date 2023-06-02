'use client';

import MDX from '@mdx-js/runtime';

import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef } from 'react';

import DisplayVariable from 'components/render/displayVariable';
import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';

import { readContract, getAccount } from '@wagmi/core'



import TokenBalance from 'components/render/tokenBalance';

let value = "// some comment";
const components = { "DisplayVariable": DisplayVariable, "BlockNumber": BlockNumber, "Balance": Balance, "TokenBalance": TokenBalance, "SendTransaction": SendTransaction }
const scope = { "useState": useState, value: 55, readContract: readContract, getAccount: getAccount};
class Render extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        readContract({"address": "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81", "abi": [{
            "inputs": [
              
            ],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }], "method": "totalSupply"}).then((result) => {
            console.log("@@@@@@@@@@@", result)
          })
    }

    componentWillUnmount() {
    
    }



    render() {

        return (
            <MDX components={components} scope={scope} >{this.props.content}</MDX>
        );
    }
}



export default Render;