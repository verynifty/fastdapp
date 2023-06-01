import { default as React, useState, useRef, useEffect } from 'react';
import { usePrepareSendTransaction, sendTransaction, waitForTransaction } from 'wagmi'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import SendTransactionButton from 'components/internals/sendTransactionButton';
import Test from 'components/internals/test';

const SendTransaction = (props) => {
    const addRecentTransaction = useAddRecentTransaction();


    const [to, setTo] = React.useState(props.to);
    const [amount, setAmount] = React.useState(0);

    // This will run only once
    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-12 md:col-span-2">
                <div class="sm:col-span-6">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Recipient</label>
                    <div class="mt-2">
                        <input type="text" value={to} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="sm:col-span-6">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                    <div class="mt-2">
                        <input type="number" value={amount} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="sm:col-span-12">
                    <SendTransactionButton transactionDescription={'Send ' + amount + ' to ' + to} transaction={usePrepareSendTransaction({to:to, value: amount}).config} />
                </div>
            </div >
        </React.Fragment>
    );
}

export default SendTransaction;