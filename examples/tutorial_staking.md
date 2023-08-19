---
chain: 11155111
authors: grands_marquis
theme: dark
---

<>
  {(() => {
    // You can declare reactive variables
    TOKEN_ADDRESS = "0xd71903b2d0161CcBcaED15acC0475Cd796d9908D";
    STAKING_ADDRESS = "0x58ce60E5A8f2124b66e8399EcA46FD201F8Fa0DD";
  })()}
</>

You currently own <TokenBalance token={TOKEN_ADDRESS} address={userAddress}
/>.

## Faucet

<ContractWrite
  address={TOKEN_ADDRESS}
  functionName="getFromFaucet"
  abi={[
    {
      inputs: [],
      name: "getFromFaucet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]}
/>

## Stake

<ContractWrite
  address={STAKING_ADDRESS}
  abi={[
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount_",
          type: "uint256",
          token: TOKEN_ADDRESS,
          ERC20Allow: STAKING_ADDRESS,
        },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
/>

<ContractRead
  address={STAKING_ADDRESS}
  abi={[
    {
      inputs: [
        {
          internalType: "address",
          name: "address_",
          type: "address",
        },
      ],
      name: "rewards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]}
  args={[userAddress]}
  render={(res) => <TokenAmount token={TOKEN_ADDRESS} amount={res} />}
/>

<ContractRead
  address={STAKING_ADDRESS}
  abi={[
    {
      inputs: [
        {
          internalType: "address",
          name: "address_",
          type: "address",
        },
      ],
      name: "balanceAndRewards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]}
  args={[userAddress]}
  render={(res) => <TokenAmount token={TOKEN_ADDRESS} amount={res} />}
/>

# Withdraw

<ContractWrite
  address={STAKING_ADDRESS}
  abi={[
    {
      inputs: [],
      name: "compound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
/>

<ContractWrite
  address={STAKING_ADDRESS}
  abi={[
    {
      inputs: [],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
/>

<ContractWrite
  address={STAKING_ADDRESS}
  abi={[
    {
      inputs: [],
      name: "withdrawAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
/>
