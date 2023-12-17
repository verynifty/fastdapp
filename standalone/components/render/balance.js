import { default as React, useState, useRef, useEffect } from 'react';
import { fetchBalance } from '@wagmi/core'


const Balance = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");

    // This will run only once
    useEffect(() => {
        async function getBalance() {
            if (props.address == null) {
                setFormatted("Not connected");
                setIsLoaded(true);
                return;
            }
            try {
                const balance = await fetchBalance({
                    address: props.address,
                })
                setBalance(balance.value);
                setFormatted(balance.formatted);
                setSymbol(balance.symbol);
            } catch (error) {
                console.log("Balance Error", error)
                setFormatted("Error: Incorrect address?");
            }
        }
        getBalance();
    }, [props.address]);


    return (
        <span>
            {formatted} {symbol}
        </span >
    );
}

export default Balance;