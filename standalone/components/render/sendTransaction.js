import { default as React, useState, useRef, useEffect } from 'react';
import { usePrepareSendTransaction, sendTransaction, waitForTransaction } from 'wagmi'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import SendTransactionButton from 'components/internals/sendTransactionButton';
import Test from 'components/internals/test';
import { parseEther } from 'viem'

const SendTransaction = (props) => {
    const addRecentTransaction = useAddRecentTransaction();


    const [to, setTo] = React.useState(props.to);
    const [amount, setAmount] = React.useState("0");

    // This will run only once
    useEffect(() => {
        setTo(props.to);
        setAmount("0");
    }, []);

    function prepareTransaction() {
        
    }

    function showRecipient() {
        if (!props.hideRecipient) {
            return (
                <div className="">
                    <label for="first-name" className="">Recipient</label>
                    <div className="mt-2">
                        <input type="text" value={to} onChange={e => setTo(e.target.value)} className="input input-bordered w-full" />
                    </div>
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            <div className="">
                <div className="">
                    <label for="last-name" className="">Amount</label>
                    <div className="mt-2">
                        <input type="number" value={amount} onChange={e => setAmount((e.target.value + ""))} className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="mt-2">
                    <SendTransactionButton transactionDescription={'Send ' + amount + ' to ' + to} preparedTransaction={usePrepareSendTransaction({ to: to, value: parseEther(amount) })} text={props.buttonText != null ? props.buttonText : "Send"} />
                </div>
            </div >
        </React.Fragment>
    );
}

export default SendTransaction;