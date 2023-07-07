---
chain: 1
authors: grands_marquis
theme: aqua
---

<div class="p-5">
  {(() => {
    TOKEN = "0x6b175474e89094c44da98b954eedeac495271d0f";
    AAVE_POOL_DATA_PROVIDER = "0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3";
    AAAVE_POOL_DATA_PROVIDER_ABI = [
  {
    "inputs": [
      
    ],
    "name": "getAllReservesTokens",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
          }
        ],
        "internalType": "struct IPoolDataProvider.TokenData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
    ];
  })()}

<h1>AAVE</h1>

<ContractRead
address={AAVE_POOL_DATA_PROVIDER}
abi={AAAVE_POOL_DATA_PROVIDER_ABI}
functionName="getAllReservesTokens"
args={[]}
render={
(reserveTokens) => (

<div>
{reserveTokens.map(token =>
    <div key={token.tokenAddress}>
      <a href={`/app/aave_pool?token=${token.tokenAddress}`}>{token.symbol}</a>
    </div>
)}

<div class="mt-15 alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>This app was built in less than 250 Lines of code</span>
  <div>
    <a href="https://docs.fastdapp.xyz/docs/templates/aave" class="btn btn-sm">Show the code</a>
    <a href="https://fastdapp.xyz/" class="btn btn-sm btn-primary">Build yours</a>
  </div>
</div>
</div>
        )
    }
/>

</div>
