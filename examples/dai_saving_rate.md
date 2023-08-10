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
        inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
        name: "previewRedeem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "shares", type: "uint256" },
          { internalType: "address", name: "receiver", type: "address" },
          { internalType: "address", name: "owner", type: "address" },
        ],
        name: "redeem",
        outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
  })()}
</>

<ContractRead 
    address={DAIPotAddress}
    abi={DAIPotABI}
    functionName="dsr"
    returnValue={function(dsr) {
      // We convert DSR to yearly 
      dsr = Math.round(parseInt(((dsr - BigInt(1e27)) * BigInt(31536000)) / BigInt(10e23)) / 10);
      return(
        <h1>Earn {dsr + ""}% on your DAI with the DAI saving rates</h1>
      )
    }}
/>

# Deposit

By depositing, you will get sDAI. sDAI is similar to DAI but with the added benefit of earning interest. You can use it just like DAI - own, transfer, and use it in the DeFi ecosystem. Swapping between sDAI and DAI incurs no additional costs and no slippage as is deposited or withdrawn from the DSR contract.

<ContractWrite
  address={SavingsDaiAddress}
  abi={SavingsDaiABI}
  functionName="deposit"
  args={[0, userAddress]}
/>

# Withdraw

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
            You currently have <TokenAmount token={DAIAddress} amount={redeemPreview} /> in the DAI saving module.
          </div>
        )}
      />
    </div>
  )}
/>
