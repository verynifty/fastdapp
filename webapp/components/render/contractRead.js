import { default as React, useState, useRef, useEffect } from 'react';
import { readContract } from '@wagmi/core'


const ContractRead = (props) => {
    const [value, setValue] = React.useState();
    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState(false);

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
                console.log(res)
                if (typeof props.returnValue === 'function') {
                    let computed = props.returnValue(res);
                    setValue(computed);
                }
                if (typeof props.render === 'function') {
                    let computed = props.render(res);
                    setValue(computed);
                }
                else if (Array.isArray(res)) {
                    let index = props.returnValue == null ? 0 : parseInt(props.returnValue);
                    setValue(res[index]);
                } else {
                    setValue(res + "");
                }
                setIsLoaded(true);
            } catch (error) {
                console.log(JSON.stringify(error))
                setError("Error: Contract doesn't exsit or is in a different network?");
            }

        }
        read();
    }, []);

    if (!isLoaded) {
        return (<center><span class="loading loading-spinner loading-md"></span></center>)
    }
    return (
        <span>
            {value} {error}
        </span >
    );
}

export default ContractRead;