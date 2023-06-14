import { default as React, useState, useRef, useEffect } from 'react';
import { readContract } from '@wagmi/core'


const ContractRead = (props) => {
    const [value, setValue] = React.useState();
    const [error, setError] = React.useState();


    function setValue(value) {

    }

    // This will run only once
    useEffect(() => {
        async function read() {
            try {
                console.log({
                    address: props.address,
                    abi: props.abi,
                    functionName: props.functionName,
                })
                const res = await readContract({
                    address: props.address,
                    abi: props.abi,
                    functionName: props.functionName,
                    args: props.args,
                })
                if (typeof props.returnValue === 'function') {
                    setValue(props.returnValue(res) + "");
                }
                else if (Array.isArray(res)) {
                    let index = props.returnValue == null ? 0 : parseInt(props.returnValue);
                    setValue(res[index]);

                } else {
                    console.log("SETVALUE", res)
                    setValue(res + "");
                }
            } catch (error) {
                console.log(error)
                setError("Error: Contract doesn't exsit or is in a different network?");
            }

        }
        read();
    }, []);

    return (
        <span>
            {value} {error}
        </span >
    );
}

export default ContractRead;