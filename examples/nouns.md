---
chain: 1
authors: grands_marquis
theme: light
---

<div>
  {(() => {
    NOUNS_AUCTION = "0x830bd73e4184cef73443c15111a1df14e495c706";
    NOUNS_AUCTION_ABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "nounId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "extended",
            type: "bool",
          },
        ],
        name: "AuctionBid",
        type: "event",
      },
      {
        inputs: [],
        name: "auction",
        outputs: [
          {
            internalType: "uint256",
            name: "nounId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "bool",
            name: "settled",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "nounId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "AuctionSettled",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "nounId",
            type: "uint256",
            hidden: true,
          },
        ],
        name: "createBid",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
    ];
  })()}
</div>{" "}

<div>
<div class="p-10" style={{"background-color": "rgb(212,215,225)"}}>

# One Noun, Every Day, Forever.

<ContractRead address={NOUNS_AUCTION}
abi={NOUNS_AUCTION_ABI}
functionName="auction"
returnValue={(res) => (
    <div>
<img class="p-0 m-0" src={"https://noun.pics/" + res[0].toString() + ".svg"} />

  <center>
  <div class="stats shadow w-full">
  <div class="stat place-items-center">
    <div class="stat-title">Noun</div>
    <div class="stat-value ">#{res[0].toString()}</div>
  </div>
  <div class="stat place-items-center">
    <div class="stat-title">Current bid</div>
    <div class="stat-value ">{parseInt(res[1]) == 0 ? 'None' : (parseInt(res[1])/1e18) + 'ETH'} </div>
  </div>
  <div class="stat place-items-center">
    <div class="stat-title">Current winner</div>
    <div class="stat-value ">{parseInt(res[1]) == 0 ? 'None' :  <AddressDisplay address={res[4]} />}</div>
  </div>
  <div class="stat place-items-center">
    <div class="stat-title">Ends</div>
    <div class="stat-value "><Moment fromNow unix>{parseInt(res[3])}</Moment></div>
  </div>  
</div>

<button
  className="btn btn-primary mt-4"
  onClick={() => window.my_modal_2.showModal()}
>
  Make a bid
</button>
<dialog id="my_modal_2" className="modal">
  <form method="dialog" className="modal-box">
    <h3 className="font-bold text-lg">
      Make your bid for #{res[0].toString()}
    </h3>
    <ContractWrite
      address={NOUNS_AUCTION}
      abi={NOUNS_AUCTION_ABI}
      functionName="createBid"
      args={[res[0].toString()]}
      valueAmount={parseInt(res[1]) / 1e18 + 0.1}
      valueFieldName="Bid amount (ETH)"
      buttonText="Bid"
    />
  </form>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<button
  className="btn btn-primary mt-4 ml-2"
  onClick={() => window.my_modal_3.showModal()}
>
  See bids
</button>
<dialog id="my_modal_3" className="modal">
  <form method="dialog" className="modal-box">
    <h3 className="font-bold text-lg">Bids for #{res[0].toString()}</h3>
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
  </form>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
  </center>
  </div>
)} />
</div>

<div class="m-5">

## Last auctions

<Events 
address={NOUNS_AUCTION}
abi={NOUNS_AUCTION_ABI}
eventName="AuctionSettled"
render={
  ((logs) => (
     <div>
     {
     (logs.slice(-15)).reverse().map((log, index) => (
        <div key={log.transactionHash}><a target="_blank" href={"https://nouns.wtf/noun/" + log.args.nounId.toString()}>#{log.args.nounId.toString()}</a> bought {parseInt(log.args.amount)/1e18}ETH by <AddressDisplay address={log.args.winner} /></div>
      )
      )
     }
     </div>
  ))
}
/>
</div>
<div class="alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>This app was built in less than 250 Lines of code</span>
  <div>
    <a href="https://builddocs.musedao.io/docs/templates/nouns" class="btn btn-sm">Show the code</a>
    <a href="https://build.musedao.io/" class="btn btn-sm btn-primary">Build yours</a>
  </div>
</div>
</div>

