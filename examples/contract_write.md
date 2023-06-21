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
<>{(() => { SABLIER_ADDRESS = "0xCD18eAa163733Da39c232722cBC4E8940b1D8888"})()}</> 

## 1. A contract write without parameters

<ContractWrite address={NFT_ADDRESS}  abi={[{
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]} 
  functionName="mint"
  buttonText="Mint this NFT" />



## 2.) A contract write with parameters

The parameters are passed in args property

<ContractWrite 
    address={TOKEN_ADDRESS} 
    abi={ABIs.ERC20} 
    functionName="transfer" 
    args={[TOKEN_RECIPIENT, 0]} />

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

## 4. Multiple choices for inputs

You can create inputs with predefined choices. Here the user can decide who to send the token to.

<ContractWrite 
    address={TOKEN_ADDRESS}
    abi={[
        {
        "constant": false,
        "inputs": [
            {
                "name": "To",
                "type": "address",
                "selectChoices": {
                    "Donate to dev": "0xC618b905f7b41c7D53C23474322D7D3297730419",
                    "Burn": "0x0000000000000000000000000000000000000000"
                }
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
    args={["0x0000000000000000000000000000000000000000", 1]}
/>

## 5. Datepicker

Here is an example of a number input as a datepicker:

<ContractWrite 
    address={SABLIER_ADDRESS} 
    abi={[
        {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deposit",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256",
        "date": true
      },
      {
        "internalType": "uint256",
        "name": "stopTime",
        "type": "uint256",
        "date": true
      }
    ],
    "name": "createStream",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
        }
    ]} 
    functionName="createStream" 
    args={[TOKEN_RECIPIENT, 0, TOKEN_ADDRESS, 1687333099, 1688333099]} />