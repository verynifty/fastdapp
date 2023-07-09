---
chain: 1
authors: grands_marquis
---

<AirStack
query={`
query tokens($address: Identity!) {
  nfts: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenType: {_in: [ERC721]}, tokenAddress: {_nin: ["0x22C1f6050E56d2876009903609a2cC3fEf83B415"]}}, limit: 10, blockchain: ethereum}
  ) {
    data:TokenBalance {
      amount  
      chainId
      id
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
      tokenNfts {
        tokenId
        metaData {
          name
        }
        contentValue {
          image {
            medium
          }
        }
      }
    }
  }
}
`}
variables={
    {
      "address": "0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4"
    }
}
render={(data) =>
(   
<div>{data.nfts.data.map(nft =>
    JSON.stringify(nft)
)}</div>
)}
 />
