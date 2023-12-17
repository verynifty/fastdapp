import { default as React, useState, useRef, useEffect } from 'react';
import { fetchBalance, readContract } from '@wagmi/core'
import ERC1155ABI from 'ABIS/ERC1155.json';

const TokenBalance = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [raw, setRaw] = React.useState(null);

    function handleClick() {
        if (props.componentClicked != null) {
            props.componentClicked(raw);
        }
    }

    // This will run only once
    useEffect(() => {
        async function getBalance() {
            if (props.address == null) {
                setFormatted("Not connected");
                setIsLoaded(true);
                return;
            }
            if (props.tokenID == null) { // this is erc20
                try {
                    const balance = await fetchBalance({
                        address: props.address,
                        token: props.token,
                    })
                    setRaw(balance);
                    setBalance(balance.value);
                    if (parseFloat(balance.formatted) > 1) {
                        setFormatted(parseInt(parseFloat(balance.formatted) * 1000) / 1000);
                    } else {
                        setFormatted(balance.formatted);
                    }
                    setSymbol(balance.symbol);
                } catch (error) {
                    console.error("TokenBalance Error", error)
                    setFormatted("Error: token doesn't exist or is in a different network?");
                }
                setIsLoaded(true);
            } else { // this is ERC1155
                try {
                    const balance = await readContract({
                        address: props.token,
                        abi: ERC1155ABI,
                        functionName: "balanceOf",
                        args: [props.address, props.tokenID]
                    });
                    setRaw(balance.toString());
                    setBalance(balance.toString());
                    setFormatted(balance.toString());
                    let symbol = await readContract({
                        address: props.token,
                        abi: ERC1155ABI,
                        functionName: "symbol",
                    });
                    setSymbol(symbol);
                    setIsLoaded(true);
                } catch (error) {
                    console.error("TokenBalance Error", error)
                    setFormatted("Error: token doesn't exist or is in a different network?");
                }
                setIsLoaded(true);

            }
        }
        getBalance();
    }, [props.token, props.address]);

    if (!isLoaded) {
        return (<span class="loading loading-spinner loading-md"></span>)
    }
    return (
        <span onClick={handleClick}>
            {formatted} {symbol}
        </span >
    );
}

export default TokenBalance;