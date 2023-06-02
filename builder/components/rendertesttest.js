import { default as React, useState, useRef, useEffect, Suspense } from 'react';
import { MDXProvider } from "@mdx-js/react"
import { MDXRemote } from 'next-mdx-remote'

import { compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'

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
    const [loaded, setLoaded] = React.useState();


     async function getStaticProps() {
        // MDX text - can be from a local file, database, anywhere
        const source = 'Some **mdx** text, with a component <Test />'
        const mdxSource = await serialize(source)
        return { props: { source: mdxSource } }
      }
    

    // This will run only once
    useEffect(() => {
        async function compile() {
            const a = await compileMDX({
                source: props.content,
                components: components,
                scope: scope,
                value:55,
                options: {
                     mdxOptions: {
                    development: true,
                  } },
              })
              console.log(a)
              setContent(a.content)
              setLoaded(true)
              console.log("LOADED")
        }
        compile();
    }, []);

    function renderit() {
        if (loaded) {
            return (
                <MDXRemote value={55} {...source} scope={scope} components={components}>{content}</MDXRemote>
            )
        } else {
            return (
                <div>loading</div>
            )
        }
       
    }

    return (
        <span>
            {renderit()}
        </span >
    );
}


export default Render;