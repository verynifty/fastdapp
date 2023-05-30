import { watchBlockNumber } from '@wagmi/core'
import { default as React, useEffect, useRef } from 'react';

const BN = (props) => {

    let unwatch = useRef();


    useEffect(() => {
        if (!unwatch) {
            unwatch();
            unwatch = null;
            console.log("unwatch")
        }
        console.log("useEffect")
        unwatch = watchBlockNumber(
            {
                listen: true,
            },
            (newBlockNumber) => {
                console.log(newBlockNumber)
                setBlockNumber("" + newBlockNumber)
            }
        )
    });


    const [blockNumber, setBlockNumber] = React.useState(0);



    return (
        <React.Fragment>
            {blockNumber}
        </React.Fragment>
    );
}



export default BN;