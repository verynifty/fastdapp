import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { default as React, useState, useRef, useEffect } from 'react';


const Uniswap = (props) => {

    // This will run only once
    useEffect(() => {


    }, []);

    const UNISWAP_TOKEN_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
    const NATIVE = 'NATIVE' // Special address for native token
    const defaultOutputTokenAddress = props.defaultOutputTokenAddress;
    const defaultInputAmount = 1;

    return (
        <div className="Uniswap">
        <SwapWidget  
      defaultInputTokenAddress={NATIVE}
      defaultInputAmount={defaultInputAmount}
      defaultOutputTokenAddress={defaultOutputTokenAddress} />
      </div>
    );
}

export default Uniswap;