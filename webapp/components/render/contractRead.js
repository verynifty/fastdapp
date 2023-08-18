import { default as React, useState, useRef, useEffect } from 'react';
import { readContract } from '@wagmi/core'


const ContractRead = (props) => {
    const [value, setValue] = React.useState();
    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState(false);

    // This will run only once
    useEffect(() => {
        async function read() {
            let functionName = props.functionName;
            if (functionName == null) {
                functionName = props.abi[0].name;
            }
            try {
                console.log({
                    address: props.address,
                    abi: props.abi,
                    functionName: props.functionName,
                })
                const res = await readContract({
                    address: props.address,
                    abi: props.abi,
                    functionName: functionName,
                    args: props.args,
                })
                console.log(res)
                if (typeof props.returnValue === 'function') {
                    try {
                        let computed = props.returnValue(res);
                        setValue(computed);
                    } catch (error) {
                        console.log(JSON.stringify(error))
                        setError("Error: Return value function failed");
                    }
                }
                else if (typeof props.render === 'function') {
                    try {
                        let computed = props.render(res);
                        setValue(computed);
                    } catch (error) {
                        console.log(JSON.stringify(error))
                        setError("Error: Return value function failed");
                    }
                }
                else if (Array.isArray(res)) {
                    let index = props.returnValue == null ? 0 : parseInt(props.returnValue);
                    setValue(res[index]);
                } else {
                    setValue(res + "");
                }
                setIsLoaded(true);
            } catch (error) {
                console.error("Error: Contract doesn't exsit or is in a different network?", error)
                setError("Error: Contract doesn't exsit or is in a different network?");
            }

        }
        read();
    }, []);

    if (!isLoaded) {
        return (<span class="loading loading-spinner loading-md"></span>)
    }
    return (
        <span>
            {value} {error}
        </span >
    );
}

export default ContractRead;