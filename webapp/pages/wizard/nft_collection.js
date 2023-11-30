

import React, { useEffect, useRef, useState } from 'react';
import HeaderMetadata from '@/components/commons/headerMetadata';
import { Header } from '@/components/Header'

import { useRouter } from 'next/router'
import axios from 'axios';

export default function WizardNFTCollection({ source }) {

    const router = useRouter()


    const [collection, setCollection] = useState(``);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
       console.log("useEffect")
        async function load() {
            if (collection != "") {
                let collectionData = await axios.get(`https://api.reservoir.tools/collections/v5?id=` + collection, {
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
                    },
                })
                if (collectionData.data != null && collectionData.data.collections[0] != null) {
                    collectionData = collectionData.data.collections[0]
                    setIsCorrect(true)
                } else {
                    setIsCorrect(false)
                }
                console.log(collectionData)
            } else {
                setIsCorrect(false)
            }
        }
        load()

    }, [collection]);

    function Button() {
        if (isCorrect) {
            return (
                <a href={"/editor?wizard=nft_collection&contract_address=" + collection} className="btn btn-primary btn-wide 	">Generate your page</a>
            )
        } else {
            return (
                <button className="btn btn-primary btn-wide btn-disabled">Generate your page</button>
            )
        }
    }

    return (
        <>
      <Header />
        <div className='wizard_parent'>
            <HeaderMetadata title="NFT Collection wizard | Fast Dapp" description="Create an home page for your NFT collection." />

            <div className=" px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold leading-7 text-secondary">Got a minute?</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-6xl">Create your NFT collection homepage</h2>
                    <p className="mt-6 text-lg leading-8 ">
                        Type your NFT collection address and generate a beautiful home page for your NFT collection. We'll search opensea for your collection information and create an customizable page for you to share.
                    </p>
                    <div className="grid mt-5 p-5 card bg-neutral rounded-box place-items-center">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">NFT Collection address:</span>
                                <span className="label-text-alt"></span>
                            </label>
                            <input type="text" value={collection} onChange={e => setCollection(e.target.value)} placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" className="input input-bordered w-full" />
                            <label className="label">
                                <span className="label-text-alt"></span>
                                <span className="label-text-alt"></span>
                            </label>
                        </div>
                        {Button()}
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}
