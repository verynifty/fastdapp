import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { default as React, useState, useRef, useEffect } from 'react';
import { fetchToken } from '@wagmi/core'
import CoingeckoTokenList from 'public/coingecko_public_list.json'
 

const Uniswap = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [tokenList, setTokenList] = React.useState(CoingeckoTokenList);

  // This will run only once
  useEffect(() => {

    async function loadToken() {
      if (props.defaultOutputTokenAddress != null) {
        const token = await fetchToken({
          address: props.defaultOutputTokenAddress,
        })
        token.chainId = 1;
        delete token.totalSupply
        console.log("UNISWAP GOT TOKEN", token)
        setTokenList([token]);
      }
      setIsLoading(false);
    }

    loadToken();

  }, []);

  const UNISWAP_TOKEN_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
  const NATIVE = 'NATIVE' // Special address for native token
  const defaultOutputTokenAddress = props.defaultOutputTokenAddress;
  const defaultInputAmount = 1;

  if (isLoading) {
  }
  else {
    return (
      <div className="Uniswap">
        <SwapWidget
          width="100%"
          tokenList={tokenList}
          defaultInputTokenAddress={NATIVE}
          defaultInputAmount={defaultInputAmount}
          defaultOutputTokenAddress={defaultOutputTokenAddress} />
      </div>
    );
  }
  
}

export default Uniswap;