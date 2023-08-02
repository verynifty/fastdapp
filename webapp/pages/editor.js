const prettier = require("prettier");
const markdownParser = require("prettier/parser-markdown");
const parserBable = require("prettier/parser-babel");

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


    useEffect(() => {
        async function load() {
            try {
                const params = new URLSearchParams(window.location.search) // id=123
                let template = params.get('template') // 123 
                if (params.get("wizard") == 'nft_collection') {
                    const contract_address = params.get("contract_address");
                    let f = await axios.get(getExampleURL("nft_collection"))
                    let collectionData = await axios.get(`https://api.reservoir.tools/collections/v5?id=` + contract_address, {
                        headers: {
                            "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
                        },
                    });
                    collectionData = collectionData.data.collections[0]
                    let collectionBanner = collectionData.banner
                    let collectionImage = collectionData.image
                    let collectionName = collectionData.name
                    let collectionDescription = collectionData.description;
                    let collectionDiscord = collectionData.discordUrl;
                    let collectionUrl = collectionData.externalUrl;
                    let collectionTwitter = collectionData.twitterUsername;

                    console.log(collectionData)
                    let text = f.data
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

                } else {
                    console.log(router.query, getExampleURL(template))
                    let f = await axios.get(getExampleURL(template))
                    setContent(f.data)
                    setRendered(f.data)
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
            id: "my-unique-id",

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
                console.log("RUN", ed.getValue())
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
        toast.success("Rendered!")
        setRendered(getContent())
        setVersion(version + 1)
    }


    function handleRenderWithContent(value = null) {
        if (value != null) {
            setContent(value);
        }
        toast.success("Rendered!")
        setRendered(value)
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
    )
}
