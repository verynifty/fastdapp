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

## Basic Example


```
<ContractRead 
    address={tokenAddress} 
    abi={ABIs.ERC20} 
    functionName="symbol" />
```

You can see [several examples in the editor](https://build.musedao.io/editor?template=contract_write).

## Transform the return value by passing a function

You can transform the return value by passing a transformation function as a prop.

```
<ContractRead address={TOKEN_ADDRESS} 
  abi={ABIs.ERC20} 
  functionName="balanceOf"
  args={[TOKEN_RECIPIENT]}
  returnValue={(res) => parseInt(res) / 1e18} />
```

## Handle functions with several return values

There are 2 ways of dealing with a function that returns multiple values. 

### Pass a transformation function

```
<ContractRead 
    args={[1]}
    address={VNFTAddress}
    abi={ITEM_INFO_ABI}
    functionName="getItemInfo"
    returnValue={(res) => res[0]} />
```

### Pass the index of the value you want to display

Index of the value in the array starting from 0.

```
<ContractRead 
    args={[1]}
    address={VNFTAddress}
    abi={ITEM_INFO_ABI}
    functionName="getItemInfo"
    returnValue={0} />
```

## TODO

Here is a list of things coming for the component:
* Manage token decimals
