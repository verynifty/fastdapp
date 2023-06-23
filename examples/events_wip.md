
<div>{(() => {
  NOUNS_AUCTION = "0x830bd73e4184cef73443c15111a1df14e495c706"
  NOUNS_AUCTION_ABI = [{
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nounId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "extended",
        "type": "bool"
      }
    ],
    "name": "AuctionBid",
    "type": "event"
  },
  {
    "inputs": [
      
    ],
    "name": "auction",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "nounId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "bidder",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "settled",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
})()}</div> 

## Bids
<Events 
address="0x830bd73e4184cef73443c15111a1df14e495c706"
abi={NOUNS_AUCTION_ABI}
eventName="AuctionBid"
render={
  ((logs) => (
     <div>
     {
      logs.reverse().map((log) => (
        <div key={log.transactionHash}><AddressDisplay address={log.args.sender} /> made a bid  of {parseInt(log.args['value']) / 1e18} ETH at block {log.blockNumber.toString()}</div>
  )
)
     }
     </div>
  ))
}
>

</Events>