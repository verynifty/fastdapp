import { default as React, useState, useRef, useEffect } from 'react';
import { sendTransaction, writeContract, waitForTransaction } from '@wagmi/core'
import { useAddRecentTransaction, ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { useNetwork } from 'wagmi'

import toast from 'react-hot-toast';

const SendTransactionButton = (props) => {

    const { chain } = useNetwork()

    const addRecentTransaction = useAddRecentTransaction();

    const [isLoading, setIsLoading] = React.useState(false);
    const { address, isConnecting, isDisconnected } = useAccount()

    const [pendingTransaction, setPendingTransaction] = React.useState(null);

    const text = props.text != null ? props.text : "Send";

    const saEvent = (eventName, params = {}) => {
        console.log("SENDING EVENT", window && window.sa_event, eventName, params)
        if (window && window.sa_event) return window.sa_event(eventName, params);
    };

    // This will run only once
    useEffect(() => {

    }, []);

    const onClickSend = async () => {
        setIsLoading(true);
        try {

            if (props.onBeforeSendTransaction != null) {
                let onBefore = await props.onBeforeSendTransaction();
                if (!onBefore) {
                    setIsLoading(false);
                    return;
                }
            }
        } catch (error) {
            toast.error(error.shortMessage);
        }

        let transactionRequest = props.preparedTransaction;
        // check if transactionRequest is a function

        if (typeof transactionRequest === 'function') {
            transactionRequest = await transactionRequest();
        }

        if (transactionRequest != null && transactionRequest.isError) {
            setIsLoading(false);
            if (transactionRequest.error.shortMessage != null) {
                toast.error(transactionRequest.error.shortMessage);
            }
        }
        try {
            let tx = null;
            let functionName = "";
            let from = "";
            let to = "";
            console.log(transactionRequest)
            if (transactionRequest.config != null && transactionRequest.config.request != null && transactionRequest.config.request.abi != null) {
                // THis is a contract write
                tx = await writeContract(
                    transactionRequest.config.request
                );
                functionName = transactionRequest.data.request.functionName;
                from = transactionRequest.data.request.account.address;
                to = transactionRequest.data.request.address;
            } else if (transactionRequest.config == null && transactionRequest.request != null) {
                console.log("We write the contract")
                tx = await writeContract(
                    transactionRequest.request
                );
                functionName = transactionRequest.request.functionName;
                from = transactionRequest.request.account.address;
                to = transactionRequest.request.address;
            } else {
                // This is a simple value send
                tx = await sendTransaction(
                    transactionRequest.config
                );
            }
            console.log(tx)
            saEvent('transaction_sent', {
                tx_hahs: tx.hash,
                functionName: functionName,
                from: from,
                to: to,
                chain: chain.id,
                sent_at: new Date()
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
            if (props.onTransactionMined != null) {
                await props.onTransactionMined(data);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    const button = () => {
        if (isDisconnected) {
            return (<ConnectButton />)
        }
        else if (!isLoading) {
            return (
                <button onClick={onClickSend} className="btn">
                    {text}
                </button>
            )
        } else {
            return (
                <button disabled="disabled" className="btn">
                    <span className="loading loading-spinner loading-md"></span>
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