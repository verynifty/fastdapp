---
chain: 1
authors: grands_marquis
---

# Events live notification

You'll see the USDC transfer events appearing on the page.

<WatchEvents
  address="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  abi={ABIs.ERC20}
  eventName="Transfer"
  onReceivedLogs={async function (logs) {
    function formatAddress(address) {
      return (
        address.substring(0, 6) +
        "..." +
        address.substring(address.length - 4, address.length)
      );
    }
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    console.log("Received logs", logs);
    for (const log of logs) {
      await sleep(400);
      Toast.success(
        formatAddress(log.args.from) +
          " sent " +
          parseInt(log.args.value) / 10e8 +
          " to " +
          formatAddress(log.args.to),
        {
          position: "bottom-left",
        }
      );
    }
  }}
/>
