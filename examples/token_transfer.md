---
chain: 1
authors: grands_marquis
---

<>{(() => { TOKEN_ADDRESS = "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81"})()}</>
<div class="bg-pink-100 p-10">
<div class="m-20">

<p class="font-semibold text-xl ">MUSE Transfer</p>
  <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-5">

<ContractWrite 
    address={TOKEN_ADDRESS}
    abi={[
        {
        "constant": false,
        "inputs": [
            {
                "name": "To",
                "type": "address"
            },
            {
                "name": "Amount",
                "type": "uint256",
                "token": TOKEN_ADDRESS
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
        }
    ]}
    functionName="transfer"
    args={["0xC618b905f7b41c7D53C23474322D7D3297730419", 2]}
/>
<div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
        <dd class="text-sm font-light text-gray-400">Your balance:</dd>
        <dd class="text-sm font-medium leading-6 text-gray-900"><TokenBalance 
    address={userAddress} token={TOKEN_ADDRESS}/></dd>
      </div>
</div>

</div>
</div>

