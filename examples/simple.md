---
chain: 1
authors: grands_marquis
---

# Hello and welcome to Fastdapp

What you see on the right is our application code. On the left is the preview you can update by clicking the render button.

## Formatting and interactivity

You can use Markdown to format your app. But you can also use some HTML, CSS and even Tailwind!

<>
  {(() => {
    // You can declare reactive variables
    [counter, setCounter] = useState(1);
  })()}
</>

<div class="join">
  <button class="btn join-item btn-neutral">My counter = {counter}</button>
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

## You can easily read the chain

Your address is <AddressDisplay address={userAddress} /> and your balance is <Balance address={userAddress} />.

You can also get more interesting data like the current supply of DAI

<ContractRead
  address="0x6b175474e89094c44da98b954eedeac495271d0f"
  abi={ABIs.ERC20}
  functionName="totalSupply"
  render={(supply) => parseInt(supply) / 10e18 + " DAI"}
/>

## And interact with the chain

For example mint an NFT:

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

And handle some parameters for example to transfer some DAI:

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


## Dive deeper

You can read the [docs](https://docs.fastdapp.xyz/docs/intro), check the [examples](https://docs.fastdapp.xyz/docs/category/templates).


More examples:
- [Contract write](https://fastdapp.xyz/editor?template=contract_write)
- [Contract Read](https://fastdapp.xyz/editor?template=contract_read)
- [some pre-built Templates](https://docs.fastdapp.xyz/docs/category/templates)
