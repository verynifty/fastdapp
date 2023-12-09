---
chain: 8453
authors: 0xfreckles
theme: none
title: Alt frontend for Pantheon
description: notice me senpai uwu
---
<>
  {(() => {
    // You can declare reactive variables
    PANTHEON_ABI = [{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"stateMutability":"payable","type":"constructor"},{"inputs":[],"name":"EthTransferFailed","type":"error"},{"inputs":[],"name":"MustTradeOverMin","type":"error"},{"inputs":[],"name":"ZeroAddressNotAllowed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newFeeAddress","type":"address"}],"name":"FeeAddressUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"recieved","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"sent","type":"uint256"}],"name":"PriceAfterMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"recieved","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"sent","type":"uint256"}],"name":"PriceAfterRedeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"totalEthEmergencyFixed","type":"uint256"}],"name":"TotalEthFixed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyFixTotalEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMintPantheon","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getRedeemPantheon","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pantheon","type":"uint256"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
  })()}




  {(() => {
    // You can declare reactive variables
    PANTHEON_ADDRESS = "0x993cd9c0512cfe335bc7eF0534236Ba760ea7526";
  })()}
</>



<div class="relative flex min-h-screen justify-center bg-gray-200 overflow-hidden">
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center bg-opacity-50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div class="relative bg-white px-6 py-8 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg rounded-lg flex flex-col gap-4 items-center">
    <div class="text-center text-7xl text-gray-700 font-serif mb-0">Pantheon</div>
    <div class="text-center text-1xl text-gray-700 font-mono mb-0">a new standard as reserve currency</div>
  <img
    src="https://www.svgrepo.com/show/322460/greek-temple.svg"
    width="110"
    height="110"
    alt="Logo"
    class="rounded-lg object-contain object-center mb-0 mt-0 opacity-80"
  />   

    <div class="w-60 h-120 rounded bg-stone-400 mb-2 bg-opacity-100">
      <div class="flex flex-col gap-4 items-center">
      <div class="text-center text-1xl text-white font-extrabold mb-0">______________________</div>
      <div class="text-center text-1xl text-white font-mono mb-0">$PANTHEON:
<div class="text-center text-1xl text-white font-mono mb-0"><ContractRead
  address={PANTHEON_ADDRESS}
  abi={[
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ]}
  functionName="balanceOf"
    args={[userAddress]}
    returnValue={(res) => parseInt(res) / 1e18}    
/></div></div>
<db class="text-center text-1xl text-white font-mono mb-0">Mint now $PANTHEON with your ETH!</db>    
<div class="text-center text-1xl text-white font-mono mb-0">
<ContractWrite
  address={PANTHEON_ADDRESS}
  abi={[
    {
      inputs: [{ internalType: "address", name: "receiver", type: "address" }],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ]}
  functionName="mint"
  buttonText="mint"
  valueFieldName="Amount of ETH"
/>
</div>
<db class="text-center text-1xl text-white font-mono mb-0">Burn your $PANTHEON and redeem ETH!</db>
<div class="text-center text-1xl text-white font-mono mb-0">
<ContractWrite
  address={PANTHEON_ADDRESS}
  abi={[
    {
      inputs: [{ internalType: "uint256", name: "pantheon", type: "uint256", token: PANTHEON_ADDRESS }],
      name: "redeem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
  args={[0]}
/>
<div class="text-center text-1xl text-white font-extrabold mb-3">______________________</div>
</div>
  </div>
   </div>
  <db class="text-center text-xs text-gray-700 font-mono mb-0 opacity-60">Alt-frontend of pantheon.gold by 0xfreckles</db>
    <db class="text-center text-xs text-gray-700 font-mono mb-0 opacity-60">No copyright infringement intended</db>
  </div>
  
  </div>