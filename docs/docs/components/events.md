---
sidebar_label: 'Events'
sidebar_position: 4
---

# Events

Retrieve events from a smart contract and display them.

Properties:
* `address`
* `abi`
* `eventName`
* `args` optional
* `fromBlock` optional (default to 0)
* `toBlock` optional (default to latest)

For convenience the properties are same as the [viem/wagmi libraries](https://viem.sh/docs/actions/public/getLogs.html).

## Example

This example display Nouns previous auctions.

```
<Events
      address={NOUNS_AUCTION}
      abi={NOUNS_AUCTION_ABI}
      eventName="AuctionBid"
      args={{ nounId: res[0].toString() }}
      render={(logs) => (
        <div>
          {logs.reverse().map((log) => (
            <div key={log.transactionHash}>
              <AddressDisplay address={log.args.sender} /> made a bid of{" "}
              <strong>{parseInt(log.args["value"]) / 1e18} ETH</strong> at block{" "}
              {log.blockNumber.toString()}
            </div>
          ))}
        </div>
      )}
    />
```

## Full example

* [Nouns auction page](https://fastdapp.xyz/editor?template=nouns)

