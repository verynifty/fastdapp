import { default as React, useState, useRef, useEffect } from 'react';
import { Web3Storage } from 'web3.storage'
var hash = require('object-hash');
import { useRouter } from 'next/router'
import axios from 'axios';

const Publish = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
    const router = useRouter()
    const [IPFS, setIPFS] = React.useState("");
    const [pageLink, setPageLink] = React.useState("");
    const [isUploaded, setIsUploaded] = React.useState(false);

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
                setIPFS(path)
                setPageLink("https://build.musedao.io/page?ipfs=" + encodeURIComponent(path))
                setIsLoading(false);
                setIsUploaded(true);
                return;
            } catch (error) {
                console.log("File not uploaded yet...")
            }
        }
    }

    function content() {
        if (isUploaded) {
            return (
                <div>
                    <center><h3 class="text-lg font-bold">Your app is published 🥳</h3></center>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">IPFS Link:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" value={IPFS} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Page Link:</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" value={pageLink} />
                    </div>
                    <a href={pageLink} className="btn mt-4 w-full">Go to your app</a>
                </div>
            )
        }
        else if (isLoading) {
            return (
                <div>
                     <center><h3 class="text-lg font-bold">Publish your app</h3></center>

                    <button
                        className="btn" disabled="disabled"
                    >
                        Publishing...
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <center><h3 class="text-lg font-bold">Publish your app</h3></center>

                    <button
                        onClick={upload}
                        className="btn"
                    >
                        Publish
                    </button>
                </div>
            )
        }
    }


    return (
        <div>
            <input type="checkbox" id="my_modal_7" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    {content()}
                </div>
                <label class="modal-backdrop" for="my_modal_7">Close</label>
            </div>
        </div>
    );
}


export default Publish;