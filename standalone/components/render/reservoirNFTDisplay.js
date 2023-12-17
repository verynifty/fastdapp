import { TokenMedia, useTokens } from '@reservoir0x/reservoir-kit-ui'

import { default as React, useState, useRef, useEffect } from 'react';


const ReservoirNFTDisplay = (props) => {

    const { data: tokens } = useTokens({
        tokens: ["0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb:1"],
    })

    // This will run only once
    useEffect(() => {

    }, []);

    const collectionId = props.collectionAddress

    if (tokens.length == 0) {
    } else {
        return (
            <div className="reservoir">
                {JSON.stringify(tokens[0])}
                <TokenMedia
                    token={tokens[0]}
                />
            </div>
        );
    }
}

export default ReservoirNFTDisplay;