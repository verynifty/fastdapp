---
chain: 1
authors: grands_marquis
---

<>{(() => { [TOKEN_ADDRESS, set] = useState("0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81")})()}</>

Token (changing the address here to another token will update the other components):
  <input type="text" placeholder="Type here" class="input input-bordered w-full mb-4" value={TOKEN_ADDRESS}
                                            onChange={e => set(e.target.value)} />
<TokenBalance 
    address={userAddress} token={TOKEN_ADDRESS}/>
