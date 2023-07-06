import { default as React, useState, useRef, useEffect } from 'react';
import { fetchEnsName } from '@wagmi/core'

const ERC20ApprovalModal = (props) => {
    const [ENS, setENS] = React.useState(null);


    async function getInfo() {


    }

    // This will run only once
    useEffect(() => {
        getInfo();



    }, [props.token, props.address]);

    return (
        <span>
           APPROVAL
        </span >
    );
}

export default ERC20ApprovalModal;