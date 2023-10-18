---
chain: [1]
authors: grands_marquis
---

<>
  {(() => {
    ERC4626_ADDRESS = "__ERC4626_ADDRESS__";
    ERC4626_ASSET = "__ERC4626_ASSET__";
    ERC4626_ABI = [
      {
        inputs: [],
        name: "asset",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "Tokens to deposit",
            type: "uint256",
            token: ERC4626_ASSET,
            ERC20Allow: ERC4626_ADDRESS,
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
            hidden: true
          },
        ],
        name: "deposit",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "shares",
            type: "uint256",
            token: ERC4626_ADDRESS,
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
            hidden: true,
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
            hidden: true
          },
        ],
        name: "redeem",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
  })()}
</>

<div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-base-100">
  <div className="pt-5">
    <div className=" divide-gray-200 overflow-hidden rounded-lg bg-base shadow">
      <div className="px-4 py-5 sm:px-6">
        <h1>
          Deposit your{" "}
          <ContractRead
            address={ERC4626_ASSET}
            abi={ABIs.ERC20}
            functionName="name"
          />{" "}
          to get{" "}
          <ContractRead
            address={ERC4626_ADDRESS}
            abi={ABIs.ERC20}
            functionName="name"
          />
        </h1>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <h1>Deposit</h1>
        <ContractWrite
          address={ERC4626_ADDRESS}
          abi={ERC4626_ABI}
          functionName="deposit"
          args={[0, userAddress]}
        />
        <h1 class="mt-10">Withdraw</h1>
        <ContractWrite
          address={ERC4626_ADDRESS}
          abi={ERC4626_ABI}
          functionName="redeem"
          args={[0, userAddress, userAddress]}
        />
         <h1 class="mt-10">Transfer your <ContractRead
            address={ERC4626_ADDRESS}
            abi={ABIs.ERC20}
            functionName="name"
          /></h1>
        <ContractWrite
          address={ERC4626_ADDRESS}
          abi={ERC4626_ABI}
          functionName="transfer"
          args={[userAddress, 0]}
        />
      </div>
      <div className="px-4 py-4 sm:px-6">
        {/* Content goes here */}
        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
      </div>
    </div>
  </div>
</div>
