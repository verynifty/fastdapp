import { default as React, useState, useRef, useEffect } from 'react';
import { Web3Storage } from 'web3.storage'
var hash = require('object-hash');
import { useRouter } from 'next/router'
import axios from 'axios';

const Publish = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
    const router = useRouter()

    // This will run only once
    useEffect(() => {


    }, []);

    async function upload() {
        setIsLoading(true);
        const obj = { content: props.content }
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
        let filename = hash(obj) + '.json';
        const files = [
            new File([blob], filename)
        ]
        const cid = await client.put(files)
        let path = "ipfs://" + cid + "/" + filename;
        console.log(path)
        while (true) {
            console.log("checking if file is uploaded")
            try {
                await new Promise(r => setTimeout(r, 1000));
                let file_url = "https://" + cid + ".ipfs.w3s.link/" + filename
                let f = await axios.get(file_url)
                router.replace("/page?ipfs=" + encodeURIComponent(path), "/page?ipfs=" + encodeURIComponent(path), { query: { ipfs: path } })
                setIsLoading(false);
                return;
            } catch (error) {
                console.log("File not uploaded yet...")
            }
        }
    }

    function button() {
        if (isLoading) {
            return (
                <button
                    className="btn" disabled="disabled"
                >
                    uploading...
                </button>
            )
        } else {
            return (
                <button
                    onClick={upload}
                    className="btn"
                >
                    Upload
                </button>
            )
        }
    }


    return (
        <div>
            <input type="checkbox" id="my_modal_7" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Publish your app</h3>
                    {button()}
                </div>
                <label class="modal-backdrop" for="my_modal_7">Close</label>
            </div>
        </div>
    );
}


export default Publish;