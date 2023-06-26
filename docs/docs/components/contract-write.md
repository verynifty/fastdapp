---
sidebar_label: 'Contract Write'
sidebar_position: 3
---

# Contract Write
This component is used to invite users to interact with a smart contract.

## Props

* `address`
* `ABI`
* `functionName`
* `args` an array containing the default parameters you want to use
* `buttonText` (optional)

## Example

Here is a simple example:

```
<ContractWrite 
    address={TOKEN_ADDRESS} 
    abi={ABIs.ERC20} 
    functionName="transfer" 
    args={[TOKEN_RECIPIENT, 1]} />
```

You can see [several examples in the editor](https://fastdapp.xyz/editor?template=contract_write).

## Advanced usage
### How to change the form label of a parameter?

If you want to change one of the parameter label in the input you can edit it's `name` in the input list.

### How to hide a parameter?

If you want one parameter to be hidden so the user can't change the default value you can add `hidden` inside of it's ABI definition.

```
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
  args={[TOKEN_ADDRESS, true]}
   />
```

### How to deal with token inputs?

You can add a `token` property on the input. The form will directly convert the input/args to the appropriate number of decimals.

```
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
    args={["0xC618b905f7b41c7D53C23474322D7D3297730419", 1]}
/>
```

### How to force the choice between predefined values?

It is possible to force the input field to be an HTML select by providing a `selectChoices` property in the ABI input. This will render a single choice select in the form like:

![selectChoices](/img/components/selectchoices.png)

```
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
    args={["0x0000000000000000000000000000000000000000", 2]}
/>
```

### How to make a text input larger 

You can force a text input to be a `textarea` instead of a normal `input` by adding the `longText` attribute in the ABI:

![selectChoices](/img/components/longtext.png)

```
<ContractWrite 
    address={NFM}
    abi={[
       {
    "inputs": [
      {
        "internalType": "address",
        "name": "Send to:",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "The message:",
        "type": "string",
        "longText": true
      }
    ],
    "name": "mint",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
    ]}
    functionName="mint"
    args={[userAddress, "I haven't left home for the past week because I spent all my money on jpegs. I am waiting for my salary on Monday so I can buy groceries again."]}
/>
```

### How to make a date picker for an EVM timestamp

You can force a number input to be a datepicker by adding the `date` attribute in the ABI:

![selectChoices](/img/components/longtext.png)

```
<ContractWrite 
    address={SABLIER_ADDRESS} 
    abi={[
        {
    "constant": false,
    "inputs": [
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
    args={[1687333099, 1688333099]} />
```





## TODO

Here is a list of things coming for the component:
* Manage token approvals
* Specific input for numbers/addresses