import { default as React, useState, useRef, useEffect } from 'react';
import { usePrepareContractWrite } from 'wagmi'

import SendTransactionButton from 'components/internals/sendTransactionButton';

const TokenApproval = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const args = [];

    console.log(props);
    // This will run only once
    useEffect(() => {
       
    }, []);


    return (
        <span>
            <SendTransactionButton text={props.text != null ? props.text : props.functionName} transactionDescription={props.functionName} transaction={usePrepareContractWrite({ address: props.address, abi: props.abi, functionName: props.functionName, args: args }).config} />
        </span >
    );
}

export default TokenApproval;