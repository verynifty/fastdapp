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
        <div className="modal modal-open	">
            <div className="modal-box">
                <h3 className="text-lg font-bold">Hello!</h3>
                <p className="py-4">This modal works with a hidden checkbox!</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
    );
}

export default ERC20ApprovalModal;