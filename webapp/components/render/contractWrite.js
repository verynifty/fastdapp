import { default as React, Fragment, useState, useRef, useEffect } from 'react';
import { usePrepareContractWrite } from 'wagmi'
import { useToken } from 'wagmi'
import { parseEther, parseUnits } from 'viem'

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
    const argsStateTokens = [];

    function getFunction() {
        return props.abi.find((element) => element.name === props.functionName && element.type === "function");
    }

    function getPreparedTransaction() {
        let tx = null;
        try {
            let args = [];
            for (const [index, arg] of argsStateValues.entries()) {
                if (argsStateTokens[index] != null) {
                    let nb = parseFloat(arg);
                    if (isNaN(nb)) {
                        nb = 0;
                    }
                    // this is a token so we need the decimals
                    args.push(parseUnits(nb + "", argsStateTokens[index].decimals));
                } else {
                    args.push(arg);
                }
            }

            console.log("prepare")
            tx = usePrepareContractWrite({ address: props.address, abi: props.abi, functionName: props.functionName, args: args, value: parseEther(value + "") });
            console.log("after prepare")
            if (tx.error) {
                console.log("There is an error")
            }
        } catch (e) {
            console.log("EROOOOOOR")
            console.log(e)
            console.log(JSON.stringify(e))
        }
        return tx;
    }

    for (const [index, input] of getFunction().inputs.entries()) {
        const [value, setter] = React.useState(args[index]);
        argsStateValues.push(value);
        argsStateSetters.push(setter);
        if (input.type === "uint256" && input.token != null) {
            const { data, isError, isLoading } = useToken({
                address: input.token,
            })
            argsStateTokens.push(data);
        } else {
            argsStateTokens.push(null);
        }
    }

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
                        if (input.selectChoices != null && typeof input.selectChoices == "object") {
                            // deal with selectChoices and render an HTML select
                            return (
                                <div>
                                    <label htmlFor="select" className="block text-sm font-medium leading-6 text-gray-900">
                                    {input.name}
                                    </label>
                                    <select
                                        id="select"
                                        name="select"
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={argsStateValues[index]}
                                        onChange={e => argsStateSetters[index](e.target.value)}
                                    >
                                        { Object.entries(input.selectChoices).map(([name, value]) => {
                                            return (
                                                <option value={value}>{name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )
                        }
                        else if (input.type === "bool") {
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
                        } else if (input.type === "uint256" && input.token != null) {
                            return (
                                <div>
                                    <label for="token_amount" class="block text-sm font-medium leading-6 text-gray-900">{input.name}</label>
                                    <div class="relative mt-2 rounded-md shadow-sm">
                                        <input type="text"
                                            value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)}
                                            name="token_amount"
                                            id="token_amount"
                                            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" aria-describedby="price-currency"></input>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span class="text-gray-500 sm:text-sm" id="price-currency">{(argsStateTokens[index] != null ? argsStateTokens[index].symbol : '')}</span>
                                        </div>
                                    </div>
                                </div>
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
                                            placeholder=""
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
            <SendTransactionButton text={props.buttonText != null ? props.buttonText : props.functionName} transactionDescription={props.functionName} preparedTransaction={getPreparedTransaction()} />
        </span >
    );
}

export default WriteContract;