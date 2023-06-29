---
chain: 1
authors: grands_marquis
theme: cupcake
---

<>
  {(() => {
    NFM = "0x435f0c0ab71560cefdb6e7b3828200494cb81ab7";
  })()}
</>

<center>
    <img src="https://openseauserdata.com/files/7e18692218406f195b4068691aaf682e.svg" width="50%" height="50%" />

# Non Fungible Message

</center>

You can send a message or your own confession NFT to any wallet and they'll probably see it on OpenSea. You can mint and send for free (gas).

The message inlcudes the address of the sender and the block it was minted.

## Mint

<ContractWrite
  address={NFM}
  abi={[
    {
      inputs: [
        {
          internalType: "address",
          name: "Send to:",
          type: "address",
        },
        {
          internalType: "string",
          name: "The message:",
          type: "string",
          longText: true,
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
  functionName="mint"
  args={[
    userAddress,
    "I haven't left home for the past week because I spent all my money on jpegs. I am waiting for my salary on Monday so I can buy groceries again.",
  ]}
/>

## Links

- [OpenSea](https://opensea.io/collection/non-fungible-messages)
- [Etherscan](https://etherscan.io/address/0x435f0c0ab71560cefdb6e7b3828200494cb81ab7)
