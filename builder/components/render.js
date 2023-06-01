'use client';

import MDX from '@mdx-js/runtime';

import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef } from 'react';


import BlockNumber from 'components/blockNumber';
import Balance from 'components/balance';
import SendTransaction from 'components/sendTransaction';

let value = "// some comment";
const components = { "BlockNumber": BlockNumber, "Balance": Balance, "SendTransaction": SendTransaction }

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