---
chain: 8453
authors: J. Valeska
theme: synthwave
---

<div class="p-5 bg-purple-900">
  <h2 class="w-full text-center text-white text-4xl"> ⚡ Dropper ⚡ </h2>
  <h4 class="w-full text-center text-gray-300 text-2xl mb-12">Airdrop zora nfts fast and easy.</h4>
  
  <>
    {(() => {
      //nft='0xd22fdb0fb70911b784851a5dccaae8b04bed551a'
      //erc=''
      [erc, setErc] = useState(typeof erc !== "undefined" ? erc : "");
      [nft, setNft] = useState(typeof nft !== "undefined" ? nft : "");
    })()}
  </>

  { (!erc || !nft) && (
    <p class="w-full text-center  font-semibold">
      <b>Welcome to Dropper ⚡</b>
      <br></br>
      Please, check the <b>usage</b> section and try again with the right <b>URL</b> 💜 
    </p>
  )}

  { erc === '721' && <h3 class="text-gray-100 text-xl pl-8 max-w-[800px] mx-auto">Airdrop Zora 721 NFT:</h3> } 
  { erc === '1155' && <h3 class="text-gray-100 text-xl pl-8 max-w-[800px] mx-auto">Airdrop Zora 1155 NFT:</h3> }

  { erc === '721' && (
    
  <div class="mockup-window border  m-5 text-purple-800 border-purple-400 bg-purple-300 max-w-[800px] mx-auto">
    <div class="px-4 py-8 bg-purple-800 text-purple-300">
      <ContractWrite
        address={nft}
        abi={[
          {
            inputs: [
              {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "quantity",
                  "type": "uint256"
              }           
            ],
            name: "adminMint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ]}
        functionName="adminMint"
        args={[
          "0x25395f8D690B9cCe3caD06499133b484E5E93163",
          1
        ]}
        buttonText="Airdrop"
      />
    </div>
  </div>
  )}

  { erc === '1155' && (

  <div class="mockup-window border  m-5 text-purple-800 border-purple-400 bg-purple-300 max-w-[800px] mx-auto">
    <div class="px-4 py-8 bg-purple-800 text-purple-300">
      <ContractWrite
        address={nft}
        abi={[
          {
            inputs: [
              {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "quantity",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
              }            
            ],
            name: "adminMint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ]}
        functionName="adminMint"
        args={[
          "0x25395f8D690B9cCe3caD06499133b484E5E93163",
          1,
          1,
          "0x42"
        ]}
        buttonText="Airdrop"
      />
    </div>
  </div>
  )}

  <div class="max-w-[800px] flex flex-col mx-auto">
    <h3 class="text-gray-200 text-lg pl-7 text-start">Usage:</h3>
    <div class="mockup-window border-base-400 bg-base-300 mx-auto max-w-[777px]">
      <p class="w-full text-center text-purple-500 font-semibold px-16">
        Add <u>?nft=nftAddress&erc=721</u> to the URL, fill the required parameters and transact.
      </p>
    </div>
  </div>

  <div class="max-w-[800px] flex flex-col mx-auto">
    <h3 class="text-gray-200 text-lg pl-7 text-start">Example:</h3>
    <div class="mockup-window border-base-400 bg-base-300 mx-auto max-w-[777px]">
      <p class="w-full text-center text-purple-500 font-semibold px-8">
        https://fastdapp.xyz/app/zora_dropper?nft=0xd22fdb0fb70911b784<wbr></wbr>851a5dccaae8b04bed551a<wbr></wbr>&erc=721
      </p>
    </div>
  </div>

  <footer class="text-center pt-32">
    <a 
      class="text-purple-200 no-underline"
      href="https://warpcast.com/j-valeska" 
      rel="noopener noreferrer" 
      target="_blank"
    >
      Made with 💜 by J. Valeska
    </a>
  </footer>
</div>

