---
chain: 1
authors: grands_marquis
---

<AirStack
query={`
query tokens($address: Identity!) {
  nfts: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenType: {_in: [ERC721]}, tokenAddress: {_nin: ["0x22C1f6050E56d2876009903609a2cC3fEf83B415"]}}, limit: 100, blockchain: ethereum}
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
<div class="grid grid-cols-3 grid-flow-row gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
{data.nfts.data.map(nft =>
    (
        <div
          key={nft.id}
          class="card w-full p-4  bg-base-100 shadow-xl image-full"
        >
          <figure class="h-full w-full m-0 p-0">
            <img
              class="h-full w-full object-contains"
              src={nft.tokenNfts.contentValue.image ? nft.tokenNfts.contentValue.image.medium : " "}
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-white">{nft.tokenNfts.metaData ? nft.tokenNfts.metaData.name : ""}</h2>
            <p>
             {nft.token.name}
            </p>
        
          </div>
        </div>
    )
)}</div>
)}
 />
