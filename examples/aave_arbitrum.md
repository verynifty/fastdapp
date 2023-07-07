---
chain: 42161
authors: grands_marquis
theme: aqua
---

<div class="p-5">
  {(() => {
    AAVE_POOL_DATA_PROVIDER = "0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654";
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
    AAVE_POOL = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
    AAVE_POOL_ABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "getReserveData",
        outputs: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "data",
                    type: "uint256",
                  },
                ],
                internalType: "struct DataTypes.ReserveConfigurationMap",
                name: "configuration",
                type: "tuple",
              },
              {
                internalType: "uint128",
                name: "liquidityIndex",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "currentLiquidityRate",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "variableBorrowIndex",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "currentVariableBorrowRate",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "currentStableBorrowRate",
                type: "uint128",
              },
              {
                internalType: "uint40",
                name: "lastUpdateTimestamp",
                type: "uint40",
              },
              {
                internalType: "uint16",
                name: "id",
                type: "uint16",
              },
              {
                internalType: "address",
                name: "aTokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "stableDebtTokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "variableDebtTokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "interestRateStrategyAddress",
                type: "address",
              },
              {
                internalType: "uint128",
                name: "accruedToTreasury",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "unbacked",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "isolationModeTotalDebt",
                type: "uint128",
              },
            ],
            internalType: "struct DataTypes.ReserveData",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
  })()}

<h1>AAVE Arbitrum</h1>

Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.

## Markets

<ContractRead
address={AAVE_POOL_DATA_PROVIDER}
abi={AAAVE_POOL_DATA_PROVIDER_ABI}
functionName="getAllReservesTokens"
args={[]}
render={
(reserveTokens) => (
<div>
<ul>
{reserveTokens.map(token =>
    <li key={token.tokenAddress}>
      <a href={`/app/aave_pool_arbitrum?token=${token.tokenAddress}`}>{token.symbol} - APY <ContractRead
address={AAVE_POOL}
abi={AAVE_POOL_ABI}
functionName="getReserveData"
args={[token.tokenAddress]}
render={
(poolInfos) => (
<span>{parseInt(parseInt(poolInfos.currentLiquidityRate) / 10e21) / 1000}%</span>)} /></a>
</li>
)}
</ul>

<div class="mt-10 alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>This app was built in less than 200 Lines of code</span>
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
