import { CollectModal } from '@reservoir0x/reservoir-kit-ui'

import { useEffect } from 'react';
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
        <button class="btn btn-primary">
            {props.buttonText} (Currently not working)
        </button>
    );
}

export default ReservoirSweep;