---
chain: 1
authors: grands_marquis
theme: dark
---

<>
  {(() => {
    REGISTRY = "0x02101dfB77FDE026414827Fdc604ddAF224F0921";
  })()}
</>

<div class="p-10">

# Latest account creations

<Events
  address={REGISTRY}
  abi={[
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "chainId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "tokenContract",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "salt",
          type: "uint256",
        },
      ],
      name: "AccountCreated",
      type: "event",
    },
  ]}
  eventName="AccountCreated"
  render={(logs) => (
    <div class="divide-y divide-gray-800">
      {logs
        .reverse()
        .slice(0, 20)
        .map((log) => (
          <APICall
            key={log.transactionHash + log.logIndex}
            url={
              "https://api.opensea.io/v2/chain/ethereum/contract/" +
              log.args.tokenContract +
              "/nfts/" +
              log.args.tokenId
            }
            params={{
              headers: {
                "x-api-key": "e4e7b08f1807492e91301de85728ce2e",
              },
            }}
            renderFunction={(res) => (
              <a
                href={
                  "https://tokenbound.org/assets/ethereum/" +
                  log.args.tokenContract +
                  "/" +
                  log.args.tokenId
                }
                target="_blank"
                className="flex justify-between gap-x-6 py-0 no-underline"
              >
                <div className="flex gap-x-4">
                  <img
                    className="h-10 w-10 p-0 m-0 mt-1 flex-none rounded-full bg-gray-800"
                    src={
                      res != null && res.nft != null
                        ? res.nft.image_url
                        : "unknown"
                    }
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <div className="text-sm font-semibold  text-white">
                      {res != null && res.nft != null
                        ? res.nft.name
                        : "unknown"}
                    </div>
                    <div className="mt-1 truncate text-xs  text-gray-400">
                      <a
                        href={"https://etherscan.io/tx/" + log.transactionHash}
                        target="_blank"
                      >
                        TX on Etherscan
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end mr-2">
                  <p className=" text-white 	">→</p>
                </div>
              </a>
            )}
          />
        ))}
    </div>
  )}
/>

 </div>
