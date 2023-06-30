---
chain: 1
authors: grands_marquis
---

# Contract read examples

<>
  {(() => {
    REGISTRY = "0x02101dfB77FDE026414827Fdc604ddAF224F0921";
  })()}
</>

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
    <li class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {logs
        .reverse()
        .slice(0, 20)
        .map((log) => (
            <APICall
            key={log.transactionHash + log.logIndex}
              url={
                "https://api.opensea.io/v2/chain/ethereum/contract/" + log.args.tokenContract + "/nfts/" +
                log.args.tokenId
              }
              params={{
                headers: {
                  "x-api-key": "e4e7b08f1807492e91301de85728ce2e",
                },
              }}
              renderFunction={(res) => (
                <li
                  className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                  <div className="flex flex-1 flex-col p-8">
                    <img
                      className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                      src={res.nft != null ? res.nft.image_url : "unknown"}
                      alt=""
                    />
                    <h3 className="mt-6 text-sm font-medium text-gray-900">
                      {res.nft != null ? res.nft.name : "unknown"}
                    </h3>
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-sm text-gray-500">{res.nft != null ? res.nft.name : "unknown"}</dd>
                      <dt className="sr-only">Role</dt>
                      <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          name
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="flex w-0 flex-1">
                        <a
                         
                          className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <EnvelopeIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Email
                        </a>
                      </div>
                      <div className="-ml-px flex w-0 flex-1">
                        <a
                          className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <PhoneIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            />
        ))}
    </li>
  )}
/>
