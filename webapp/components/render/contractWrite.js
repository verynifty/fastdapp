import { default as React, useState, useRef, useEffect } from 'react';
import { usePrepareContractWrite } from 'wagmi'
import { parseEther } from 'viem'

import { Switch } from '@headlessui/react'


import SendTransactionButton from 'components/internals/sendTransactionButton';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const WriteContract = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [value, setValue] = React.useState(props.valueAmount != null ? props.valueAmount : "0");

    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const args = props.args || [];
    const argsStateValues = [];
    const argsStateSetters = [];

    function getFunction() {
        return props.abi.find((element) => element.name === props.functionName && element.type === "function");
    }

    for (const [index, input] of getFunction().inputs.entries()) {
        const [value, setter] = React.useState(args[index]);
        argsStateValues.push(value);
        argsStateSetters.push(setter);
    }

    console.log("ABI", props.abi)
    console.log("Args Values", argsStateValues)

    // This will run only once
    useEffect(() => {
        console.log("useEffect", props)

    }, []);



    function makePayable() {
        if (getFunction().payable) {
            return (
                <div>
                    <label htmlFor="payableValue" className="block text-sm font-medium leading-6 text-gray-900">
                        {props.valueFieldName != null ? props.valueFieldName : "Value"}
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            name={props.valueFieldName != null ? props.valueFieldName : "Value"}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={value}
                            id="payableValue"
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                </div>

            )
        }
    }

    function makeForm() {
        return (
            <div>
                {getFunction().inputs.map((input, index) => {
                    if (input.hidden == null || !input.hidden) {
                        if (input.type === "bool") {
                            return (
                                <Switch.Group as="div" className="flex items-center">
                                    <Switch.Label as="span" className="ml-3 text-sm">
                                        <span className="font-medium text-gray-900">{input.name}</span>{' '}
                                    </Switch.Label>
                                    <Switch
                                        checked={argsStateValues[index]}
                                        onChange={argsStateSetters[index]}
                                        className={classNames(
                                            argsStateValues[index] ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                argsStateValues[index] ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                            )}
                                        />
                                    </Switch>

                                </Switch.Group>
                            )
                        } else {
                            return (
                                <div>
                                    <label htmlFor={input.name} className="block text-sm font-medium leading-6 text-gray-900">
                                        {input.name}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name={input.name}
                                            id={input.name}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="you@example.com"
                                            value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    }
                })}
            </div>
        )
    }

    return (
        <span>
            {makeForm()}
            {makePayable()}
            <SendTransactionButton text={props.buttonText != null ? props.buttonText : props.functionName} transactionDescription={props.functionName} transaction={usePrepareContractWrite({ address: props.address, abi: props.abi, functionName: props.functionName, args: argsStateValues, value: parseEther(value + "") }).config} />
        </span >
    );
}

export default WriteContract;