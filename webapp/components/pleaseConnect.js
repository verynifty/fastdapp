import { default as React, useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi'

const PleaseConnect = (props) => {
    const { address, isConnecting, isDisconnected } = useAccount()

    if (isConnecting) return <div className=''>Connecting…</div>
    if (isDisconnected) return (
        <div class="h-full w-full flex items-center justify-center">
            <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 class="mt-2 text-sm font-semibold text-gray-900">Connect your wallet</h3>
                <p class="mt-1 text-sm text-gray-500">Please connect your wallet to the correct network to continue.</p>
                <div class="mt-6">
                    <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Connect your wallet
                    </button>
                </div>
            </div>

        </div>);
        console.log("PleaseConnect", address);
    return props.children;
}


export default PleaseConnect;