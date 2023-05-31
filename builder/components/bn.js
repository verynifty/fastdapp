import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef } from 'react';

class BN extends React.Component {



    constructor(props) {

        super(props);
        this.state = {
            blockNumber: "0",
        }
    }

    componentDidMount() {
        this.state.unwatch = watchBlockNumber(
            {
                listen: true,
            },
            (newBlockNumber) => {
                console.log(newBlockNumber, this.state)
                this.setState({blockNumber: ("" + newBlockNumber)})
            }
        )
    }



    render() {

        return (
            <div> {this.state.blockNumber} ddd</div>
        );
    }
}



export default BN;