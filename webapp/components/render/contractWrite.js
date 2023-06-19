import { default as React, Fragment, useState, useRef, useEffect } from 'react';
import { usePrepareContractWrite } from 'wagmi'
import { useToken } from 'wagmi'
import { parseEther, parseUnits } from 'viem'
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
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span class="label-text"> {input.name}</span>
                                    </label>
                                    <select
                                        id="select"
                                        name="select"
                                        className="select select-bordered"
                                        value={argsStateValues[index]}
                                        onChange={e => argsStateSetters[index](e.target.value)}
                                    >
                                        {Object.entries(input.selectChoices).map(([name, value]) => {
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
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <span class="label-text">{input.name}</span>
                                        <input type="checkbox" class="checkbox" checked={argsStateValues[index] ? "checked" : ""}
                                            onChange={e => argsStateSetters[index](e.target.checked)} />
                                    </label>
                                </div>

                            )
                        } else if (input.type === "uint256" && input.token != null) {
                            return (
                                <div class="form-control w-full ">
                                    <label class="label">
                                        <span class="label-text">  {input.name}</span>
                                        <span class="label-text-alt">{(argsStateTokens[index] != null ? argsStateTokens[index].symbol : '')}</span>
                                    </label>             
                                        <input type="text"
                                            value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)}
                                            name="token_amount"
                                            id="token_amount"
                                            class="input input-bordered w-full" placeholder="0.00"></input>
    
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <div class="form-control w-full ">
                                        <label class="label">
                                            <span class="label-text">  {input.name}</span>
                                        </label>
                                        <input type="text" placeholder="Type here" class="input input-bordered w-full " value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)} />

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
            <div class="mt-2">
                <SendTransactionButton text={props.buttonText != null ? props.buttonText : props.functionName} transactionDescription={props.functionName} preparedTransaction={getPreparedTransaction()} />
            </div>
        </span >
    );
}

export default WriteContract;