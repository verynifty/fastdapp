import BN from 'components/bn';

import { watchAccount, getAccount } from '@wagmi/core'
import { default as React, useEffect, useRef } from 'react';

import ReactMarkdown from 'react-markdown'





export default function TestPage({ source }) {

    const [account, setAccount] = React.useState(null);
    const unwatch = watchAccount((_account) => setAccount(_account))


    const scope = { BN, account, getAccount };

    const markdown = `# Hello
<bn></bn>
<bn />
** HELLO
[Retool](https://retool.com)
**A bold text**
    `
    return (
        <div className="wrapper">
           <ReactMarkdown children={markdown} components={{
      // Use `CustomLink` instead of anchor element `a`
      a: BN,
    }} />
           <ReactMarkdown>**A bold text**</ReactMarkdown>
<ReactMarkdown>{markdown}</ReactMarkdown>
<ReactMarkdown>__A strong text__</ReactMarkdown>
<ReactMarkdown>1. An ordered list text</ReactMarkdown>
<ReactMarkdown>- An unordered list text</ReactMarkdown>
<ReactMarkdown> ~~A strikethrough text~~ </ReactMarkdown>
        </div>
    )
}