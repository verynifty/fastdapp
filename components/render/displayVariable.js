import { default as React, useState, useRef, useEffect } from 'react';


const DisplayVariable = (props) => {


    // This will run only once
    useEffect(() => {

    }, []);


    return (
        <span>
            {props.variable}
        </span >
    );
}

export default DisplayVariable;