import React, { useRef, Suspense, Fragment } from 'react';
import { useRouter } from 'next/router'

import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline'

import { watchAccount, getAccount, fetchToken, fetchBalance } from '@wagmi/core'

import Editor from '@monaco-editor/react';

import examples from 'examples/list';


import Render from 'components/render';
import Publish from 'components/publish';


let editorRef;



export default function TestPage({ source }) {

    const router = useRouter()

    const solutions = [
        { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
        { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
        { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
        { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
        { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
    ]
    const callsToAction = [
        { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
        { name: 'Contact sales', href: '#', icon: PhoneIcon },
    ]

    editorRef = useRef(null);
    const [content, setContent] = React.useState(``);

    async function load() {
        //setIsLoaded(true);
        console.log("Loading page", router.query)
        if (router.query.starter != null) {
            let url = router.query.starter;
            
        }

    }

    load();

    console.log(examples)
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
                <Editor height="90vh" defaultLanguage="mdx" onChange={handleEditorChange}
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
                    {!isPublishing ?

                        <Popover className="relative">
                            <Popover.Button className="mr-2 inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                                <span>Examples</span>
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {solutions.map((item) => (
                                                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <a href={item.href} className="font-semibold text-gray-900">
                                                            {item.name}
                                                            <span className="absolute inset-0" />
                                                        </a>
                                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                            {callsToAction.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                                >
                                                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                        : null}

                    {!isPublishing ?
                        <button
                            onClick={handleRender}
                            type="button"
                            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                        >
                            Render
                        </button>
                        : null}
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
