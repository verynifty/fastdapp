import { default as React, useState, useRef, useEffect } from 'react';

import { getConfig } from '@wagmi/core';


const Events = (props) => {

    const [logs, setLogs] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    function getABI() {
        return props.abi.find((element) => element.name === props.eventName && element.type === "event");
    }

    async function getLogs() {
        try {
            console.log(getConfig())
            let client = getConfig().publicClient;
            let logs = await client.getLogs({
                address: props.address,
                fromBlock: props.fromBlock != null ? BigInt(props.fromBlock) : BigInt(0),
                toBlock: props.toBlock != null && props.toBlock != "latest" ? BigInt(props.toBlock) : "latest",
                event: getABI(),
                args: props.args
            });
            setLogs(logs);
            setIsLoaded(true);
            console.log("Events logs:", logs)
        } catch (error) {
            console.log("Events error", error);
        }
    }

    // This will run only once
    useEffect(() => {
        getLogs();
    }, []);

    if (!isLoaded) {
        return (<center><span class="loading loading-spinner loading-md"></span></center>)
    }
    return (
            props.render(logs)
    );
}

export default Events;