import { default as React, Fragment, useState, useRef, useEffect } from 'react';
import { useAccount, useContractRead, useToken } from 'wagmi'
import { fetchToken, getContract, prepareWriteContract, readContract } from '@wagmi/core'
import { parseEther, parseUnits } from 'viem'
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import TokenBalance from 'components/render/tokenBalance';

import ERC20ABI from 'ABIS/ERC20.json';
import ERC1155ABI from 'ABIS/ERC1155.json';

import SendTransactionButton from 'components/internals/sendTransactionButton';
import ERC20ApprovalModal from 'components/internals/ERC20ApprovalModal';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const WriteContract = (props) => {
    const [value, setValue] = React.useState(props.valueAmount != null ? props.valueAmount : "0");

    const [isWantingApproval, setIsWantingApproval] = React.useState(null);

    let rawTransaction;

    const { address, isConnecting, isDisconnected } = useAccount()

    const args = props.args || [];
    const argsStateValues = [];
    const argsStateSetters = [];
    const argsStateTokens = [];
    const argsStateTokensIgnoreDecimals = [];
    const argsStateERC1155 = [];
    const argsStateApprovals = [];
    const argsStateERC1155Approvals = [];



    const [preparedTransaction, setPreparedTransaction] = useState(null);

    const [approvalId, setApprovalId] = useState(0);

    // This will run only once
    useEffect(() => {
        getPreparedTransaction();
    }, []);

    function getFunction() {
        if (props.functionName == null) {
            return props.abi[0];
        }
        return props.abi.find((element) => element.name === props.functionName && element.type === "function");
    }

    function checkApproval1155(token, spender) {
        return new Promise((resolve, reject) => {
            const contract = getContract({
                address: token,
                abi: ERC1155ABI
            })
            contract.read.isApprovedForAll([address, spender]).then((allowed) => {
                resolve(allowed);
            });
        });
    }

    // check if the ERC20 token is approved to be spent
    function checkApproval(token, spender, amount) {
        return new Promise((resolve, reject) => {
            const contract = getContract({
                address: token,
                abi: ERC20ABI
            })
            contract.read.allowance([address, spender]).then((allowance) => {
                console.log("allowance", allowance, amount)
                resolve(allowance >= amount);
            });
        });
    }

    async function onBeforeSendTransaction() {
        console.log("beforeClick", argsStateApprovals);
        if (props.onBeforeSendTransaction != null) {
            try {
                await props.onBeforeSendTransaction()
            } catch (error) {
                console.error("Error in onBeforeSendTransaction", error)
            }
        }
        for (const [index, arg] of argsStateApprovals.entries()) {
            if (arg != null) {
                console.log("Checking approval", arg, argsStateValues[index])
                const approved = await checkApproval(argsStateTokens[index].address, argsStateApprovals[index], parseUnits(argsStateValues[index] + "", argsStateTokens[index].decimals));
                if (!approved) {
                    setIsWantingApproval({
                        token: argsStateTokens[index],
                        amount: argsStateValues[index],
                        spender: argsStateApprovals[index],
                        type: "ERC20"
                    })
                    setApprovalId(approvalId + 1);
                    return false;
                }
            }
        }
        if (props.ERC20Approvals != null) {
            let approval = props.ERC20Approvals;
            const approved = await checkApproval(approval.token, approval.spender, approval.amount != null ? approval.amount + "" : "1");
            if (!approved) {
                const token = await fetchToken({
                    address: approval.token,
                })
                setIsWantingApproval({
                    token: token,
                    spender: approval.spender,
                    amount: approval.amount,
                    type: "ERC20"
                })
                console.log("approvalId", approvalId);
                console.log(isWantingApproval)
                setApprovalId(approvalId + 1);
                return false;
            }
        }

        for (const [index, arg] of argsStateERC1155Approvals.entries()) {
            if (arg != null) {
                console.log("Checking approval", arg, argsStateValues[index])
                const approved = await checkApproval1155(argsStateTokens[index].address, argsStateERC1155Approvals[index]);
                if (!approved) {
                    setIsWantingApproval({
                        token: argsStateTokens[index],
                        spender: argsStateERC1155Approvals[index],
                        type: "ERC1155"
                    })
                    setApprovalId(approvalId + 1);
                    return false;
                }
            }
        }

        await getPreparedTransaction(true);
        return true
    }

    async function onTransactionMined(minedTx) {
        if (props.onTransactionMined != null) {
            try {
                await props.onTransactionMined(minedTx, rawTransaction)
            } catch (error) {
                console.error("Error in onTransactionMined", error)
            }
        }
    }

    async function getPreparedTransaction(throwError = false) {
        let tx = null;
        try {
            let args = [];
            let abiInputs = getFunction().inputs;
            for (const [index, arg] of argsStateValues.entries()) {
                if (argsStateTokens[index] != null) {
                    let nb = parseFloat(arg);
                    if (isNaN(nb)) {
                        nb = 0;
                    }
                    if (argsStateTokensIgnoreDecimals[index]) {
                        args.push(arg);
                    } else {
                        // this is a token so we need the decimals
                        args.push(parseUnits(arg, argsStateTokens[index].decimals));
                    }
                } else if (abiInputs[index].hidden) {
                    // When the input is hidden we can fetch the value from the props as the value could be a reactive variable
                    let val = props.args[index];
                    let nb = parseFloat(val);
                    if (val + "" === "true" || val + "" === "false") {
                        args.push(val);
                    }
                    else if (isNaN(nb)) {
                        args.push(props.args[index] + "");
                    } else {
                        args.push(props.args[index]);
                    }
                } else {
                    args.push(arg);
                }
            }
            rawTransaction = ({ address: props.address, abi: props.abi, functionName: getFunction().name, args: args, value: parseEther(value + "") })
            if (throwError) {
                console.log("Preparing transaction: ", rawTransaction);
            }
            tx = await prepareWriteContract(rawTransaction);
        } catch (e) {
            if (throwError) {
                throw e;
            }
        }
        setPreparedTransaction(tx);
        return preparedTransaction;
    }

    for (const [index, input] of getFunction().inputs.entries()) {
        const [value, setter] = React.useState(args[index]);
        argsStateValues.push(value);
        argsStateSetters.push(setter);
    }

    async function load() {
        for (const [index, input] of getFunction().inputs.entries()) {
            if (input.type === "uint256" && input.token != null) {
                if (input.tokenID != null) { // this is ERC1155
                    let { data, isError, isLoading } = useContractRead({
                        address: input.token,
                        abi: ERC1155ABI,
                        functionName: "symbol",
                    });
                    argsStateTokens.push({
                        address: input.token,
                        symbol: data,
                        decimals: 0,
                    });
                    argsStateERC1155.push(input.tokenID);
                    argsStateTokensIgnoreDecimals.push(false);
                } else { // this is ERC20
                    const { data, isError, isLoading } = useToken({
                        address: input.token,
                    })
                    argsStateTokens.push(data);
                    argsStateTokensIgnoreDecimals.push(input.tokenIgnoreDecimals != null && input.tokenIgnoreDecimals != false);
                    argsStateERC1155.push(null);
                }
            } else {
                argsStateTokens.push(null);
                argsStateERC1155.push(null);
                argsStateTokensIgnoreDecimals.push(null);
            }
            if (input.type === "uint256" && input.ERC20Allow != null) {
                argsStateApprovals.push(input.ERC20Allow);
            } else {
                argsStateApprovals.push(null);
            }
            if (input.type === "uint256" && input.ERC1155Allow != null) {
                argsStateERC1155Approvals.push(input.ERC1155Allow);
            } else {
                argsStateERC1155Approvals.push(null);
            }
        }
    }


    load();

    function makeApprovals() {
        if (isWantingApproval != null) {
            return (<ERC20ApprovalModal approvalId={approvalId} approval={isWantingApproval} token={isWantingApproval.token} spender={isWantingApproval.spender} amount={isWantingApproval.amount} type={isWantingApproval.type} onTransactionMined={getPreparedTransaction} />);
        }
    }

    function makePayable() {
        if ((getFunction().payable || getFunction().stateMutability == "payable") && !getFunction().hideValue) {
            return (
                <div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">{props.valueFieldName != null ? props.valueFieldName : "Value"}</span>
                        </label>
                        <input type="number" className="input input-bordered w-full " value={value}
                            onChange={e => setValue(e.target.value)} />
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
                                        <span className="label-text"> {input.name}</span>
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
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">{input.name}</span>
                                        <input type="checkbox" className="checkbox" checked={argsStateValues[index] ? "checked" : ""}
                                            onChange={e => argsStateSetters[index](e.target.checked)} />
                                    </label>
                                </div>
                            )
                        } else if (input.date === true) {
                            return (
                                <div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">{input.name}</span>
                                        </label>
                                        <DateTimePicker className="input input-bordered" onChange={function (d) {
                                            argsStateSetters[index](d.getTime() / 1000)
                                        }} value={new Date(parseInt(argsStateValues[index]) * 1000)} disableClock={true} />
                                    </div>
                                </div>
                            )
                        } else if (input.type === "uint256" && input.token != null && input.tokenID == null) {
                            return (
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">{input.name}</span>
                                        {(typeof address !== 'undefined' && argsStateTokens[index] != null) && <span className="label-text-alt ">your balance: <span className='underline cursor-pointer'><TokenBalance componentClicked={balance => console.log("CLICKKKED") || argsStateSetters[index](balance.formatted)} address={address} token={argsStateTokens[index].address} /></span>  </span>}
                                    </label>
                                    <div className='join'>
                                        <input type="text"
                                            value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)}
                                            name="token_amount"
                                            id="token_amount"
                                            className="input input-bordered w-full join-item" placeholder="0.00"></input>
                                        <button className="btn btn-disabled join-item rounded-r-full">{(argsStateTokens[index] != null ? argsStateTokens[index].symbol : '')}</button>
                                    </div>
                                </div>
                            )
                        } else if (input.type === "uint256" && input.token != null && input.tokenID != null) {
                            return (
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">{input.name}</span>
                                        {(typeof address !== 'undefined' && argsStateTokens[index] != null) && <span className="label-text-alt ">your balance: <span className='underline cursor-pointer'><TokenBalance componentClicked={balance => console.log("CLICKKKED") || argsStateSetters[index](balance.formatted)} address={address} token={argsStateTokens[index].address} tokenID={argsStateERC1155[index]} /></span>  </span>}
                                    </label>
                                    <div className='join'>
                                        <input type="text"
                                            value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)}
                                            name="token_amount"
                                            id="token_amount"
                                            className="input input-bordered w-full join-item" placeholder="0.00"></input>
                                        <button className="btn btn-disabled join-item rounded-r-full">{(argsStateTokens[index] != null ? argsStateTokens[index].symbol : '')}</button>
                                    </div>
                                </div>
                            )
                        } else if (input.longText == true) {
                            return (
                                <div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">{input.name}</span>
                                        </label>
                                        <textarea className="textarea textarea-bordered h-24 w-full" value={argsStateValues[index]}
                                            onChange={e => argsStateSetters[index](e.target.value)}></textarea>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text">{input.name}</span>
                                        </label>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-full " value={argsStateValues[index]}
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
            {makeApprovals()}
            <div className="mt-2">
                <SendTransactionButton onTransactionMined={onTransactionMined} onBeforeSendTransaction={onBeforeSendTransaction} text={props.buttonText != null ? props.buttonText : getFunction().name} transactionDescription={getFunction().name} preparedTransaction={getPreparedTransaction} />
            </div>
        </span >
    );
}

export default WriteContract;
