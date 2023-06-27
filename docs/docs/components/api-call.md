---
sidebar_label: 'APICall'
sidebar_position: 4
---

# APICall

Get some data from an external API.

## Props

* `url`
* `params` ([axios request config](https://axios-http.com/docs/req_config))
* `renderFunction`

## Example


```
<APICall url="https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
renderFunction={
    (res) => (
        <div>The price of ETH is: ${res.USD}</div>
    )
}
 />
```

