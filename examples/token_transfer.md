---
chain: 1
authors: grands_marquis
---

<>{(() => { TOKEN_ADDRESS = "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81"})()}</>

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
</div>

</div>
