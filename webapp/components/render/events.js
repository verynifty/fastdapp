import { default as React, useState, useRef, useEffect } from 'react';

import { getConfig } from '@wagmi/core';


const Events = (props) => {

    const [logs, setLogs] = React.useState([]);

    function getABI() {
        return props.abi.find((element) => element.name === props.eventName && element.type === "event");
    }

    async function getLogs() {
        let logs = await getConfig().publicClients.get(1).getLogs({
            address: props.address,
            fromBlock: BigInt(0),
            toBlock: 'latest',
            event: getABI(),
            args: {
                nounId: 353n,
            }
        });
        setLogs(logs);
        console.log(logs)
    }

    // This will run only once
    useEffect(() => {
        console.log(getConfig())
        getLogs();
    }, []);

    return (
        <div>
            {props.render(logs)}
        </div >
    );
}

export default Events;