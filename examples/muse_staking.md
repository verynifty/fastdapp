---
chain: 1
authors: Sconey
theme: dark
---

<body class="900 text-white">
<div class="flex justify-between items-center p-2">
  <div>
    <a href="https://musedao.io" />
    <img
      src="https://assets.coingecko.com/coins/images/13230/large/muse_logo.png?1606460453"
      class="w-12 h-12"
    />
  </div>
  <div class="800 p-2 rounded">
    <PleaseConnect>
    <   AddressDisplay address={userAddress} />
    </PleaseConnect>
  </div>
</div>

<>
  {(() => {
    TOKEN_ADDRESS = "0xB6Ca7399B4F9CA56FC27cBfF44F4d2e4Eef1fc81";
    STAKING_ADDRESS = "0x9Cfc1d1A45F79246e8E074Cfdfc3f4AacddE8d9a";
    SMUSE_ADDRESS = "0x9Cfc1d1A45F79246e8E074Cfdfc3f4AacddE8d9a";
  })()}
</>

<div class="flex justify-center p-4">
  <div class="text-center">
    <h1 class="text-5xl font-pacifico mb-2">Muse Staking</h1>
    <p class="text-sm">Deposit to earn fees generated by the DAO</p>
    <p class="text-red-400 text-sm">
      There is a 10 day cooldown on all deposits, users must complete withdrawl
      within two days after cooldown ends
    </p>
  </div>
</div>

<PleaseConnect>
<div class="flex justify-center p-4">
  <div class="text-center">
    <div class="grid grid-cols-2 gap-4">
      <p class="text-sm md:text-base">
        Balance in wallet:{" "}
        <TokenBalance token={TOKEN_ADDRESS} address={userAddress} />
      </p>
      <p class="text-sm md:text-base text-right">
        <ContractRead
          address={TOKEN_ADDRESS}
          abi={ABIs.ERC20}
          functionName="balanceOf"
          args={[STAKING_ADDRESS]}
          render={(stakingBalance) => (
            <ContractRead
              address={STAKING_ADDRESS}
              abi={ABIs.ERC20}
              functionName="totalSupply"
              render={(totalSupply) => (
                <div>
                  1 sMuse ={" "}
                  {(
                    parseInt(stakingBalance / BigInt(1e16)) /
                    parseInt(totalSupply / BigInt(1e16))
                  ).toFixed(4)}
                </div>
              )}
            />
          )}
        />
      </p>
      <p class="text-sm md:text-base col-span-2 text-center mt-2">
        <ContractWrite
          address={TOKEN_ADDRESS}
          abi={[
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "Amount you wish to stake",
                  type: "uint256",
                  token: TOKEN_ADDRESS,
                  ERC20Allow: STAKING_ADDRESS,
                },
              ],
              name: "Stake",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ]}
        />
      </p>
    </div>
  </div>
</div>

<div class="flex justify-center p-4">
  <div class="text-center">
    <h1 class="text-3xl font-pacifico mb-2">Your stake info</h1>
  </div>
</div>

<div class="bg-#374151-800 p-2 mt-4">
  <div class="text-center">
    <ContractRead
      address={STAKING_ADDRESS}
      abi={[
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "userInfo",
          outputs: [
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "museValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timelock",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isClaimable",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "globalShares",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "globalBalance",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ]}
      args={[userAddress]}
      render={(res) => (
        <div>
          <div>sMuse balance: <TokenAmount token={SMUSE_ADDRESS} amount={res[0]} /></div>
          <div>Muse value <TokenAmount token={TOKEN_ADDRESS} amount={res[1]} /></div>
        </div>
      )}
    />
  </div>
</div>

<div class="flex justify-center p-4">
  <div class="text-center">
    <h1 class="text-3xl font-pacifico mb-2">Unstake</h1>
    <p class="text-sm">
      You will need to do 1 transaction to start the unstake timer below. Once
      the 10 day cooldown is over and you are within the 2 days, you will do 1
      more transaction to claim your Muse
    </p>
    <ContractWrite
      address={TOKEN_ADDRESS}
      abi={[
        {
          inputs: [],
          name: "Start unstake timer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
      ]}
    />
  </div>
</div>

<div class="flex justify-center p-4">
  <div class="text-center">
    <p class="text-grey-400 text-sm">
      See below to check on time until you are able to withdrawal and if you are
      in that 2 day window. Once you are in the two day window just input the
      amount you wish to unstake and complete the transaction.
    </p>
    <p class="text-red-400 text-sm">
      If you miss the window you will need to start the whole process over
      again.
    </p>
  </div>
</div>

<div class="flex justify-center p-4">
  <div class="text-center">
      <ContractRead
      address={STAKING_ADDRESS}
      abi={[
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "userInfo",
          outputs: [
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "museValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timelock",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isClaimable",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "globalShares",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "globalBalance",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ]}
      args={[userAddress]}
      render={(res) => (
         <div class="grid grid-cols-2 gap-4">
          <p class="text-sm md:text-base">Time until you can complete withdrawal: {res[2] + ""}</p>
           <p class="text-sm md:text-base text-right">In claim window?: {res[3] + ""}</p>
        </div>
      )}
    /> 
    <p class="text-sm md:text-base col-span-2 text-center mt-2">
    <ContractWrite
      address={TOKEN_ADDRESS}
      abi={[
        {
          inputs: [
            {
              internalType: "uint256",
              token: SMUSE_ADDRESS,
              name: "Amount to unstake",
              type: "uint256",
            },
          ],
          name: "unstake",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ]}
    />
    </p>
  </div>

</div>
</PleaseConnect>
</body>