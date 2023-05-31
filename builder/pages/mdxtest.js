'use client'
import React, { useRef, Suspense } from 'react';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import MDX from '@mdx-js/runtime';


import { watchAccount, getAccount, fetchToken, fetchBalance } from '@wagmi/core'



import Editor from '@monaco-editor/react';

import BN from 'components/bn';
import Balance from 'components/balance';

let value = "// some comment";
const components = { BN, Balance }
let editorRef;
let a;



export default function TestPage({ source }) {

    editorRef = useRef(null);
    const [content, setContent] = React.useState(`
# Hello, world!
<div>{ getAccount().address }</div>
<div>{account.address}</div>
<BN />
    `);

    let account = getAccount();

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    async function handleEditorChange(value, event) {
        console.log('here is the current model value:', value);
        //const mdxSource = await serialize(source)
        setContent(value)

    }

    const getBalance = async function () {
        console.log("get balance")
        let res = await fetchBalance({
            address: '0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4',
        })
        console.log("get balance", res)
        return res;

    }

    let scope = { account: account, getAccount: getAccount, getBalance, fetchToken: async function (address) { return fetchToken({ address: address }) } };

    <Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
        onMount={handleEditorDidMount} defaultValue="// some comment" />;


    return (
        <div className="wrapper">
            <div className="wrapper">
                <MDX components={components} scope={scope} >{content}</MDX>
                <Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
                    onMount={handleEditorDidMount} defaultValue={content} />;
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
    {hello().address}
    # h2
    {account.address}
    # token name
    nothing
    # get balance 
    {getBalance().symbol}
    `
    const source2 = `
    # hello
    <p>{hello().address}</p>
    `
    const mdxSource = await serialize(source2)
    return { props: { source: mdxSource } }
}
