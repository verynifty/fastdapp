'use client'
import React, { useRef, Suspense } from 'react';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import { watchAccount, getAccount } from '@wagmi/core'



import Editor from '@monaco-editor/react';

import BN from 'components/bn';
import Balance from 'components/balance';

let value = "// some comment";
const components = { BN, Balance }
let editorRef;

function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
}

async function handleEditorChange(_value, event) {
    console.log('here is the current model value:', value);
    //const mdxSource = await serialize(source)
    value = _value;

}

export default function TestPage({ source }) {
    editorRef = useRef(null);
    const [content, setContent] = React.useState(0);
    let hello = "hello";

    let account = getAccount();

    let scope = { account: account, hello: hello };

    /*<Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
        onMount={handleEditorDidMount} defaultValue="// some comment" />;*/


    return (
        <div className="wrapper">
            <div className="wrapper">
            <Suspense>
                <MDXRemote {...source} components={components} scope={scope}/>
                </Suspense>
            </div>


        </div>
    )
}

export async function getStaticProps() {
    // MDX text - can be from a local file, database, anywhere
    const source = `
    {a = 2}
    Some **mdx** text, with a component 
    # BlockNumber
    <BN /> 
    # Balance
    <Balance address={'0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4'} /> haha
    {a}
    # h
    {account.address}
    `
    const mdxSource = await serialize(source)
    return { props: { source: mdxSource } }
}

