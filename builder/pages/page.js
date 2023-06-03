'use client';
import React, { useRef, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router'

import Render from 'components/render';
import { Web3Storage } from 'web3.storage'
import axios from 'axios';

const IPFSGatewayTools = require("@pinata/ipfs-gateway-tools/dist/node");

export default function TestPage({ source }) {

    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
    const ipfsGatewayTools = new IPFSGatewayTools();
    const router = useRouter()

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [rendered, setRendered] = React.useState(false);

    async function load() {
        //setIsLoaded(true);
        if (router.query.ipfs != null) {
            let urlSplit = router.query.ipfs.split('/')
            let cid = urlSplit[2]
            let filename = urlSplit[3]
            let file_url = "https://" + cid + ".ipfs.w3s.link/" + filename
            let f = await axios.get(file_url)
            console.log(f);
            setRendered((f.data).content)
            setIsLoaded(true);
        }

    }

    load();

    function render() {
        if (isLoaded) {
            return (<Render content={rendered} />)
        } else {
            return (<div>Loading...</div>)
        }
    }

    return (
        <div>
            {render()}
        </div>
    )
}
