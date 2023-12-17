import { default as React, useState, useRef, useEffect } from 'react';
import { fetchToken } from '@wagmi/core'
import { formatUnits } from 'viem'

const TokenName = (props) => {
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
                setFormatted(token.name);
            } catch (error) {
                console.error("TokenBalance Error", error)
                setFormatted("Error: token doesn't exist or is in a different network?");
            }
            setIsLoaded(true);
        }
        getToken();
    }, [props.token]);

    if (!isLoaded) {
        return (<span class="loading loading-spinner loading-md"></span>)
    }
    return (
        <span onClick={handleClick}>
            {formatted} 
        </span >
    );
}

export default TokenName;