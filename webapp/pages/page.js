'use client';
import React, { useRef, Suspense, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'

import Render from 'components/render';
import { Web3Storage } from 'web3.storage'
import axios from 'axios';


export default function TestPage({ source }) {

    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
    const router = useRouter()

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isIPFS, setIsIPFS] = React.useState(false);

    const [rendered, setRendered] = React.useState(false);

    async function load() {
        //setIsLoaded(true);
        console.log("Loading page", router.query)
        if (router.query.ipfs != null && !isLoaded) {
            let urlSplit = router.query.ipfs.split('/')
            let cid = urlSplit[2]
            let filename = urlSplit[3]
            let file_url = "https://" + cid + ".ipfs.w3s.link/" + filename
            let f = await axios.get(file_url)
            console.log(f);
            setIsIPFS(true)
            setRendered((f.data).content)
            setIsLoaded(true);
        }

    }

    load();

    function ipfsMessage() {
        if (isIPFS) {
            return(
                <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <div
                  className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                      clipPath:
                        'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                  />
                </div>
                <div
                  className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                      clipPath:
                        'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-sm leading-6 text-gray-900">

                    This app is currently not registered with a domain name
                  </p>
                  <a
                    href="#"
                    className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Register now <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
                <div className="flex flex-1 justify-end">
                 
                </div>
              </div>
            )
        }
    }

    function render() {
        if (isLoaded) {
            return (<Render content={rendered} />)
        } else {
            return (<div>Loading...</div>)
        }
    }
//             {ipfsMessage()}

    return (
        <div>
          <Head>
                <title>Muse Build - {router.query.ipfs}</title>
                <meta
                    name="Muse Build - Editor"
                    content=" create websites for your DAPP in a few minutes."
                />
            </Head>
            {render()}
        </div>
    )
}
