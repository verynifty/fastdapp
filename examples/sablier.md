---
chain: 1
authors: grands_marquis
theme: dark
---

<>
  {(() => {
    SABLIER_ADDRESS = "0xCD18eAa163733Da39c232722cBC4E8940b1D8888";
  })()}
</>
<>
  {(() => {
    TOKEN_ADDRESS = "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81";
  })()}
</>
<>
  {(() => {
    TOKEN_RECIPIENT = "0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4";
  })()}
</>

<ContractWrite
  address={SABLIER_ADDRESS}
  abi={[
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "deposit",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "startTime",
          type: "uint256",
          date: true,
        },
        {
          internalType: "uint256",
          name: "stopTime",
          type: "uint256",
          date: true,
        },
      ],
      name: "createStream",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
  functionName="createStream"
  args={[TOKEN_RECIPIENT, 0, TOKEN_ADDRESS, 1687333099, 1688333099]}
/>
