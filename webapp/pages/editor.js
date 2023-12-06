const prettier = require("prettier");
const markdownParser = require("prettier/parser-markdown");
const parserBable = require("prettier/parser-babel");

import Header  from '@/components/Header'

import React, { useEffect, useRef, useState } from 'react';
import HeaderMetadata from '@/components/commons/headerMetadata';

import { useRouter } from 'next/router'
import axios from 'axios';

import toast from 'react-hot-toast';
import Hotkeys from 'react-hot-keys';

import { watchAccount, getAccount, fetchToken, fetchBalance } from '@wagmi/core'

import Editor from '@monaco-editor/react';

import RenderErrorWrapper from 'components/renderErrorWrapper';
import Render from 'components/render';
import Publish from 'components/publish';
import PleaseConnect from 'components/pleaseConnect';

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PanelResizeHandler from 'components/internals/panelResizeHandler';

export default function EditorPage({ source }) {

    const router = useRouter()


    const [content, setContent] = useState(``);
    const [editor, setEditor] = useState(``);

    const [isLoaded, setIsLoaded] = useState(``);
    const [version, setVersion] = useState(0);
    const [rendered, setRendered] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);

    const renderViewRef = useRef(null)


    function getExampleURL(templateName = null) {
        return ("https://raw.githubusercontent.com/verynifty/etherpage/main/examples/" + (templateName == null ? 'simple' : templateName) + ".md")
    }

    function getDefaultValue(type) {
        if (type.includes("int")) {
            return 0;
        }
        if (type.includes("bool")) {
            return true;
        }
        if (type.includes("string")) {
            return "";
        }
        if (type == "bytes") {
            return "";
        }
        if (type.includes("bytes")) {
            let lenght = parseInt(type.slice(5));
            return "0".repeat(lenght);
        }
        if (type.includes("address")) {
            return "0x0000000000000000000000000000000000000000"
        }
    }


    useEffect(() => {
        async function load() {
            try {
                const params = new URLSearchParams(window.location.search) // id=123
                let template = params.get('template');
                if (params.get("wizard") == 'nft_collection') {
                    const contract_address = params.get("contract_address");
                    let f = await axios.get(getExampleURL("nft_collection"))
                    let collectionData = await axios.get(`https://api.reservoir.tools/collections/v5?id=` + contract_address, {
                        headers: {
                            "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
                        },
                    });
                    collectionData = collectionData.data.collections[0]
                    let collectionSlug = collectionData.slug;
                    let collectionImage = collectionData.image;
                    let collectionBanner = collectionData.banner ? collectionData.banner : collectionImage;
                    let collectionName = collectionData.name;
                    let collectionDescription = collectionData.description ? collectionData.description : "";
                    let collectionDiscord = collectionData.discordUrl ? collectionData.discordUrl : "";
                    let collectionUrl = collectionData.externalUrl ? collectionData.externalUrl : "";
                    let collectionTwitter = collectionData.twitterUsername ? collectionData.twitterUsername : "";

                    console.log(collectionData)
                    let text = f.data
                    text = text.replaceAll("__COLLECTION_SLUG__", collectionSlug)
                    text = text.replaceAll("__CONTRACT_ADDRESS__", contract_address)
                    text = text.replaceAll("__COLLECTION_BANNER__", collectionBanner)
                    text = text.replaceAll("__COLLECTION_IMAGE__", collectionImage)
                    text = text.replaceAll("__COLLECTION_DESCRIPTION__", collectionDescription)
                    text = text.replaceAll("__COLLECTION_NAME__", collectionName)
                    text = text.replaceAll("__DISCORD_LINK__", collectionDiscord)
                    text = text.replaceAll("__URL__", collectionUrl)
                    text = text.replaceAll("__TWITTER__", collectionTwitter)

                    setContent(text)
                    setRendered(text)
                } else if (params.get("wizard") == 'abi') {
                    let abi = JSON.parse(window.sessionStorage.getItem('wizard_' + params.get("contract_address").toLocaleLowerCase()));
                    let address = params.get("contract_address");
                    let text = `---
chain: 1
authors: grands_marquis
theme: dark
title: My Dapp
description: Here is my Dapp built on FastDapp
---
<!---
 This code was generated from the ABI and is meant to be a starting point to build your app.

 TODO:
 * Change the chain ID at the top of the code to match the chain your contract is at.
 * Remove functions you don't need.
 * Change the theme (https://docs.fastdapp.xyz/docs/style/themes) or style with your own CSS/Tailwind.
-->

<>
  {(() => {
    // You can declare reactive variables
    CONTRACT_ADDRESS = "${address}"
  })()}
</>

`;

                    let readFunctions = abi.filter((f) => f.type == "function" && f.stateMutability == "view");
                    let writeFunctions = abi.filter((f) => f.type == "function" && f.stateMutability != "view");
                    let events = abi.filter((f) => f.type == "event");
                    if (readFunctions.length > 0) {
                        text += `
## Contract Read

Here are the read functions of your contract. You can use them to display data from your contract.
`
                    }
                    readFunctions.forEach(element => {
                        let args = []
                        element.inputs.forEach(input => {
                            args.push(getDefaultValue(input.type))
                        })
                        text += `### ${element.name}

<ContractRead address={CONTRACT_ADDRESS} abi={[${JSON.stringify(element)}]} args={${JSON.stringify(args)}} />

`
                    });
                    if (writeFunctions.length > 0) {
                        text += `
## Contract Write

Here are the write functions of your contract. You can use them to send transactions to your contract.
`
                    }
                    writeFunctions.forEach(element => {
                        let args = []
                        element.inputs.forEach(input => {
                            args.push(getDefaultValue(input.type))
                        })
                        text += `### ${element.name}

<ContractWrite address={CONTRACT_ADDRESS} abi={[${JSON.stringify(element)}]} args={${JSON.stringify(args)}} />

`
                    });
                    let formatted = prettier.format(text, {
                        parser: "mdx",
                        plugins: [markdownParser, parserBable],
                    });
                    setContent(formatted)
                    setRendered(formatted)
                } else if (params.get("wizard") == "erc4626") {
                    const contract_address = params.get("contract_address");
                    const asset_address = params.get("asset_address");
                    let f = await axios.get(getExampleURL("erc4626_wizard"))
                    let text = f.data;
                    text = text.replaceAll("__ERC4626_ADDRESS__", contract_address)
                    text = text.replaceAll("__ERC4626_ASSET__", asset_address)
                    let formatted = prettier.format(text, {
                        parser: "mdx",
                        plugins: [markdownParser, parserBable],
                    });
                    setContent(formatted)
                    setRendered(formatted)

                } else {
                    let codeToLoad;
                    // we check if we have a saved code in localstorage
                    if (template == null && window.localStorage.getItem('editor_saved_code') != null) {
                        codeToLoad = window.localStorage.getItem('editor_saved_code');
                    } else {
                        let f = await axios.get(getExampleURL(template));
                        codeToLoad = f.data;
                    }
                    setContent(codeToLoad);
                    setRendered(codeToLoad);
                }
                setIsLoaded(true)
                console.log("LOADED")
            } catch (error) {
                console.log(error)
            }
        }
        load();
    }, []);

    let account = getAccount();

    function handleEditorDidMount(editor, monaco) {
        console.log("onmount", editor, monaco)
        setEditor(editor);
        let ctx = this;

        editor.addAction({
            // An unique identifier of the contributed action.
            id: "render",

            // A label of the action that will be presented to the user.
            label: "Render",

            // An optional array of keybindings for the action.
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            ],

            // A precondition for this action.
            precondition: null,

            // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
            keybindingContext: null,

            contextMenuGroupId: "navigation",

            contextMenuOrder: 1.5,

            // Method that will be executed when the action is triggered.
            // @param editor The editor instance is passed in as a convenience
            run: function (ed) {
                console.log(ctx, ed)
                handleRenderWithContent(ed.getValue())
            },
        });

        editor.addAction({
            // An unique identifier of the contributed action.
            id: "format-code",

            // A label of the action that will be presented to the user.
            label: "Format code",

            // An optional array of keybindings for the action.

            // A precondition for this action.
            precondition: null,

            // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
            keybindingContext: null,

            contextMenuGroupId: "navigation",

            contextMenuOrder: 1.5,

            // Method that will be executed when the action is triggered.
            // @param editor The editor instance is passed in as a convenience
            run: function (ed) {
                console.log("FORMAT CODE")
                let formatted = prettier.format(ed.getValue(), {
                    parser: "mdx",
                    plugins: [markdownParser, parserBable],
                });
                console.log("SET CONTENT", formatted)
                setContent(formatted)
                ed.setValue(formatted)
            },
        });
    }

    async function handleEditorChange(value, event) {
    }

    function getContent() {
        console.log(editor.getValue())
        return (editor.getValue());
    }

    function handleRender() {
        const content = getContent();
        toast.success("Rendered!")
        setRendered(content)
        console.log("SET CONTENT", content);
        window.localStorage.setItem('editor_saved_code', content);
        setVersion(version + 1)
    }

    function handleRenderWithContent(value = null) {
        if (value != null) {
            setContent(value);
        }
        toast.success("Rendered!")
        setRendered(value)
        console.log("SET CONTENT", content);
        window.localStorage.setItem('editor_saved_code', value);
        setVersion(version + 1)
    }

    function handlePublish() {
        setIsPublishing(!isPublishing)
    }

    function RightPanel() {
        if (isPublishing) {
            return (<Publish content={rendered} />);
        } else {
            return (
                <div className=' h-full'>
                    <Editor className="h-full" theme='vs-dark'
                        options={{ "automaticLayout": true }} defaultLanguage="markdown" onChange={handleEditorChange}
                        onMount={handleEditorDidMount} value={content} />
                </div>
            );
        }
    }

    function onKeyUp(keyName, e, handle) {
        //  console.log("test:onKeyUp", e, handle)
    }


    function onKeyDown(keyName, e, handle) {
        handleRender()
    }


    if (!isLoaded) return (<div>Loading...</div>);


    return (
        <>
            <Header />
            <div className='editor_parent'>
                <HeaderMetadata title="Editor | Fast Dapp" description="Create frontends for your web3 apps in minutes!" />


                <Hotkeys
                    keyName="ctrl+enter,command+enter"
                    onKeyDown={onKeyDown.bind(this)}
                    onKeyUp={onKeyUp.bind(this)}
                >
                    <Publish content={rendered} />
                    <div className="bg-gradient-to-r from-primary to-secondary p-2 md:flex md:items-center md:justify-between" style={{ "height": "2rem" }}>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-bold  text-white sm:truncate  sm:tracking-tight">
                                Editor
                            </h2>
                        </div>
                        <div className="mt-4 flex md:ml-4 md:mt-0">
                            <button
                                onClick={handleRender}
                                className="btn btn-xs btn-outline"
                            >
                                Render
                            </button>
                            <label for="my_modal_7" className="btn ml-2 btn-xs btn-outline">Publish</label>
                        </div>
                    </div>
                    <PanelGroup direction="horizontal" className=" editor_container">
                        <Panel defaultSize={50} ref={renderViewRef}>
                            <div className=" h-full overflow-auto">
                                <PleaseConnect>
                                    <RenderErrorWrapper version={version}>
                                        <Render content={rendered} />
                                    </RenderErrorWrapper>
                                </PleaseConnect>
                            </div>
                        </Panel>
                        <PanelResizeHandler className='' />
                        <Panel className=" h-full overflow-auto bg-base-200">
                            {RightPanel()}
                        </Panel>

                    </PanelGroup>
                </Hotkeys>
            </div>
        </>
    )
}
