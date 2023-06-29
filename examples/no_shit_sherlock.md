---
chain: 1
theme: dark
authors: grands_marquis
description: An example on how to interact with the NoShitSherlock contract 0x55af491e8b33246606FeB9010156D2597e15cAa1
---

<>
  {(() => {
    NSS_ADDRESS = "0x55af491e8b33246606FeB9010156D2597e15cAa1";
  })()}
</>{" "}

<div class="p-10">

# No Shit Sherlock

## What is it?

- Buy some $NSS
- Make a guess for (6969 $NSS)
- Correctly guess the 4 parameters to get the prize

## Get some tokens?

<div
  tabindex="0"
  class="collapse collapse-plus border border-base-300 bg-base-200"
>
  <div class="collapse-title text-xl font-medium">Get some tokens</div>
  <div class="collapse-content">
    <Uniswap defaultInputAmount={1} defaultOutputTokenAddress={NSS_ADDRESS} />{" "}
  </div>
</div>

## Your balance

<TokenBalance address={userAddress} token={NSS_ADDRESS} />

## Make a guess?

<ContractWrite
  address={NSS_ADDRESS}
  abi={[
    {
      inputs: [
        {
          internalType: "uint256",
          name: "Suspect",
          type: "uint256",
          selectChoices: {
            "Craig 'Faketoshi' Wright": "0",
            "Sam Bankman-Fried": "1",
            "Do Kwon": "2",
            "Justin Sun": "3",
            "Arthur Hayes": "4",
            "Charlie Shrem": "5",
            "Brock Pierce": "6",
            "Shitboy Brypto": "7",
            "Gary Gensler": "8",
            "Roger Ver": "9",
          },
        },
        {
          internalType: "uint256",
          name: "Weapon",
          type: "uint256",
          selectChoices: {
            Hopium: "0",
            Rugpull: "1",
            "Falling knives": "2",
            "Rekt Rocket": "3",
            "Liquidation laser": "4",
            "FUD Flame": "5",
            "Technically you kinda lost your money": "6",
            "Short Squeeze": "7",
            Shillfest: "8",
            "SEC whistleblower": "9",
          },
        },
        {
          internalType: "uint256",
          name: "Room",
          type: "uint256",
          selectChoices: {
            "Tether Treasury": "0",
            "Bitfinex Basement": "1",
            "Pump Palace": "2",
            "Moon Mission Control": "3",
            "Satoshi's Secret Lab": "4",
            "Binance HQ (location unknown)": "5",
            "FOMO Factory": "6",
            "Crypto Castle": "7",
            "Wassie murder fridge": "8",
            "Ruins of Cryptopia": "9",
          },
        },
        {
          internalType: "uint256",
          name: "Motive",
          type: "uint256",
          selectChoices: {
            Greed: "0",
            Fear: "1",
            Jealousy: "2",
            Revenge: "3",
            Power: "4",
            Control: "5",
            Deception: "6",
            Manipulation: "7",
            Hypocrisy: "8",
            Misdirection: "9",
          },
        },
      ],
      name: "makeGuess",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]}
  functionName="makeGuess"
  args={[0, 0, 0, 0]}
  buttonText="Make my guess"
/>

</div>
