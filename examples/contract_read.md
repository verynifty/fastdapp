---
chain: 1
authors: grands_marquis
---

# Contract read examples

<>
  {/* 
    We first load the variables we will be using in the page
    For convenience ERC20 ABI is preloaded
*/}
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
<>
  {(() => {
    VNFTAddress = "0x57f0B53926dd62f2E26bc40B30140AbEA474DA94";
  })()}
</>
<>
  {(() => {
    ITEM_INFO_ABI = [
      {
        inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
        name: "getItemInfo",
        outputs: [
          { internalType: "string", name: "_name", type: "string" },
          { internalType: "uint256", name: "_price", type: "uint256" },
          { internalType: "uint256", name: "_points", type: "uint256" },
          { internalType: "uint256", name: "_timeExtension", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
  })()}
</>

## 1. A contract read without parameters

<span>
  The token symbol is:
  <strong>
    <ContractRead
      address={TOKEN_ADDRESS}
      abi={ABIs.ERC20}
      functionName="symbol"
    />
  </strong>
</span>

## 2.) A contract read with parameters

The parameters are passed in args property

<span>
  The balance of {TOKEN_RECIPIENT} is:
  <strong>
    <ContractRead
      address={TOKEN_ADDRESS}
      abi={ABIs.ERC20}
      functionName="balanceOf"
      args={[TOKEN_RECIPIENT]}
    />
  </strong>
</span>

## 4. You can transform the return value by passing a function

You can transform the return value by passing a transformation function as a prop.

<span>
  The balance of {TOKEN_RECIPIENT} is:
  <strong>
    <ContractRead
      address={TOKEN_ADDRESS}
      abi={ABIs.ERC20}
      functionName="balanceOf"
      args={[TOKEN_RECIPIENT]}
      returnValue={(res) => parseInt(res) / 1e18}
    />
  </strong>
</span>

## 5. Handling functions with several return values

There are 2 ways of dealing with a function that returns multiple values.

### Pass a transformation function

<span>
  Name of accessory:
  <strong>
    <ContractRead
      args={[1]}
      address={VNFTAddress}
      abi={ITEM_INFO_ABI}
      functionName="getItemInfo"
      returnValue={(res) => res[0]}
    />
  </strong>
</span>

### Pass the index of the value you want to display

Index of the value in the array starting from 0.

<span>
  Name of accessory:
  <strong>
    <ContractRead
      args={[1]}
      address={VNFTAddress}
      abi={ITEM_INFO_ABI}
      functionName="getItemInfo"
      returnValue={0}
    />
  </strong>
</span>
