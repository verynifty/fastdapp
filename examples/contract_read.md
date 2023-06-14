---
chain: 1
authors: grands_marquis
---

# Contract write examples

<>{/* 
    We first load the variables we will be using in the page
    For convenience ERC20 ABI is preloaded
*/}</>

<>{(() => { TOKEN_ADDRESS = "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81"})()}</>
<>{(() => { TOKEN_RECIPIENT = "0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4"})()}</>
<>{(() => { NFT_ADDRESS = "0x3dbb10bde369a8272f7106d88c510829af49c813"})()}</>

## 1. A contract read without parameters


<span>
The token symbol is: 
<ContractRead address={TOKEN_ADDRESS} 
  abi={ABIs.ERC20} 
  functionName="symbol"
   />
</span>


## 2.) A contract write with parameters

The parameters are passed in args property

<span>
The balance of {TOKEN_RECIPIENT} is: 
<ContractRead address={TOKEN_ADDRESS} 
  abi={ABIs.ERC20} 
  functionName="balanceOf"
  args={[TOKEN_RECIPIENT]} />
</span>

## 3. A contract write, hiding some inputs

You can add the hidden flag in the ABI for the input you want to hide. Note that boolean inputs are rendered with a switch.

<ContractWrite address={NFT_ADDRESS}  abi={[{
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "hidden": true
            },
            {
                "name": "Can manage my NFT?",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]} 
  functionName="setApprovalForAll"
  buttonText="Set Approval to me"
  args={[TOKEN_ADDRESS, true]}
   />
