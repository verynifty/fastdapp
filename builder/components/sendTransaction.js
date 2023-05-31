import { default as React, useState, useRef } from 'react';

import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'

class SendTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      to: props.to,
      amount: 0
    }
  }

  componentDidMount() {
 
  }

  componentWillUnmount() {

  }

  onClickSend = async () => {
    console.log("send", this)
    this.setState({ amount: this.state.amount + 1 })
    const { hash } = await sendTransaction({
      to: this.state.to,
      value: this.state.amount,
    })
  }


  render() {

    return (
      <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-12 md:col-span-2">
        <div class="sm:col-span-6">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Recipient</label>
          <div class="mt-2">
            <input type="text" value={this.state.to} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <div class="mt-2">
            <input type="number" value={this.state.amount} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-12">
          <button onClick={this.onClickSend} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    );
  }
}



export default SendTransaction;