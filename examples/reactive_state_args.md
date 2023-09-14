---
chain: [1]
authors: grands_marquis
---

<div class="p-10">
{(() => {
    AMPH = "0x943c5F4F54509d1e78B1fCD93B92c43ce83d3141";
    BUYER_POOL = "0x268d16fBbCe5cc427e4b26478141302B408CceF7";
    [counter, setCounter] = useState(69);
    [to, setTo] = useState("0x268d16fBbCe5cc427e4b26478141302B408CceF7");
})()}

<div>
{counter}

{" "}

<button
  class="btn join-item bg-red-500"
  onClick={() => setCounter(counter - 1)}
>
  Decrease
</button>

<button class="btn join-item bg-red-500" onClick={() => setArgs(["", counter])}>
  Decrease
</button>

<ContractWrite 
address={AMPH}
abi={[{
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256",
                hidden:true
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }]}  functionName="transfer" args={[userAddress, counter]} />
</div>
</div>
