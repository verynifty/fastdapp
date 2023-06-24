---
chain: 1
authors: grands_marquis
theme: light
---

<div>{(() => {
    NOUNS="0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03";
  NOUNS_AUCTION = "0x830bd73e4184cef73443c15111a1df14e495c706";
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
      },
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
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
        "name": "winner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AuctionSettled",
    "type": "event"
  }];
})()}</div> 

<div>
<div class="p-10" style={{"background-color": "rgb(212,215,225)"}}>

## Current auction:

<ContractRead address={NOUNS_AUCTION}
abi={NOUNS_AUCTION_ABI}
functionName="auction"
returnValue={(res) => (
    <div>
    <img class="p-0 m-0" src={"https://noun.pics/" + res[0].toString() + ".svg"} />
  <center>
    <div class="stats shadow">
  
  <div class="stat place-items-center">
    <div class="stat-title">Noun</div>
    <div class="stat-value ">#{res[0].toString()}</div>
  </div>
  
  <div class="stat place-items-center">
    <div class="stat-title">Current bid</div>
    <div class="stat-value ">{parseInt(res[1]) == 0 ? 'None' : (parseInt(res[1])/1e18) + 'ETH'} </div>
  </div>
  
  <div class="stat place-items-center">
    <div class="stat-title">Current bidder</div>
    <div class="stat-value ">{parseInt(res[1]) == 0 ? 'None' :  <AddressDisplay address={res[4]} />}</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">Ends</div>
    <div class="stat-value "><Moment fromNow unix>{parseInt(res[3])}</Moment></div>
  </div>  
</div>
  <button class="btn btn-secondary mt-2">Go to auction</button>

  </center>
  </div>
)} />
</div>

## Last auctions
<Events 
address={NOUNS_AUCTION}
abi={NOUNS_AUCTION_ABI}
eventName="AuctionSettled"
render={
  ((logs) => (
     <div>
     {
     (logs.slice(-10)).reverse().map((log, index) => (
        <div key={log.transactionHash}>#{log.args.nounId.toString()} bought {parseInt(log.args.amount)/1e18}ETH by <AddressDisplay address={log.args.winner} /></div>
      )
      )
     }
     </div>
  ))
}
/>

## Bids
<Events 
address={NOUNS_AUCTION}
abi={NOUNS_AUCTION_ABI}
eventName="AuctionBid"
args={{ nounId: 353 }}
render={
  ((logs) => (
     <div>
     {
      logs.reverse().map((log) => (
        <div key={log.transactionHash}><AddressDisplay address={log.args.sender} /> made a bid  of <strong>{parseInt(log.args['value']) / 1e18} ETH</strong> at block {log.blockNumber.toString()}</div>
  )
)
     }
     </div>
  ))
}
/>

</div>