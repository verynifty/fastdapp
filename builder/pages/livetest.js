import BN from 'components/bn';

import { watchAccount, getAccount } from '@wagmi/core'
import { default as React, useEffect, useRef } from 'react';


import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";





export default function TestPage({ source }) {

    const [account, setAccount] = React.useState(null);
    const unwatch = watchAccount((_account) => setAccount(_account))


    const scope = { BN, account, getAccount };

    const code = `
    () => {
        const [likes, increaseLikes] = React.useState(0);
      
        return (
          <>
            <p>{{likes} likes}</p>
            <button onClick={() => increaseLikes(likes + 1)}>Like</button>
          </>
        );
      };
    `
    return (
        <div className="wrapper">
            <LiveProvider code={code} scope={scope}>
                <LiveEditor />
                <LiveError />
                <LivePreview />
            </LiveProvider>
        </div>
    )
}