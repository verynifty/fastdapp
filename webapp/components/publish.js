import { default as React, useState, useRef, useEffect } from 'react';
import { Web3Storage } from 'web3.storage'
var hash = require('object-hash');
import { useRouter } from 'next/router'
import axios from 'axios';
const { Readable } = require("stream");
const pinataSDK = require('@pinata/sdk');


const Publish = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
    const router = useRouter()
    const [IPFS, setIPFS] = React.useState("");
    const [pageLink, setPageLink] = React.useState("");
    const [isUploaded, setIsUploaded] = React.useState(false);

    useEffect(() => {

    }, []);

    async function upload() {
        setIsLoading(true);
        console.log(props.content)

        const formData = new FormData();
        const src = "path/to/file.png";
        const readable = Readable.from([props.content])
        console.log(readable)
        formData.append('file', readable)
        
        const pinataMetadata = JSON.stringify({
          name: 'APIFile',
        });
        formData.append('pinataMetadata', pinataMetadata);
    
        try{
          const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_KEY}`
            }
          });
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
        return
        const pinata = new pinataSDK({ pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_API_KEY });

        const options = {
            pinataMetadata: {
                name: hash(props.content) + ".json",
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        console.log(options)
        console.log(readable)
        const res = await pinata.pinFileToIPFS(readable, options);
        console.log(res)
        return
        const obj = { content: props.content }
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
        let filename = hash(obj) + '.json';
        const files = [
            new File([blob], filename)
        ]
        const cid = await client.put(files)
        console.log(cid)
        let path = "ipfs://" + cid + "/" + filename;
        while (true) {
            console.log("checking if file is uploaded")
            try {
                await new Promise(r => setTimeout(r, 1000));
                let file_url = "https://" + cid + ".ipfs.w3s.link/" + filename
                let f = await axios.get(file_url)
                setIPFS(path)
                setPageLink("https://fastdapp.xyz/app/" + encodeURIComponent(path))
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
                    <center><h3 className="text-lg font-bold">Your app is published 🥳</h3></center>
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
                    <div class="mt-2 mb-2 flex flex-col w-full">
                        <div class="divider"></div>
                    </div>
                    <button onClick={() => setIsUploaded(false)} className="btn w-full">Publish again</button>

                </div>
            )
        }
        else if (isLoading) {
            return (
                <div>
                    <center><h3 className="text-lg font-bold">Publish your app</h3>
                        <p className='m-4'>You're about to publish your app and make it shareable with others.</p>

                        <button
                            className="btn w-full" disabled="disabled"
                        >
                            Publishing<span className="loading loading-spinner loading-md"></span>
                        </button>
                    </center>
                </div>
            )
        } else {
            return (
                <div>
                    <center><h3 className="text-lg font-bold">Publish your app</h3>
                        <p className='m-4'>You're about to publish your app and make it shareable with others.</p>

                        <button
                            onClick={upload}
                            className="btn w-full"
                        >
                            Publish
                        </button>
                    </center>

                </div>
            )
        }
    }
    return (
        <div>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    {content()}
                </div>
                <label className="modal-backdrop" for="my_modal_7">Close</label>
            </div>
        </div>
    );
}

export default Publish;