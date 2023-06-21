---
chain: 1
authors: grands_marquis
---

<>{(() => { [counter, setCounter] = useState(1)})()}</>

<button class="btn" onClick={function() {
   setCounter(counter + 1);
}}>{counter}</button>