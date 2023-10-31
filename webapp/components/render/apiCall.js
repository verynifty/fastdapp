import { default as React, useState, useRef, useEffect } from 'react';
import axios from 'axios';

const APICall = (props) => {
    const [result, setResult] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    async function getResult() {
        try {
            const callResult = await axios.get(props.url, props.params)
            console.log("APICall", callResult.data)
            setResult(callResult.data);
        } catch (error) {
            console.log("APICall", error)
        }
        setIsLoaded(true)

    }
    // This will run only once
    useEffect(() => {
        getResult();
    }, [props.url]);

    function renderResult() {
        if (!isLoaded) {
            return (<center><span class="loading loading-spinner loading-md"></span></center>)
        } else if (typeof props.renderFunction === 'function') {
            return (<>{props.renderFunction(result)}</>)
        } else {
            return (<span>{JSON.stringify(result)}</span>)
        }
    }

    return (
        <div>
            {renderResult()}
        </div >
    );
}

export default APICall;