'use client'
import React, { useRef, Suspense } from 'react';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import MDX from '@mdx-js/runtime';


import { watchAccount, getAccount, fetchToken, fetchBalance } from '@wagmi/core'



import Editor from '@monaco-editor/react';

import Render from 'components/render';


let editorRef;



export default function TestPage({ source }) {

    editorRef = useRef(null);
    const [content, setContent] = React.useState(`
<SendTransaction />

# Hello, world!


<BN />
<SendTransaction to="0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4" />

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


    <Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
        onMount={handleEditorDidMount} defaultValue="// some comment" />;


    return (
        <div className="wrapper">
            <div className="wrapper">
                <Render content={content} />
                <Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
                    onMount={handleEditorDidMount} defaultValue={content} />;
            </div>
        </div>
    )
}
