import { default as React, useState, useRef, useEffect } from 'react';
import { fetchBalance } from '@wagmi/core'


const TokenBalance = (props) => {
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
        async function getBalance() {
            try {
                const balance = await fetchBalance({
                    address: props.address,
                    token: props.token,
                })
                setRaw(balance);
                setBalance(balance.value);
                if (parseFloat(balance.formatted) > 1) {
                    setFormatted(parseInt(parseFloat(balance.formatted) * 1000)/ 1000);
                } else {
                    setFormatted(balance.formatted);
                }
                setSymbol(balance.symbol);
            } catch (error) {
                console.log("TokenBalance Error", error)
                setFormatted("Error: token doesn't exist or is in a different network?");
            }
            setIsLoaded(true);
        }
        getBalance();
    }, [props.token, props.address]);

    if (!isLoaded) {
        return (<center><span class="loading loading-spinner loading-md"></span></center>)
    }
    return (
        <span onClick={handleClick}>
            {formatted} {symbol}
        </span >
    );
}

export default TokenBalance;