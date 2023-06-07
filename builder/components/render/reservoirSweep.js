import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

import { default as React, useState, useRef, useEffect } from 'react';


const ReservoirSweep = (props) => {

    // This will run only once
    useEffect(() => {


    }, []);

    const collectionId = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
    
    return (
        <div className="reservoir">
            <SweepModal
                trigger={
                    <button>
                        Sweep
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