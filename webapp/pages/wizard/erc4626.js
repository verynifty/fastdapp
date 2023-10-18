

import React, { useEffect, useRef, useState } from 'react';
import HeaderMetadata from '@/components/commons/headerMetadata';

import { useRouter } from 'next/router'
import { readContract } from '@wagmi/core'


export default function WizardNFTCollection({ source }) {

    const router = useRouter()


    const [address, setAddress] = useState(``);
    const [asset, setAsset] = useState(``);

    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        console.log("useEffect")
        async function load() {
            if (address != "") {
                try {
                    // get the asset from the erc4626 contract
                    let asset = await readContract({
                        address: address,
                        abi: [
                            {
                                inputs: [],
                                name: "asset",
                                outputs: [
                                    {
                                        internalType: "address",
                                        name: "",
                                        type: "address",
                                    },
                                ],
                                stateMutability: "view",
                                type: "function",
                            }
                        ],
                        functionName: "asset",
                    })
                    setAsset(asset);
                    console.log("GOT ASSET", asset)
                    setIsCorrect(true)

                } catch (error) {
                    setIsCorrect(false)

                }
            } else {
                setIsCorrect(false)
            }
        }
        load()

    }, [address]);

    function Button() {
        if (isCorrect) {
            return (
                <a href={"/editor?wizard=erc4626&contract_address=" + address + "&asset_address=" + asset} className="btn btn-primary btn-wide 	">Generate your page</a>
            )
        } else {
            return (
                <button className="btn btn-primary btn-wide btn-disabled">Generate your page</button>
            )
        }
    }

    return (
        <div className='wizard_parent'>
            <HeaderMetadata title="ERC4626 wizard | Fast Dapp" description="Create an home page for your NFT collection." />

            <div className=" px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold leading-7 text-secondary">Got a minute?</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-6xl">Create your ERC4626 staking page</h2>
                    <p className="mt-6 text-lg leading-8 ">
                        Type your ERC4626 address and generate a beautiful home page for your NFT collection. We'll search opensea for your collection information and create an customizable page for you to share.
                    </p>
                    <div className="grid mt-5 p-5 card bg-neutral rounded-box place-items-center">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">ERC4626 contract address:</span>
                                <span className="label-text-alt"></span>
                            </label>
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="0x83f20f44975d03b1b09e64809b757c47f942beea" className="input input-bordered w-full" />
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
    )
}
