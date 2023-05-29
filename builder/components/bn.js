import { watchBlockNumber } from '@wagmi/core'
import { default as React, useEffect, useRef } from 'react';

const BN = (props) => {
    const [blockNumber, setBlockNumber] = React.useState(0);
   
    const unwatch = watchBlockNumber(
        {
          listen: true,
        },
        (newBlockNumber) => {
            console.log(newBlockNumber)
            setBlockNumber("" + newBlockNumber)
        }
      )
   
    return (
      <React.Fragment>
        {blockNumber}
      </React.Fragment>
    );
  }
   
  export default BN;