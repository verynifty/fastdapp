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

<>
  {(() => {
    // You can declare reactive variables
    [location, setLocation] = useState(
      typeof location !== "undefined" ? location : ""
    );
  })()}
</>

<ContractWrite
  address="0xC7B4E5690D9D59f47eCBa0A89375d7F0953AdA23"
  abi={[
    {
      inputs: [
        {
          internalType: "string",
          name: "Domain name for your app (only alphanumeric and - _):",
          type: "string",
        },
        {
          internalType: "string",
          name: "Address of hosted page (https or ipfs):",
          type: "string",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      hideValue: true,
    },
  ]}
  args={["", location]}
  functionName="mint"
  onTransactionMined={function (tx, rawTx) {
    console.log("mined", tx, rawTx);
    console.log(rawTx.args[0]);
    // window.location.href = 'http://www.google.com';
  }}
/>
