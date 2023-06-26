import { default as React, useState, useRef, useEffect } from 'react';
import { sendTransaction, writeContract, waitForTransaction } from '@wagmi/core'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import toast from 'react-hot-toast';

const SendTransactionButton = (props) => {

    const addRecentTransaction = useAddRecentTransaction();

    const [isLoading, setIsLoading] = React.useState(false);
    const [pendingTransaction, setPendingTransaction] = React.useState(null);

    const text = props.text != null ? props.text : "Send";

    const saEvent = (eventName, params = {}) => {
        if (window && window.sa_event) return window.sa_event(eventName, params);
    };

    // This will run only once
    useEffect(() => {

    }, []);

    const onClickSend = async () => {
        let transactionRequest = props.preparedTransaction;
        console.log("TRANSACTION REQUEST", transactionRequest)
        if (transactionRequest != null && transactionRequest.isError) {
            if (transactionRequest.error.shortMessage != null) {
                toast.error(transactionRequest.error.shortMessage);
            }
        }
        try {
            setIsLoading(true);
            let tx = null;
            if (transactionRequest.config.request.abi != null) {
                // THis is a contract write
                tx = await writeContract(
                    transactionRequest.config.request
                );
            } else {
                // This is a simple value send
                tx = await sendTransaction(
                    transactionRequest.config
                );
            }
            saEvent('transaction_sent', {
                tx_hahs: tx.hash,
            })
            setPendingTransaction(tx.hash);
            addRecentTransaction({
                hash: tx.hash,
                description: props.transactionDescription != null ? props.transactionDescription : tx.hash,
            });
            toast.promise(
                waitForTransaction({
                    hash: tx.hash,
                }),
                {
                    loading: 'Waiting for confirmation ⛓',
                    success: <b>Transaction mined</b>,
                    error: <b>An error occured</b>,
                }
            );
            const data = await waitForTransaction({
                hash: tx.hash,
            })
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const button = () => {
        if (!isLoading) {
            return (
                <button onClick={onClickSend} className="btn">
                    {text}
                </button>
            )
        } else {
            return (

                <button disabled="disabled" className="btn">
                    <span class="loading loading-spinner loading-md"></span>
                </button>
            )
        }
    }


    return (
        <React.Fragment>
            <div>
                {button()}
            </div>
        </React.Fragment>
    );
}

export default SendTransactionButton;