---
chain: 1
authors: grands_marquis
---

<div class="p-5 bg-base-200">

# ⚡ Hello and welcome to Fast Dapp ⚡

Fast Dapp is an open source and free platform for developers of any level to build frontend for their dapps super fast. Build your apps on the webapp, no installation or configuration required. Building your apps is as simple as, using simple and battle tested components, styling it with HTML/CSS, Tailwind and sharing it with your users!

What you see on the right is our application code. On the left is the preview you can update by clicking the render button.

## Formatting and interactivity

You can use Markdown to format your app. But you can also use some HTML, CSS and even Tailwind!

<>
  {(() => {
    // You can declare reactive variables
    [counter, setCounter] = useState(69);
  })()}
</>
<div class="mockup-window border border-base-400 bg-base-300 m-5">
  <div class="px-4 py-16 bg-base-100">
    <div class="join">
      <button class="btn join-item cursor-default">
        My counter = {counter}
      </button>
      <button
        class="btn join-item bg-red-500"
        onClick={() => setCounter(counter - 1)}
      >
        Decrease
      </button>
      <button
        class="btn join-item bg-green-500"
        onClick={() => setCounter(counter + 1)}
      >
        Increase
      </button>
    </div>
  </div>
</div>

## You can easily read the chain

<div class="mockup-window border  m-5 border-base-400 bg-base-300">
  <div class="px-4 py-16 bg-base-100">
    Your address is <AddressDisplay address={userAddress} /> and your balance is{" "}
    <Balance address={userAddress} />.
    <ContractRead
      address="0x6b175474e89094c44da98b954eedeac495271d0f"
      abi={ABIs.ERC20}
      functionName="totalSupply"
      render={(supply) =>
        "You can also get more interesting data like the current supply of DAI: " +
        parseInt(supply) / 10e18 +
        " DAI"
      }
    />
  </div>
</div>

## And interact with the chain

For example mint an NFT:

<div class="mockup-window border   m-5 border-base-400 bg-base-300">
  <div class="px-4 py-16 bg-base-100">
    <ContractWrite
      address={"0x3dbb10bde369a8272f7106d88c510829af49c813"}
      abi={[
        {
          inputs: [],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ]}
      functionName="mint"
      buttonText="Mint an NFT"
    />
  </div>
</div>

And handle some parameters for example to transfer some DAI:

<div class="mockup-window border  m-5 border-base-400 bg-base-300">
  <div class="px-4 py-16 bg-base-100">
    <ContractWrite
      address="0x6b175474e89094c44da98b954eedeac495271d0f"
      abi={[
        {
          constant: false,
          inputs: [
            {
              name: "To",
              type: "address",
            },
            {
              name: "Amount",
              type: "uint256",
              token: "0x6b175474e89094c44da98b954eedeac495271d0f",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ]}
      functionName="transfer"
      args={["0xC618b905f7b41c7D53C23474322D7D3297730419", 1]}
    />
  </div>
</div>

## Dive deeper

You can read the [docs](https://docs.fastdapp.xyz/docs/intro), check the [examples](https://docs.fastdapp.xyz/docs/category/templates).

More examples:

- [Contract write](https://fastdapp.xyz/editor?template=contract_write)
- [Contract Read](https://fastdapp.xyz/editor?template=contract_read)
- [some pre-built Templates](https://docs.fastdapp.xyz/docs/category/templates)

</div>
