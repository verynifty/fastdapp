<Events 
address="0x830bd73e4184cef73443c15111a1df14e495c706"
abi={[{
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
  }]}
eventName="AuctionBid"
render={
  ((logs) => (
     <div>hello {logs.length}
     {
      logs.map((log) => (
        <div>bbbb {log.args['nounId'].toString()}</div>
  )
)
     }
     </div>
  ))
}
>

</Events>