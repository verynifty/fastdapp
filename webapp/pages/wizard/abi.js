

import React, { useEffect, useRef, useState } from 'react';
import HeaderMetadata from '@/components/commons/headerMetadata';

import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function WizardABI({ source }) {

    const router = useRouter()


    const [address, setAddress] = useState(``);
    const [abi, setAbi] = useState(``);
    const [data, setData] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        console.log("useEffect")
        async function load() {
            try {
                window.sessionStorage.setItem('wizard_' + address.toLocaleLowerCase(), abi);
                if (address != "" && JSON.parse(abi) != null) {
                    setIsCorrect(true)
                }
            } catch (error) {

            }
        }
        load()

    }, [abi, address]);

    function Button() {
        if (isCorrect) {
            return (
                <a href={"/editor?wizard=abi&contract_address=" + address} className="btn btn-primary btn-wide 	">Generate your page</a>

            )
        } else {
            return (
                <button className="btn btn-primary btn-wide btn-disabled">Generate your page</button>
            )
        }
    }

    return (
        <div className='wizard_parent'>
            <HeaderMetadata title="ABI wizard | Fast Dapp" description="Create an home page for your NFT collection." />

            <div className=" px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold leading-7 text-secondary">Have an ABI?</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-6xl">Generate your frontend</h2>
                    <p className="mt-6 text-lg leading-8 ">
                        Type your contract address and ABI to get your frontend bootstrapped!
                    </p>
                    <div className="grid mt-5 p-5 card bg-neutral rounded-box place-items-center">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Contract address:</span>
                                <span className="label-text-alt"></span>
                            </label>
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" className="input input-bordered w-full" />
                            <label className="label">
                                <span className="label-text-alt"></span>
                                <span className="label-text-alt"></span>
                            </label>
                        </div>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">ABI</span>
                                <span class="label-text-alt"></span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24" placeholder="[]" value={abi} onChange={e => setAbi(e.target.value)}></textarea>
                            <label class="label">
                                <span class="label-text-alt"></span>
                                <span class="label-text-alt"></span>
                            </label>
                        </div>
                        {Button()}
                    </div>
                </div>
            </div>

        </div>
    )
}
