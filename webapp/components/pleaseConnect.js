import { default as React, useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const PleaseConnect = (props) => {
    const { address, isConnecting, isDisconnected } = useAccount()

    if (isConnecting) return <div className=''>Connecting…</div>
    if (isDisconnected) return (
        <div className="h-full w-full flex items-center justify-center">
            <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Connect your wallet</h3>
                <p className="mt-1 text-sm text-gray-500">Please connect your wallet to the correct network to continue.</p>
                <div className="mt-6 flex items-center justify-center">
                    <ConnectButton />
                </div>
            </div>

        </div>);
    console.log("PleaseConnect", address);
    return props.children;
}


export default PleaseConnect;