import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

import { default as React, useState, useRef, useEffect } from 'react';


const ReservoirSweep = (props) => {

    // This will run only once
    useEffect(() => {


    }, []);

    const collectionId = props.collectionAddress

    return (
        <div className="reservoir">ddsfds
            <SweepModal
                trigger={
                    <button>
                        {props.buttonText}
                    </button>
                }
                collectionId={collectionId}
                onSweepComplete={(data) => {
                    console.log('Sweep Complete', data)
                }}
                onSweepError={(error, data) => {
                    console.log('Sweep Error', error, data)
                }}
                onClose={() => {
                    console.log('SweepModal Closed')
                }}
            />
        </div>
    );
}

export default ReservoirSweep;