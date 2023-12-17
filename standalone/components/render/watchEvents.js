import { default as React, useState, useRef, useEffect } from 'react';

import { watchContractEvent } from '@wagmi/core'

const WatchEvents = (props) => {

    let watcher = null;

    function getABI() {
        return props.abi.find((element) => element.name === props.eventName && element.type === "event");
    }


    async function setup() {
        try {
            if (watcher != null) {
                console.log("WATCHER rmv", watcher)
                watcher();
            }

            watcher = watchContractEvent({
                address: props.address,
                abi: props.abi,
                eventName: props.eventName,
                args: props.args,
            }, function (logs) {
                try {
                    props.onReceivedLogs(logs)
                } catch (error) {
                    console.error("ERROR in onReceivedLogs", error)
                }
            });
            console.log("WATCHER add", watcher)

            console.log("Listener set for event watch");

        } catch (error) {
            console.log("Events error", error);
        }
    }
    // This will run only once
    useEffect(() => {
        setup();
        return () => {
            console.log('WATCHER unmounted, ', watcher);
            if (watcher != null) {
                console.log("WATCHER rmv")
                watcher();
            }
        };
    }, [props.address, props.abi, props.eventName, props.onReceivedLogs]);

    return (
        <div>
        </div >
    );
}

export default WatchEvents;
