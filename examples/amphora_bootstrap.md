---
chain: [1]
authors: grands_marquis
---

<div>
{(() => {
    AMPH = "0x943c5F4F54509d1e78B1fCD93B92c43ce83d3141";
    BUYER_POOL = "0x268d16fBbCe5cc427e4b26478141302B408CceF7";
    BUYER_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AMPH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BAL_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CRV_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SNX_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDA_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aggregators","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amphClaimer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cvxCRV_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"getCRVEquivalent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"purchaseAMPH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_aggregator","type":"address"}],"name":"setAggregators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_bool","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    TOKENS = [
      {
        symbol: "SNX",
        address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F"
      },
      {
        symbol: "cvxCRV",
        address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F"
      },
      {
        symbol: "BAL",
        address: "0xba100000625a3754423978a60c9317c58a424e3D"
      },
      {
        symbol: "CRV",
        address: "0xD533a949740bb3306d119CC777fa900bA034cd52"
      },
      {
        symbol: "USDA",
        address: "0xD842D9651F69cEBc0b2Cffc291fC3D3Fe7b5D226"
      }
    ];
})()}

<h1>Treasury Bootstrap Conversion System</h1>

The following page is for the Amphora Protocol treasury bootstrap conversion system located at 0x268d16fBbCe5cc427e4b26478141302B408CceF7 and deployed by the Amphora Deployer (0xe35aadB1C84D9804dAaC0aE6e5433E1890B10A33).

The Treasury Bootstrap Conversion System allows users to convert SNX, cvxCRV, BAL, CRV or USDA into AMPH tokens directly.

When making a purchase the tokens are each given a CRV equivelency rate and applied to the same over time distribution curve as Amphora mining + a 30% pro-rated discount (so you will recieve 70% less tokens than if you had mined those tokens over time, but without having to wait).

The system will take a max of:

- 250,000 SNX<br />
- 1,000,000 cvxCRV<br />
- 25,000 BAL<br />
- 25,000 CRV<br />
- 1,000,000 USDA<br />

After which it will be shut off, and only the future vAMPH and oAMPH rewards system will be available. It can also be shut off by governance at any time.

The assets from the bootstrap conversion system will be leveraged to create initial pool rewards for liquidity LPs without overly diluting $AMPH as rewards.

The tokens convert at fixed rates outlined below, with SNX and USDA both recieving a bonus of higher conversion values.

To make a purchase paste the address of the token you wish to use for purchasing in the `_token` field, and the amount in the `_amount` field and click the purchase button. You may be first asked to approve the token on the contract. Be sure to check the destination is 0x268d16fBbCe5cc427e4b26478141302B408CceF7.

<>
  {TOKENS.map((token, i) => {
    return (
      <div>
        <h2> {token.symbol} </h2>
        <ContractWrite
          buttonText={"Get AMPH with " + token.symbol}
          address={BUYER_POOL}
          abi={[
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                  hidden: true
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                  token: token.address,
                  ERC20Allow: BUYER_POOL
                },
              ],
              name: "purchaseAMPH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ]}
        />
      </div>
    );
})}
</>

</div>
