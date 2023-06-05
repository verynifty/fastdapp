import { default as React, useState, useRef, useEffect } from 'react';
import { prepareWriteContract } from '@wagmi/core'

const WriteContract = (props) => {
    const [balance, setBalance] = React.useState(0);
    const [formatted, setFormatted] = React.useState("");
    const [symbol, setSymbol] = React.useState("");

    // This will run only once
    useEffect(() => {
       
    }, []);


    return (
        <span>
            Write
        </span >
    );
}

export default WriteContract;