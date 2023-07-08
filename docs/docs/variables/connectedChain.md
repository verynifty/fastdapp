---
sidebar_label: 'connectedChain'
sidebar_position: 2
---

# connectedChain

Get information about the chain the user is connected to

## Usage

```
<span> Connected on {connectedChain.name}! </span>
```

If you want to built cross chain apps. You can automatically swith the contract addresses in your app like this where the `AAVE_POOL_DATA_PROVIDER_ADDRESSES` keys are the chain ids.

```
 {(() => {
    AAVE_POOL_DATA_PROVIDER_ADDRESSES = {
        1: "0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3",
        10: "0xbd83DdBE37fc91923d59C8c1E0bDe0CccCa332d5",
        42161: "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654",
        137: "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654"
    }
    AAVE_POOL_DATA_PROVIDER = AAVE_POOL_DATA_PROVIDER_ADDRESSES[connectedChain.id];
})()}
```

## Available data

The `connectedChain` contains all the following properties:

```
{
   "id":1,
   "network":"homestead",
   "name":"Ethereum",
   "nativeCurrency":{
      "name":"Ether",
      "symbol":"ETH",
      "decimals":18
   },
   "rpcUrls":{
      "alchemy":{
         "http":[
            "https://eth-mainnet.g.alchemy.com/v2"
         ],
         "webSocket":[
            "wss://eth-mainnet.g.alchemy.com/v2"
         ]
      },
      "infura":{
         "http":[
            "https://mainnet.infura.io/v3"
         ],
         "webSocket":[
            "wss://mainnet.infura.io/ws/v3"
         ]
      },
      "default":{
         "http":[
            "https://cloudflare-eth.com"
         ]
      },
      "public":{
         "http":[
            "https://cloudflare-eth.com"
         ]
      }
   },
   "blockExplorers":{
      "etherscan":{
         "name":"Etherscan",
         "url":"https://etherscan.io"
      },
      "default":{
         "name":"Etherscan",
         "url":"https://etherscan.io"
      }
   },
   "contracts":{
      "ensRegistry":{
         "address":"0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
      },
      "ensUniversalResolver":{
         "address":"0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
         "blockCreated":16773775
      },
      "multicall3":{
         "address":"0xca11bde05977b3631167028862be2a173976ca11",
         "blockCreated":14353601
      }
   },
   "unsupported":false
}
```

