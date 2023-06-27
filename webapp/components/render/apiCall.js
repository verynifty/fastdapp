import { default as React, useState, useRef, useEffect } from 'react';
import axios from 'axios';

const APICall = (props) => {
    const [result, setResult] = React.useState(null);

    async function getResult() {
        try {
            const callResult = await axios.get(props.url, props.params)
            setResult(callResult.data);
        } catch (error) {
            console.log("APICall", error)
        }

    }
    // This will run only once
    useEffect(() => {
        getResult();
    }, [props.url]);

    function renderResult() {
        if (result == null) {
            return (<span>Loading...</span>)
        } else if (typeof props.renderFunction === 'function') {
            return (<span>{props.renderFunction(result)}</span>)
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