import { watchBlockNumber } from '@wagmi/core'
import { default as React, useState, useRef } from 'react';

class blockNumber extends React.Component {

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
                this.setState({ blockNumber: ("" + newBlockNumber) })
            }
        )
    }

    componentWillUnmount() {
        if (this.state.unwatch) {
            this.state.unwatch();
        }
    }



    render() {

        return (
            <span> {this.state.blockNumber}</span>
        );
    }
}



export default blockNumber;