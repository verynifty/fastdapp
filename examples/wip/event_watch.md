---
chain: 1
authors: grands_marquis
---

# This is the most basic example

You can see how the page is rendered.

<WatchEvents
  address="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  abi={{
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  }}
  eventName="Transfer"
  onReceivedLogs={function (logs) {
    console.log("HELLO LOGS", logs);
    for (const log of logs) {
      Toast.success(
        log.args.src + " sent " + parseInt(log.args.wad) / 10e18
      );
    }
  }}
/>
ddfhsdfsjdfshkkl
