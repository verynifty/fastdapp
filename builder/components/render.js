'use client';

import MDX from '@mdx-js/runtime';

import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef } from 'react';


import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';

import TokenBalance from 'components/render/tokenBalance';

let value = "// some comment";
const components = { "BlockNumber": BlockNumber, "Balance": Balance, "TokenBalance": TokenBalance, "SendTransaction": SendTransaction }

class Render extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    
    }

    componentWillUnmount() {
    
    }



    render() {

        return (
            <MDX components={components} >{this.props.content}</MDX>
        );
    }
}



export default Render;