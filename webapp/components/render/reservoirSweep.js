import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

import { default as React, useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const ReservoirSweep = (props) => {

    const { address, isConnecting, isDisconnected } = useAccount()

    // This will run only once
    useEffect(() => {


    }, []);

    const collectionId = props.collectionAddress

    if (isDisconnected) {
        return (
            <div className="reservoir">
                <ConnectButton label={props.buttonText} />
            </div>
        );
    }
    return (
        <div className="reservoir">
            <SweepModal
                trigger={
                    <button class="btn btn-primary">
                        {props.buttonText}
                    </button>
                }
                collectionId={collectionId}
                onSweepComplete={(data) => {
                    console.log('Sweep Complete', data)
                }}
                onSweepError={(error, data) => {
                    console.log('Sweep Error', error, data)
                }}
                onClose={() => {
                    console.log('SweepModal Closed')
                }}
            />
        </div>
    );
}

export default ReservoirSweep;