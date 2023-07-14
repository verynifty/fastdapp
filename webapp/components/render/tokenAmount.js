import { default as React, useState, useRef, useEffect } from 'react';
import { fetchToken } from '@wagmi/core'
import { formatUnits } from 'viem'

const TokenAmount = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [raw, setRaw] = React.useState(null);

    function handleClick() {
        console.log("Clicked")
        if (props.componentClicked != null) {
            props.componentClicked(raw);
        }
    }

    // This will run only once
    useEffect(() => {
        console.log("useEffect TOKENBALANCE")
        async function getToken() {
            try {
                const token = await fetchToken({
                    address: props.token,
                })
                setRaw(token);
                if (parseInt(props.amount) > 105792089237316195423570985008687907853269984665640564039457584007913129639935) {
                    setFormatted("∞");
                } else {
                    setFormatted(formatUnits(props.amount, token.decimals));
                }
                setSymbol(token.symbol);
            } catch (error) {
                console.error("TokenBalance Error", error)
                setFormatted("Error: token doesn't exist or is in a different network?");
            }
            setIsLoaded(true);
        }
        getToken();
    }, [props.token, props.amount]);

    if (!isLoaded) {
        return (<span class="loading loading-spinner loading-md"></span>)
    }
    return (
        <span onClick={handleClick}>
            {formatted} {symbol}
        </span >
    );
}

export default TokenAmount;