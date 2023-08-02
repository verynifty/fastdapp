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
        <CollectModal
            mode="preferMint"
            trigger={
                <button class="btn btn-primary">
                    {props.buttonText}
                </button>
            }
            collectionId={props.collectionAddress}
            onCollectComplete={(data) => {
                console.log('Collect Complete', data)
            }}
            onCollectError={(error, data) => {
                console.log('Collect Error', error, data)
            }}
            onClose={(data, currentStep) => {
                console.log('CollectModal Closed')
            }}
        />);
}

export default ReservoirSweep;