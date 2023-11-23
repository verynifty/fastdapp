---
chain: [1]
authors: grands_marquis
theme: retro
---

<>
  {(() => {
    NPC_ADDRESS = "0x8ed97a637a790be1feff5e888d43629dc05408f6";
    NPC_ERC1155_ADDRESS = "0x31B73666cA5874950e94baBc0c5f93419faCc82b";
    NPC_ABI = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "Amount",
            type: "uint256",
            token: NPC_ADDRESS
          },
        ],
        name: "Respawn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "Amount",
            type: "uint256",
            token: NPC_ERC1155_ADDRESS,
            tokenID: "1"
          },
        ],
        name: "Transform",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
  })()}
</>

<section class="w-full h-full flex flex-col items-center justify-center  p-4 space-y-4">
  <img
    src="https://nonplayablecoin.xyz/static/npctoken.png"
    width="200"
    height="200"
    alt="Logo"
    class="rounded-lg object-contain object-center"
  />
  <h1 class="text-3xl font-bold text-primary">
    AN NPC FOR EVERY HUMAN ON EARTH
  </h1>
  <h2 class="text-xl">TRADEABLE LIKE A MEMECOIN. CUSTOMIZABLE AS AN NFT.</h2>
  <div class="flex space-x-4">
    <a
      href="https://docs.nonplayablecoin.xyz/"
    >
      <img
        src="https://nonplayablecoin.xyz/static/gitbook.svg"
        width="35"
        height="35"
        class="rounded-lg object-contain object-center"
      />
    </a>
    <a
      href="https://twitter.com/nonplayablecoin"
    >
      <img
        src="https://nonplayablecoin.xyz/static/twitter.svg"
        width="35"
        height="35"
        class="rounded-lg object-contain object-center"
      />
    </a>
       <a
      href="https://t.me/nonplayablecoin"
    >
      <img
        src="https://nonplayablecoin.xyz/static/telegram.svg"
        width="35"
        height="35"
        class="rounded-lg object-contain object-center"
      />
    </a>
       <a
      href="https://etherscan.io/token/0x8ed97a637a790be1feff5e888d43629dc05408f6"
    >
      <img
        src="https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
        width="35"
        height="35"
        class="rounded-lg object-contain object-center"
      />
    </a>
  </div>
  <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-title">NPC MFT Balance</div>
    <div className="stat-value"><TokenBalance address={userAddress} token={NPC_ADDRESS} /></div>
  </div>
  
  <div className="stat">
    <div className="stat-title">Non-Playable Coin (NPC) Balance</div>
    <div className="stat-value"><TokenBalance address={userAddress} token={NPC_ERC1155_ADDRESS} tokenID="1" /> </div>
  </div>
  
 
  
</div>
<h2>From ERC20 to ERC1155</h2>
<ContractWrite address={NPC_ADDRESS} abi={NPC_ABI} functionName="Respawn" args={[0]} />
<h2>From ERC1155 to ERC20</h2>

<ContractWrite address={NPC_ADDRESS} abi={NPC_ABI} functionName="Transform" args={[0]} />
  
    <div class="flex justify-center space-x-4">
    <div class="card shadow-lg rounded-lg overflow-hidden">
      <img
        src="https://nonplayablecoin.xyz/static/npc.jpeg"
          class="w-full h-48 object-cover"
        width="200"
        height="200"
      />
      <div class="p-4">
        <h3 class="text-xl font-bold">One JPEG to rule them all</h3>
        <p class="">
        Introducing Non-Playable Coin (NPC): a meme coin and unique NFT hybrid that we like to call a “Meme Fungible Token” (MFT).
We are bringing the first, true JPEG for the masses that is tradable both on Uniswap and NFT marketplaces. That’s the magic of MFTs. Simply use the dAPP located on our homepage to transform your NPC = NPC MFT and vice versa.
        </p>
      </div>
    </div>
    <div class="card  shadow-lg rounded-lg overflow-hidden">
      <img
        src="https://nonplayablecoin.xyz/static/box.jpg"
        class="w-full h-48 object-cover"
        width="200"
        height="200"
      />
      <div class="p-4">
        <h3 class="text-xl font-bold ">The Apes Have Had Their Day</h3>
        <p class="">
        It s time for the NPCs to take control.
Non-Playable Coin is here to bring the JPEG to every single last person on earth.
Unlike prior NFTs that relied on the gas-guzzling ERC721 model with exclusive low supply, NPC utilizes a one-of-a-kind model that combines the efficient ERC1155 NFT standard with ERC20 compatability. The end result is an incredibly cheap and liquid JPEG truly for the people — all 8+ billion of us.
        </p>
      </div>
    </div>
    <div class="card shadow-lg rounded-lg overflow-hidden">
      <img
        src="https://nonplayablecoin.xyz/static/joe.jpg"
        class="w-full h-48 object-cover"
        width="200"
        height="200"
      />
      <div class="p-4">
        <h3 class="text-xl font-bold ">Tokenomics</h3>
        <p class="">
        Zero transaction tax. The only taxes you should be paying is to your government.
On July 26, 2023, the total human population was recorded on-chain.
Supply: 8,050,126,520 NPC
99% of NPC tokens have been sent to the Uniswap liquidity pool, LP tokens were burnt, and contract is renounced. The remaining 1% of the supply will be LPed on Sudoswap.
        </p>
      </div>
    </div>
  </div>

<h3>Buy on Uniswap</h3>
  <Uniswap
    defaultInputAmount={1}
    defaultOutputTokenAddress={NPC_ADDRESS}  />

</section>
