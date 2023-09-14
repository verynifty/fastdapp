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
    [args, setArgs] = useState(["", 69]);
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

<ContractWrite abi={ABIs.ERC20}  functionName="transfer" args={args} />
</div>
</div>
