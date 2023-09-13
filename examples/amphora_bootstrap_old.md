---
chain: [1]
authors: grands_marquis
---

<div class="p-5">
  {(() => {
    TOKEN = (typeof token !== 'undefined') ? token : "0x943c5F4F54509d1e78B1fCD93B92c43ce83d3141";
    TOKENA = (typeof token !== 'undefined') ? token : "0xFE77ff4Cff74DCb6Aa570869F4f075c727054575";
    TOKENB = (typeof token !== 'undefined') ? token : "0x5Ac4a1E420f0F510ef94DB86CDbaB59d5C0F2c83";
    BUYER_POOL = "0x268d16fBbCe5cc427e4b26478141302B408CceF7";
    BUYER_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AMPH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BAL_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CRV_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SNX_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDA_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aggregators","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amphClaimer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cvxCRV_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"getCRVEquivalent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"purchaseAMPH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_aggregator","type":"address"}],"name":"setAggregators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_bool","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  })()}

<a href="/app/aave">
  <h1>Treasury Bootstrap Conversion System</h1>
</a>

The following page is for the Amphora Protocol treasury bootstrap conversion system located at 0x268d16fBbCe5cc427e4b26478141302B408CceF7 and deployed by the Amphora Deployer (0xe35aadB1C84D9804dAaC0aE6e5433E1890B10A33).

The Treasury Bootstrap Conversion System allows users to convert SNX, cvxCRV, BAL, CRV or USDA into AMPH tokens directly.

When making a purchase the tokens are each given a CRV equivelency rate and applied to the same over time distribution curve as Amphora mining + a 30% pro-rated discount (so you will recieve 70% less tokens than if you had mined those tokens over time, but without having to wait).

The system will take a max of:<br />
-250,000 SNX_ADDRESS<br />
-1,000,000 cvxCRV<br />
-25,000 BAL<br />
-25,000 CRV<br />
-1,000,000 USDA<br />

After which it will be shut off, and only the future vAMPH and oAMPH rewards system will be available. It can also be shut off by governance at any time.

The assets from the bootstrap conversion system will be leveraged to create initial pool rewards for liquidity LPs without overly diluting $AMPH as rewards.

The tokens convert at fixed rates outlined below, with SNX and USDA both recieving a bonus of higher conversion values.

To make a purchase paste the address of the token you wish to use for purchasing in the `_token` field, and the amount in the `_amount` field and click the purchase button. You may be first asked to approve the token on the contract. Be sure to check the destination is 0x268d16fBbCe5cc427e4b26478141302B408CceF7.

<ContractRead
  address={TOKEN}
  abi={ABIs.ERC20}
  functionName="symbol"
  render={(res) => <h2>{res} Balances</h2>}
/>

<ContractRead
  address={TOKEN}
  abi={ABIs.ERC20}
  functionName="symbol"
  render={(amph) => (

<div>

<div className="stats shadow">
  <div className="stat place-items-center">
    <div className="stat-title">Your {amph}</div>
    <div className="stat-value">
      <TokenBalance token={TOKEN} address={userAddress} />
    </div>
  </div>
  <div className="stat place-items-center">
    <div className="stat-title">Your vAMPH</div>
    <div className="stat-value">0</div>
  </div>
  <div className="stat place-items-center">
    <div className="stat-title">Your oAMPH</div>
    <div className="stat-value">0</div>
  </div>
</div>

### Stats

SNX (0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F) converts at the rate of 7 CRV worth of AMPH per SNX.<br />
cvxCRV (0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7) converts at the rate of 0.68 CRV worth of AMPH per cvxCRV.<br />
BAL (0xba100000625a3754423978a60c9317c58a424e3D) converts at the rate of 7.2 CRV worth of AMPH per BAL.<br />
USDA (0xD842D9651F69cEBc0b2Cffc291fC3D3Fe7b5D226) converts at the rate of 2.31 CRV worth of AMPH per USDA.<br />
CRV (0xD533a949740bb3306d119CC777fa900bA034cd52) converts at the rate of 0.99 CRV worth of AMPH per CRV.<br />

### Deposit

<ContractWrite
  address={BUYER_POOL}
  abi={BUYER_POOL_ABI}
  functionName="purchaseAMPH"
  args={[TOKEN, 0, userAddress, 0]}
/>

Note, this system does not allow purchases of > than 1M AMPH in any one transaction in order to prevent math issues.<br />
It also does not allow more than 60% of all circulating AMPH tokens to have come from minting so that rich wallets may not perform a governance attack.<br />
To start this contract will have limited AMPH deposited and won't yet have minting authority to prevent risks. If the wallet has zero balance you may need to wait until it is refilled by governance.

<br />
<br />
The amount in the contract currently is:

{" "}
<div className="stat place-items-center">
  <div className="stat-title">Your {amph}</div>
  <div className="stat-value">
    <TokenBalance token={TOKEN} address={BUYER_POOL} />
  </div>
</div>

<div class="mt-10 alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>This horribly ugly app was built using FastDapp - you can contribute to improve it or look at bounties for adding new pages to the main site.</span>
  <div>
    <a href="https://docs.fastdapp.xyz/docs/templates/aave" class="btn btn-sm">Show the code</a>
    <a href="https://fastdapp.xyz/" class="btn btn-sm btn-primary">Build yours</a>
  </div>
</div>
</div>
        )
    }
/>

</div>
