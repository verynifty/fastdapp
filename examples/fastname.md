---
chain: 5
authors: grands_marquis
theme: fastdapp
---

<>
  {(() => {
    // You can declare reactive variables
    [location, setLocation] = useState(
      typeof location !== "undefined" ? location : ""
    );
  })()}
</>
<div class="p-10">
<div class="w-full p-4 text-center bg-neutral border border-gray-200 rounded-lg shadow sm:p-8">
    <h1 class="mb-2 text-3xl text-primary font-bold">Get a domain name</h1>
    <div class="mb-5 text-base  sm:text-lg">

Use your FastDapp NFT to reserve a domain name here like fasdapp.xyz/name.

The NFT enables you to control where the the domain points to, see analytics for your app (soon).

Minting fees (0.01ETH) are there to avoid domain squating during the beta and goes to the Muse DAO and are governed by Muse holders.

<ContractWrite
  address="0xC7B4E5690D9D59f47eCBa0A89375d7F0953AdA23"
  abi={[
    {
      inputs: [
        {
          internalType: "string",
          name: "Domain name for your app (only alphanumeric, '-' and  '_'):",
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

  </div>

</div>
</div>
