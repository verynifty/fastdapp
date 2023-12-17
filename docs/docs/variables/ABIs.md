---
sidebar_label: 'ABIs'
sidebar_position: 2
---

# ABIs

A javascript object containing often used ABIs:
* ERC20
* ERC721

## Example

Usage with a component:

```
<ContractRead 
    address={tokenAddress} 
    abi={ABIs.ERC20} 
    functionName="symbol" />
```
