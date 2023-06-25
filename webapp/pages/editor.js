import React, { useRef, Suspense, Fragment, useEffect } from 'react';
import Head from 'next/head'

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

let editorRef;

export default function EditorPage({ source }) {

    const router = useRouter()

    editorRef = useRef(null);
    const [content, setContent] = React.useState(``);
    const [isLoaded, setIsLoaded] = React.useState(``);
    const [version, setVersion] = React.useState(0);
    const [rendered, setRendered] = React.useState("");
    const [isPublishing, setIsPublishing] = React.useState(false);

    function getExampleURL(templateName = null) {
        return ("https://raw.githubusercontent.com/verynifty/etherpage/main/examples/" + (templateName == null ? 'simple' : templateName) + ".md")
    }


    useEffect(() => {
        async function load() {
            try {
                const params = new URLSearchParams(window.location.search) // id=123
                let template = params.get('template') // 123 

                console.log(router.query, getExampleURL(template))
                let f = await axios.get(getExampleURL(template))
                console.log("ADD CONTENT", f.data)
                setContent(f.data)
                setRendered(f.data)
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
        console.log(editor)
        editorRef.current = editor;
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
    }

    async function handleEditorChange(value, event) {
        setContent(value)
    }

    function handleRender() {
        toast.success("Rendered!")
        setRendered(content)
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
                <Editor height="90vh" defaultLanguage="markdown" onChange={handleEditorChange}
                    onMount={handleEditorDidMount} defaultValue={content} />
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
        <div>
            <Head>
                <title>Muse Build - Editor</title>
                <meta
                    name="Muse Build - Editor"
                    content=" create websites for your DAPP in a few minutes."
                />
            </Head>

            <Hotkeys
                keyName="ctrl+enter,command+enter"
                onKeyDown={onKeyDown.bind(this)}
                onKeyUp={onKeyUp.bind(this)}
            >
                <Publish content={rendered} />

                <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-2	md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                            ✍️ Editor
                        </h2>
                    </div>
                    <div className="mt-4 flex md:ml-4 md:mt-0">
                        <button
                            onClick={handleRender}
                            className="btn"
                        >
                            Render
                        </button>

                        <label for="my_modal_7" className="btn ml-2">Publish</label>


                    </div>
                </div>
                <div className=" flex">
                    <div className="flex-1">
                        <PleaseConnect>
                            <RenderErrorWrapper version={version}>
                                <Render content={rendered} />
                            </RenderErrorWrapper>
                        </PleaseConnect>
                    </div>
                    <div className="flex-1">
                        {RightPanel()}
                    </div>

                </div>
            </Hotkeys>
        </div>
    )
}
