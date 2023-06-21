---
sidebar_label: 'Passing arbitrary data in query URL parameters'
sidebar_position: 2
---

# Query Parameters

You can add any parameters in the url that renders a page `/editor?template=sablier&token=0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81&customMessage=hello`

You can then use the variables in your template:

```
<span> This values come from query parameters: {token} {customMessage} </span>
```
