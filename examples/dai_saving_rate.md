---
chain: 1
authors: grands_marquis
---

<>
  {(() => {
    DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
    DAIPotAddress = "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7";
    DAIPotABI = [
      {
        constant: true,
        inputs: [],
        name: "dsr",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    SavingsDaiAddress = "0x83f20f44975d03b1b09e64809b757c47f942beea";
    SavingsDaiABI = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "assets",
            type: "uint256",
            token: DAIAddress,
            ERC20Allow: SavingsDaiAddress,
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
            hidden: true,
          },
        ],
        name: "deposit",
        outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "maxRedeem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "DAI to deposit", type: "uint256" },
        ],
        name: "previewRedeem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "sDAI to withdraw",
            type: "uint256",
            token: SavingsDaiAddress,
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
            hidden: true,
          },
        ],
        name: "redeem",
        outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
  })()}
</>

<center class="p-5">
<ContractRead
  address={DAIPotAddress}
  abi={DAIPotABI}
  functionName="dsr"
  returnValue={function (dsr) {
    // We convert DSR to yearly
    dsr = Math.round(
      parseInt(((dsr - BigInt(1e27)) * BigInt(31536000)) / BigInt(10e23)) / 10
    );
    return <h1>Earn {dsr + ""}% on your DAI with the DAI saving rates</h1>;
  }}
/>

## Deposit

By depositing, you will get sDAI. sDAI is similar to DAI but with the added benefit of earning interest. You can use it just like DAI - own, transfer, and use it in the DeFi ecosystem. Swapping between sDAI and DAI incurs no additional costs and no slippage as is deposited or withdrawn from the DSR contract.

<div class="mt-10">

<ContractWrite
  address={SavingsDaiAddress}
  abi={SavingsDaiABI}
  functionName="deposit"
  args={[0, userAddress]}
/>
</div>

## Withdraw

Exchange your sDAI into DAI.

<ContractRead
  address={SavingsDaiAddress}
  abi={SavingsDaiABI}
  functionName="maxRedeem"
  args={[userAddress]}
  returnValue={(maxRedeemable) => (
    <div>
      <ContractRead
        address={SavingsDaiAddress}
        abi={SavingsDaiABI}
        functionName="previewRedeem"
        args={[maxRedeemable]}
        returnValue={(redeemPreview) => (
          <div>
            You currently have{" "}
            <TokenAmount token={SavingsDaiAddress} amount={maxRedeemable} /> = <TokenAmount token={DAIAddress} amount={redeemPreview} /> in the DAI
            saving module.
            <div class="mt-10">
            <ContractWrite
              address={SavingsDaiAddress}
              abi={SavingsDaiABI}
              functionName="redeem"
              args={[maxRedeemable + "", userAddress, userAddress]}
            /></div>
          </div>
        )}
      />
    </div>
  )}
/>
<div class="mt-10 alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>This app was built in 150 Lines of code</span>
  <div>
    <a href="https://docs.fastdapp.xyz/docs/templates/dai-saving-rate" class="btn btn-sm">Show the code</a>
    <a href="https://fastdapp.xyz/" class="btn btn-sm btn-primary">Build yours</a>
  </div>
</div>
</center>
