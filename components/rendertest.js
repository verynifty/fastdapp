import { default as React, useState, useRef, useEffect, Suspense } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'


import DisplayVariable from 'components/render/displayVariable';
import BlockNumber from 'components/render/blockNumber';
import SendTransaction from 'components/render/sendTransaction';
import Balance from 'components/render/balance';
import TokenBalance from 'components/render/tokenBalance';

import { readContract, getAccount } from '@wagmi/core'

const components = { "DisplayVariable": DisplayVariable, "BlockNumber": BlockNumber, "Balance": Balance, "TokenBalance": TokenBalance, "SendTransaction": SendTransaction }
const scope = { "useState": useState, value: 55, readContract: readContract, getAccount: getAccount };

const Render = (props) => {
    const [content, setContent] = React.useState();


    // This will run only once
    useEffect(() => {
        async function compile() {
              /*
            const source =
                'Some **mdx** text, with a component using a scope variable <Test product={product} />'
            const mdxSource = await serialize(source)
            console.log(mdxSource)
            setContent(mdxSource)
*/
          
            const a = await compileMDX({
                source: props.content,
                components: components,
                scope: scope,

                options: {
                     mdxOptions: {
                    development: true,
                  } },
              })
              console.log(a)
              setContent(a.content)
              
        }
        compile();
    }, []);


    return (
        <span>
            Helll
            {content}
        </span >
    );
}

export default Render;