import { default as React, useState, useRef, useEffect } from 'react';
import ContractWrite from 'components/render/contractWrite';

const ERC20ApprovalModal = (props) => {
    const [isOpen, setIsOpen] = React.useState(true);

    function closeModal() {
        setIsOpen(false);
    }

    async function getInfo() {


    }

    // This will run only once
    useEffect(() => {
        console.log("Changes in approval value", props)
        setIsOpen(true);
        getInfo();
    }, [props.approvalId, props.token, props.address, props.isWantingApproval]);

    return (
        <dialog id="approval_modal" className={`modal ${isOpen ? "modal-open" : ""} `}>
            <form method="dialog" className="modal-box">
                <h3 className="text-lg font-bold">Approval required</h3>
                <p className="py-4">You need to approve your {props.token.symbol} to be spent by {props.spender}.</p>
                <ContractWrite address={props.token.address} abi={[
                     {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_spender",
                            "type": "address",
                            "hidden": true
                          },
                          {
                            "name": "Amount to approve:",
                            "type": "uint256",
                            "token": props.token.address,
                          }
                        ],
                        "name": "approve",
                        "outputs": [
                          {
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function",
                        "buttonText": "Approve"
                      }
                ]} functionName="approve" args={[props.spender, props.amount]} onTransactionMined={closeModal}  />
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>close</button>
            </form>
        </dialog>
    );
}

export default ERC20ApprovalModal;