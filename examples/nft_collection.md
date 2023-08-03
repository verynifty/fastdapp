---
chain: 1
authors: grands_marquis
theme: light
title: "__COLLECTION_NAME__"
description: Learn about the __COLLECTION_NAME__ NFT collection.
---

<!-- If the data are missing, make sure you filled all the informations of your collection on OpenSea -->

<>
  {(() => {
    // We define variables we will use across our apps
    contractAddress = "__CONTRACT_ADDRESS__";
    collectionBanner = "__COLLECTION_BANNER__";
    collectionImage = "__COLLECTION_IMAGE__";
    collectionName = "__COLLECTION_NAME__";
  })()}
</>

<!-- Header -->

<div>
  <div>
    <img
      className="h-32 m-0 w-full object-cover lg:h-48"
      src={collectionBanner}
      alt=""
    />
  </div>
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
      <div className="flex">
        <img
          className="h-24 w-24 m-0 p-0 rounded-full  sm:h-32 sm:w-32"
          src={collectionImage}
          alt=""
        />
      </div>
      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
          <h1 className="truncate text-2xl font-bold text-primary">{collectionName}</h1>
        </div>
        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          {"__DISCORD_LINK__" != "" ? (
            <a href="__DISCORD_LINK__" className="inline-flex ">
              <img
                class="w-6 h-6"
                src="https://static-00.iconduck.com/assets.00/discord-icon-2048x2048-kva2hfax.png"
              />
            </a>
          ) : (
            <div></div>
          )}
          {"__TWITTER__" != "" ? (
            <a href="https://twitter.com/__TWITTER__" className="inline-flex ">
              <img
                class="w-6 h-6"
                src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-7o66iwws.png"
              />
            </a>
          ) : (
            <div></div>
          )}
          {"__URL__" != "" ? (
            <a href="__URL__" className="inline-flex ">
              <img
                class="w-6 h-6"
                src="https://static-00.iconduck.com/assets.00/link-circle-icon-512x512-ybphzgij.png"
              />
            </a>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
    <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
      <h1 className="truncate text-2xl font-bold text-gray-900">
        {collectionName}
      </h1>
    </div>
  </div>
</div>
<div class="container mx-auto px-4">

<!-- Description -->

<p >__COLLECTION_DESCRIPTION__</p>

<!-- Informations -->

# Informations

<APICall
  url="https://api.reservoir.tools/collections/v5?id=__CONTRACT_ADDRESS__"
  params={{
    headers: {
      "x-api-key": "demo-api-key",
    },
  }}
  renderFunction={(res) => (
    <center class="mb-5">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Owners</div>
          <div className="stat-value text-primary">
            {res.collections[0].ownerCount}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Supply</div>
          <div className="stat-value text-primary">
            {res.collections[0].tokenCount}
          </div>
        </div>
        {res.collections[0].floorAsk != null ? (
          <div className="stat">
            <div className="stat-title">Price</div>
            <div className="stat-value text-primary">
              {res.collections[0].floorAsk.price.amount.native} ETH
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </center>
  )}
/>

<!-- User's NFTs -->

# Your collection

<!-- We need the user to be connected to retrieve his assets -->

<PleaseConnect>
  <APICall
    url={
      "https://api.opensea.io/api/v1/assets/?owner=" +
      userAddress +
      "&asset_contract_address=__CONTRACT_ADDRESS__"
    }
    params={{
      headers: {
        "x-api-key": "e4e7b08f1807492e91301de85728ce2e",
      },
    }}
    renderFunction={(res) => (
      <div class="mb-4">
        {res.assets.length > 0 ? (
          <div class="mx-auto mb-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {res.assets.map((nft) => (
              <div
                key={nft.id}
                class="col-span-1 flex flex-col divide-y divide-base rounded-lg text-center shadow"
              >
                <img
                  className="m-0 p-0 aspect-[3/2] w-full object-cover"
                  src={nft.image_url}
                  alt=""
                />
                <div>{nft.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <center>
            <div class="my-5">You don't own any {collectionName} yet.</div>
          </center>
        )}
      </div>
    )}
  />
</PleaseConnect>

# Get one

<center>
  <ReservoirSweep
    collectionAddress="__CONTRACT_ADDRESS__"
    buttonText="Buy on Reservoir"
  />
  <div class="mt-2">
    <a
      target="_blank"
      class="btn btn-outline btn-primary"
      href="https://pro.opensea.io/collection/__COLLECTION_SLUG__"
    >
      Buy on Opensea Pro
    </a>
  </div>
</center>
</div>
