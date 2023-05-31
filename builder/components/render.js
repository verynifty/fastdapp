'use client';

import MDX from '@mdx-js/runtime';

import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef } from 'react';


import BN from 'components/bn';
import Balance from 'components/balance';
import SendTransaction from 'components/sendTransactionTwo';

let value = "// some comment";
const components = { "BN": BN, "Balance": Balance, "SendTransaction": SendTransaction }

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