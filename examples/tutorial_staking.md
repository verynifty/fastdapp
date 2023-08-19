---
chain: 11155111
authors: grands_marquis
theme: dark
---

<>
  {(() => {
    // You can declare reactive variables
    TOKEN_ADDRESS = "0x3DA53232ED30B97f9C6edcc326C1F9E5De406F9a";
    STAKING_ADDRESS = "0x5e8a17120e874A47Ff47EabaB11088f671B13d19";
  })()}
</>

You currently own <TokenBalance token={TOKEN_ADDRESS} address={userAddress}
/>.

## Faucet

<ContractWrite address={TOKEN_ADDRESS} functionName="getFromFaucet" abi={[
   {
      "inputs": [],
      "name": "getFromFaucet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]}
/>

## Stake

<ContractWrite address={STAKING_ADDRESS} abi={[
   {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount_",
          "type": "uint256",
          token: TOKEN_ADDRESS,
          ERC20Allow: STAKING_ADDRESS
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]}  />


<ContractRead address={STAKING_ADDRESS} abi={[
   {
      "inputs": [
        {
          "internalType": "address",
          "name": "address_",
          "type": "address"
        }
      ],
      "name": "rewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
]}  args={[userAddress]}
  render={(res) => <TokenAmount token={TOKEN_ADDRESS} amount={res} />}
 />

 <ContractRead address={STAKING_ADDRESS} abi={[
   {
      "inputs": [
        {
          "internalType": "address",
          "name": "address_",
          "type": "address"
        }
      ],
      "name": "balanceAndRewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
]}  args={[userAddress]}
  render={(res) => <TokenAmount token={TOKEN_ADDRESS} amount={res} />}
 />

 # Withdraw

 <ContractWrite
 address={STAKING_ADDRESS}
 abi={[
      {
      "inputs": [],
      "name": "compound",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
 ]} />

 <ContractWrite
 address={STAKING_ADDRESS}
 abi={[
         {
      "inputs": [],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
 ]} />

  <ContractWrite
 address={STAKING_ADDRESS}
 abi={[
         {
      "inputs": [],
      "name": "withdrawAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
 ]} />

