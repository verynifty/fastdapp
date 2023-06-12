import { useBalance } from 'wagmi'

import { default as React, useEffect, useRef } from 'react';

const Balance = (props) => {
    const [balance, setBalance] = React.useState(0);


    const { data, isError, isLoading } = useBalance({
        address: props.address,
    })

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
    return (
        <div>
            {data?.formatted} {data?.symbol}
        </div>
    )
}

export default Balance;