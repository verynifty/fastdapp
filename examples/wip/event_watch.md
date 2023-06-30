---
chain: 1
authors: grands_marquis
---

# This is the most basic example

You can see how the page is rendered.

<WatchEvents
  address="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  abi={ABIs.ERC20}
  onReceivedLogs={function (logs) {
    console.log("HELLO LOGS", logs);
    for (const log of logs) {
      Toast.success(
        log.args.from + " sent " + (parseInt(log.args.value) / 10e8) + " to " + logs.args.to
      );
    }
  }}
/>
ddfhsdfsjdfshkkl
