---
chain: 1
authors: grands_marquis
---

<>
  {(() => {
    // We define variables we will use across our apps
    contractAddress = "__CONTRACT_ADDRESS__";
    collectionBanner = "__COLLECTION_BANNER__";
    collectionImage = "__COLLECTION_IMAGE__";
    collectionName = "__COLLECTION_NAME__";
  })()}
</>
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
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {collectionName}
          </h1>
        </div>
        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        { "__DISCORD_LINK__" != "" ?
          <a
            href="__DISCORD_LINK__"
            className="inline-flex "
          >
            <img class="w-6 h-6" src="https://static-00.iconduck.com/assets.00/discord-icon-2048x2048-kva2hfax.png" />
          </a>
          : <div></div>
          }
          { "__TWITTER__" != "" ?
           <a
            href="https://twitter.com/__TWITTER__"
            className="inline-flex "
          >
            <img class="w-6 h-6" src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-7o66iwws.png" />
          </a>
          : <div></div>
          }
           { "__URL__" != "" ?
           <a
            href="__URL__"
            className="inline-flex "
          >
            <img class="w-6 h-6" src="https://static-00.iconduck.com/assets.00/link-circle-icon-512x512-ybphzgij.png" />
          </a>
          : <div></div>
          }
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
<p class="p-5">
__COLLECTION_DESCRIPTION__
</p>

<div>
 { "__TWITTER__" != "" ?
<a class="twitter-timeline" href="https://twitter.com/__TWITTER__?ref_src=twsrc%5Etfw">Tweets by __TWITTER__</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
: <div></div>
 }
</div>