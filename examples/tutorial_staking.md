---
chain: 11155111
authors: grands_marquis
theme: dark
---

<>
  {(() => {
    // You can declare reactive variables
    TOKEN_ADDRESS = "0xdde4f286985743bd84e594ebe339bf38226a906a";
    STAKING_ADDRESS = "0x32aaba6e37dc4c800c4f439dbd1a71415c765054";
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
]}  args={[userAddress]} />