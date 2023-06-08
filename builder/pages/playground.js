import React, { useRef, Suspense } from 'react';

import { watchAccount, getAccount, fetchToken, fetchBalance } from '@wagmi/core'

import Editor from '@monaco-editor/react';

import Render from 'components/render';
import Publish from 'components/publish';


let editorRef;



export default function TestPage({ source }) {

    editorRef = useRef(null);
    const [content, setContent] = React.useState(`


# Hello, world!

# Variables


# Basic components

<div>{tokenAddress = "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81"}</div>
<div>{VNFTAddress = "0x57f0B53926dd62f2E26bc40B30140AbEA474DA94"}</div>
<div>{FireAddress = "0x3dbb10bde369a8272f7106d88c510829af49c813"}</div>

Here is the current block number: <BlockNumber />

Token address = <DisplayVariable variable={tokenAddress} />

<div>{userAddress}</div>


Here is your balance of token: <TokenBalance address="0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4" token={tokenAddress} />

Here is your balance of Ether: <Balance address="0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4" />
# Here you can send some eth to me:
# Connected acount

# Here is a contract read

<ContractRead address={tokenAddress} abi={ABIs.ERC20} functionName="symbol" />

and another 

<ContractRead args={[0]} address={VNFTAddress} abi={[{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"}],"name":"getItemInfo","outputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_points","type":"uint256"},{"internalType":"uint256","name":"_timeExtension","type":"uint256"}],"stateMutability":"view","type":"function"}]} functionName="getItemInfo" args="1" returnValue={0} />

# Here is a contract write

<ContractWrite address={FireAddress} abi={ABIs.ERC20} abi={[{
    "inputs": [
      
    ],
    "name": "mint",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }]} functionName="mint" />

# Here is Uniswap

<Uniswap
defaultInputAmount={1}
defaultOutputTokenAddress={tokenAddress}  />

# Here is reservoir sweep 

<ReservoirSweep collectionAddress="0xc3f733ca98e0dad0386979eb96fb1722a1a05e69" buttonText="Buy a mooncat" />


    `);
    const [rendered, setRendered] = React.useState(content);
    const [isPublishing, setIsPublishing] = React.useState(false);

    let account = getAccount();

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    async function handleEditorChange(value, event) {
        console.log('here is the current model value:', value);
        setContent(value)
    }

    function handleRender() {
        console.log('rendering');
        setRendered(content)
    }

    function handlePublish() {
        setIsPublishing(!isPublishing)
    }

    function RightPanel() {
        if (isPublishing) {
            return (<Publish content={rendered} />);
        } else {
            return (
                <Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
                onMount={handleEditorDidMount} defaultValue={content} />
            );
        }
    }



    <Editor height="90vh" defaultLanguage="javascript" onChange={handleEditorChange}
        onMount={handleEditorDidMount} defaultValue="// some comment" />;


    return (
        <div>
            <div className="bg-slate-500 p-2	md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Playground
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button
                        onClick={handleRender}
                        type="button"
                        className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                    >
                        Render
                    </button>
                    <button
                        onClick={handlePublish}
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        {!isPublishing ? 'Publish' : 'Edit'}
                    </button>
                </div>
            </div>
            <div className=" flex">
                <div className="flex-1">
                    <Render content={rendered} />

                </div>
                <div className="flex-1">
                   {RightPanel()}
                </div>

            </div>
        </div>
    )
}
