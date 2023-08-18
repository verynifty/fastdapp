---
chain: 11155111
authors: grands_marquis
theme: dark
---

<>
  {(() => {
    // You can declare reactive variables
    TOKEN_ADDRESS = "0xE312909FE28c314725228B93A0b5B79e15CC7885";
    STAKING_ADDRESS = "0xF6297b35A0B7Ca3D4F1abEB5f15B5c332b0eeebA";
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