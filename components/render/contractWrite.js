import { default as React, useState, useRef, useEffect } from 'react';
import { usePrepareContractWrite } from 'wagmi'

import SendTransactionButton from 'components/internals/sendTransactionButton';

const WriteContract = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const args = props.args || [];

    console.log("ABI", props.abi)

    console.log(props);
    // This will run only once
    useEffect(() => {

    }, []);

    function getFunction() {
        return props.abi.find((element) => element.name === props.functionName);
    }

    function makeForm() {
        return (
            <div>
                {getFunction().inputs.map((input) => {
                    return (
                        <div>
                            <label htmlFor={input.name} className="block text-sm font-medium leading-6 text-gray-900">
                                {input.name}
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name={input.name}
                                    id={input.name}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <span>
            {makeForm()}
            <SendTransactionButton text={props.text != null ? props.text : props.functionName} transactionDescription={props.functionName} transaction={usePrepareContractWrite({ address: props.address, abi: props.abi, functionName: props.functionName, args: args }).config} />
        </span >
    );
}

export default WriteContract;