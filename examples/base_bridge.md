---
chain: 1
authors: grands_marquis
theme: dark
---

<div class="p-10">

# Bridge ETH to Base

You can bridge ETH from Ethereum to Base by sending ETH using this webapp. You'll send ETH to the bridge smart contract, wait a few minutes and will see your ETH appear on Base Scan.

<div className="alert alert-warning">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
  <span>
    Caution: Bridging ETH with the portal proxy contract is for developers:
    <ul>
      <li>
        Do not send any asset other than ETH. The proxy contract only supports
        receipt of ETH and sending any other asset will result in unrecoverable
        loss of the asset.
      </li>
      <li>
        Do not send ETH from any network other than Ethereum mainnet. The proxy
        contract only supports from Ethereum mainnet and sending from any other
        network or chain (e.g. another EVM-compatible chain or L2) will result
        in unrecoverable loss of the asset.
      </li>
      <li>
        {" "}
        Do not send ETH from an exchange. The portal proxy contract bridges to the
        address where ETH is sent from, so if sent from an exchange, for example,
        ETH will be bridged back to the exchange, which could result in unrecoverable
        loss of the asset.
      </li>
    </ul>
  </span>
</div>

## 1. Bridge your ETH

<SendTransaction
  hideRecipient={true}
  buttonText="Bridge to base"
  to="0x49048044D57e1C92A77f79988d21Fa8fAF74E97e"
/>

## 2. See your address on Base Scan

<PleaseConnect>
<a class="btn" href={"https://basescan.org/address/" + userAddress}>Go to explorer</a>
</PleaseConnect>

## Learn more

- [Base website](https://base.org/)
- [Official bridge documentation](https://docs.base.org/tools/bridges/)

</div>