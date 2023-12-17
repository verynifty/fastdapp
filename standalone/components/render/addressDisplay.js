import { default as React, useState, useRef, useEffect } from 'react';
import { fetchEnsName } from '@wagmi/core'

const AddressDisplay = (props) => {
    const [ENS, setENS] = React.useState(null);

    function formatAddress(address) {
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
    }

    async function getInfo() {
        try {
            const ensName = await fetchEnsName({
                address: props.address,
            })
            setENS(ensName);
        } catch (error) {
            //setENS("Error: Incorrect address?");
        }

    }
    // This will run only once
    useEffect(() => {
        getInfo();
    }, [props.address]);

    return (
        <span>
            <a href={"https://etherscan.io/address/" + props.address}>{ENS != null ? ENS : formatAddress(props.address)}</a>
        </span >
    );
}

export default AddressDisplay;