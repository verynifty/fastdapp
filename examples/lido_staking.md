---
chain: 1
authors: grands_marquis
---
<>{(() => { 
    LIDO_ABI = [
    {
    "constant": true,
    "inputs": [
      
    ],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
    {
    "constant": false,
    "inputs": [
      {
        "name": "_referral",
        "type": "address",
        "hidden": true
      }
    ],
    "name": "submit",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]})()}</>
<>{(() => { LIDO_ADDRESS = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"})()}</>

# Stake your ETH with LIDO

<div>Your balance: <strong><Balance 
    address={userAddress}
/></strong></div>

<div>Total ETH staked on LIDO: 

<strong><ContractRead
    address={LIDO_ADDRESS}
    abi={LIDO_ABI}
    functionName="totalSupply"
    returnValue={(res) => parseInt(res) / 1e18} /> ETH</strong>
</div>

<div>You currently have: 
<strong><ContractRead
    address={LIDO_ADDRESS}
    abi={ABIs.ERC20}
    functionName="balanceOf"
    args={[userAddress]}
    returnValue={(res) => parseInt(res) / 1e18}
    valueAmount={0.1} /> staked ETH</strong>
</div>

## Deposit your ETH

<ContractWrite 
    address={LIDO_ADDRESS}
    abi={LIDO_ABI}
    functionName="submit"
    buttonText="Stake"
    args={["0x6fBa46974b2b1bEfefA034e236A32e1f10C5A148"]}
    valueFieldName="Amount of ETH"
    valueAmount="0.1"
    />


