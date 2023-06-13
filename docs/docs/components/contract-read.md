---
sidebar_label: 'Contract Read'
sidebar_position: 2
---
# Contract Read
This component is used to invite users to interact with a smart contract.

## Props

* `address`
* `ABI`
* `functionName`
* `args` an array containing the parameters you want to use
* `returnValue` if the function returns several parameters, the index of the one you want to display (starting from 0)

## Example

```
<ContractRead 
    address={tokenAddress} 
    abi={ABIs.ERC20} 
    functionName="symbol" />
```

With multiple return values and arguments:
```
<ContractRead 
    args={[0]}
    returnValue={0}
    address={VNFTAddress} 
    functionName="getItemInfo"
     abi={[{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"}],"name":"getItemInfo","outputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_points","type":"uint256"},{"internalType":"uint256","name":"_timeExtension","type":"uint256"}],"stateMutability":"view","type":"function"}]}   />

```

## TODO

Here is a list of things coming for the component:
* Manage token decimals
