import { default as React, useState, useRef, useEffect } from 'react';
import { fetchBalance } from '@wagmi/core'


const TokenBalance = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");

    // This will run only once
    useEffect(() => {
        async function getBalance() {
            try {
                const balance = await fetchBalance({
                    address: props.address,
                    token: props.token,
                })
                setBalance(balance.value);
                setFormatted(balance.formatted);
                setSymbol(balance.symbol);
            } catch (error) {
                setFormatted("Error: token doesn't exsit or is in a different network?");
            }
          
        }
        getBalance();
    }, []);


    return (
        <span>
            {formatted} {symbol}
        </span >
    );
}

export default TokenBalance;