---
chain: [11155111]
authors: grands_marquis
---

<div class="p-10">
{(() => {
    TOKEN = "0x90b8ff52b4dc225acf5c9a2409f92d1e062f39f3";
    CONTRACT = "0x90b8ff52b4dc225acf5c9a2409f92d1e062f39f3";
})()}

<div>

<ContractWrite 
address={TOKEN}
abi={ABIs.ERC20}  functionName="transfer" args={[userAddress, 1]} />
</div>
</div>
