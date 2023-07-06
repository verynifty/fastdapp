---
chain: 1
authors: grands_marquis
---

<>
  {(() => {
    TOKEN = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    AAVE_POOL = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";
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
</>

<ContractRead
    address={AAVE_POOL}
    abi={AAVE_POOL_ABI}
    functionName="getReserveData"
    args={[TOKEN]}
    render={
        (poolInfos) => (
<div>
{poolInfos.aTokenAddress}

<ContractWrite
  address={AAVE_POOL}
  abi={[
    {
      inputs: [
        {
          internalType: "address",
          name: "asset",
          type: "address",
          hidden: true,
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
          token: TOKEN,
        },
        {
          internalType: "address",
          name: "onBehalfOf",
          type: "address",
          hidden: true,
        },
        {
          internalType: "uint16",
          name: "referralCode",
          type: "uint16",
          hidden: true,
        },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
  functionName="deposit"
  args={[TOKEN, 0, userAddress, 0xf457]}
/>

<ContractWrite
  address={AAVE_POOL}
  abi={[      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
            hidden: true,
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
            token: poolInfos.aTokenAddress
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
            hidden: true,
          },
        ],
        name: "withdraw",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },]}
  functionName="withdraw"
  args={[TOKEN, 0, userAddress]}
/>
</div>
        )
    }
/>

<p>
  {TOKEN} {userAddress}
</p>
