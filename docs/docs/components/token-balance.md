---
sidebar_label: 'Token Balance (ERC20)'
sidebar_position: 5
---

# Token Balance (ERC20/ERC1155)

Display the ERC20 token balance of an address.

## Example

```
    <TokenBalance 
        address="0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4"
        token="0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81"
    />
```

## ERC1155

Additionally you can query for the token balance of ERC1155 assets by providing a token id:

```
    <TokenBalance 
        address="0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4"
        token="0x31B73666cA5874950e94baBc0c5f93419faCc82b"
        tokenID="1"
    />
```