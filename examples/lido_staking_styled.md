---
chain: 1
authors: grands_marquis
---

<>
  {(() => {
    LIDO_ABI = [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "_referral",
            type: "address",
            hidden: true,
          },
        ],
        name: "submit",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
    ];
  })()}
</>
<>
  {(() => {
    LIDO_ADDRESS = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84";
  })()}
</>

<div class="m-20">

<div >
<p class="font-semibold text-xl ">LIDO Staking</p>
  <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
    <dl class="flex flex-wrap">
      <div class="flex-auto pl-6 pt-6">
        <dt class="text-sm font-semibold leading-6 text-gray-900">You staked</dt>
        <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
        <ContractRead
    address={LIDO_ADDRESS}
    abi={ABIs.ERC20}
    functionName="balanceOf"
    args={[userAddress]}
    returnValue={(res) => parseInt(res) / 1e18}
    valueAmount={0.1} /> ETH
        </dd>
      </div>
      <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
        <dd class="text-sm font-light text-gray-400">Available to stake:</dd>
        <dd class="text-sm font-medium leading-6 text-gray-900"><Balance 
    address={userAddress}/></dd>
      </div>
      <div class="mt-4 flex w-full flex-none gap-x-4 px-6 pb-2">
               <dd class="text-sm font-light text-gray-400">Total staked on Lido:</dd>
        <dd class="text-sm font-medium leading-6 text-gray-900"><ContractRead
    address={LIDO_ADDRESS}
    abi={LIDO_ABI}
    functionName="totalSupply"
    returnValue={(res) => (parseInt(res) / 1e18).toLocaleString() } /> ETH</dd>
      </div>
      
    </dl>

  </div>
</div>

<div class="mt-10">
  <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
    <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
      <div class="text-sm font-semibold leading-6 text-gray-900 mb-2">
        Stake now
      </div>
      <ContractWrite
        address={LIDO_ADDRESS}
        abi={LIDO_ABI}
        functionName="submit"
        buttonText="Stake"
        args={["0x6fBa46974b2b1bEfefA034e236A32e1f10C5A148"]}
        valueFieldName="Amount of ETH to stake"
        valueAmount="0.1"
      />
    </div>
  </div>
</div>

</div>
