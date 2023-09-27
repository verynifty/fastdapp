---
chain: [11155111]
authors: grands_marquis
---

<div class="p-10">
{(() => {
    TOKEN = "0x90b8ff52b4dc225acf5c9a2409f92d1e062f39f3";
    CONTRACT = "0x90b8ff52b4dc225acf5c9a2409f92d1e062f39f3";
    SPENDER = "0x4b5922abf25858d012d12bb1184e5d3d0b6d6be4";
})()}

<div>

<ContractWrite 
address={TOKEN}
abi={ABIs.ERC20}  
functionName="transfer" 
args={[userAddress, 1]}
ERC20Approvals={{
    token: TOKEN,
    spender: SPENDER
}}
 />
</div>
</div>
