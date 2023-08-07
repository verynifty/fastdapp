---
chain: 5
authors: grands_marquis
theme: fastdapp
---

# Get your FastDapp name for 0.02 ETH

Use your FastDapp NFT to reserve a domain name here like fasdapp.xyz/name.

With the NFT you can control:

- The source code pointed by the NFT
- View analytics for your app (soon)

Minting fees goes to the Muse DAO and are governed by Muse holders.

<ContractWrite
  address="0xC7B4E5690D9D59f47eCBa0A89375d7F0953AdA23"
  abi={[
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_location",
          type: "string",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      hideValue: true
    }
  ]}
  functionName="mint"
/>
