---
chain: [1]
authors: grands_marquis
---

<div class="p-10">
{(() => {
    AMPH = "0x943c5F4F54509d1e78B1fCD93B92c43ce83d3141";
    BUYER_POOL = "0x268d16fBbCe5cc427e4b26478141302B408CceF7";
    TOKENS = [
      {
        symbol: "SNX",
        address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
        rate: "7"
      },
      {
        symbol: "cvxCRV",
        address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
        rate: "0.68"
      },
      {
        symbol: "BAL",
        address: "0xba100000625a3754423978a60c9317c58a424e3D",
        rate: "7.2"
      },
      {
        symbol: "CRV",
        address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
        rate: "0.99"
      },
      {
        symbol: "USDA",
        address: "0xD842D9651F69cEBc0b2Cffc291fC3D3Fe7b5D226",
        rate: "2.31"
      }
    ];
})()}

<h1>Treasury Bootstrap Conversion System</h1>

The following page is for the <a href="https://amphorafinance.com/" target="_blank" >Amphora Protocol</a> treasury bootstrap conversion system located at <AddressDisplay address="0x268d16fBbCe5cc427e4b26478141302B408CceF7"/> and deployed by <AddressDisplay address="0xe35aadB1C84D9804dAaC0aE6e5433E1890B10A33" />.

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

<h1>Convert your tokens to AMPH</h1>

You own: <TokenBalance token={TOKEN} address={userAddress} />

<>
  {TOKENS.map((token, i) => {
    return (
      <div>
        <h2> {token.symbol} </h2>
        <p>
          {token.symbol} ({token.address}) converts at the rate of {token.rate}{" "}
          CRV worth of AMPH per {token.symbol}.
        </p>
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
                  hidden: true,
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                  token: token.address,
                  ERC20Allow: BUYER_POOL,
                },
              ],
              name: "purchaseAMPH",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ]}
          args={[token.address, 0]}
        />
      </div>
    );
  })}
</>

</div>
