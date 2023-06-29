---
chain: 1
authors: grands_marquis
theme: dark
title: Reservoir Sweep and API
---

<div class="p-4">

# Reservoir Sweep and API

A demo using **APICall** and **ReservoirSweep** to list Popular NFT collections and display a one click buy button.

<APICall
  url="https://api.reservoir.tools/collections/v5"
  params={{
    headers: {
      "x-api-key": "demo-api-key",
    },
  }}
  renderFunction={(collections) => (
    <div class="grid grid-flow-row gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {collections.collections.map((collection) => (
        <div
          key={collection.id}
          class="card w-full p-4  bg-base-100 shadow-xl image-full"
        >
          <figure class="h-full w-full m-0 p-0">
            <img
              class="h-full w-full object-contains"
              src={collection.banner}
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-white">{collection.name}</h2>
            <p>
              {collection.description != null
                ? collection.description.substring(0, 150) + "..."
                : ""}
            </p>
            <div class="card-actions justify-end">
              <ReservoirSweep
                collectionAddress={collection.id}
                buttonText={"Buy a " + collection.name}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
/>

</div>
