

import React, { useEffect, useRef, useState } from 'react';
import HeaderMetadata from '@/components/commons/headerMetadata';

import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios';

import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'

export default function Wizard({ source }) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const actions = [
        {
            title: "ABI",
            description: "Generate all the frontend code to interact with your smart contract from an ABI.",
            href: "/wizard/abi"
        },
        {
            title: "NFT Collection",
            description: "Create an home page for your NFT collection.",
            href: "/wizard/nft_collection"
        },
    ]

    return (
        <div className='wizard_parent'>
            <HeaderMetadata title="Wizards | Fast Dapp" description="Tools to kickstart your FastDapp project." />

            <div className=" px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-6xl">Wizards</h2>
                    <p className="mt-6 text-lg leading-8 ">
                        Tools to kickstart your FastDapp project.
                    </p>
                    <div className="divide-y bg-neutral divide-gray-200 overflow-hidden rounded-lg  shadow  ">
                        {actions.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={classNames(
                                    actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg ' : '',
                                    actionIdx === 1 ? '' : '',
                                    actionIdx === actions.length - 2 ? '' : '',
                                    actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                    ' group relative  p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div className="mt-8">
                                    <h3 className="text-base font-semibold leading-6 ">
                                        <a href={action.href} className="focus:outline-none">
                                            {/* Extend touch target to entire panel */}
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-sm ">
                                       {action.description  }
                                    </p>
                                </div>
                                <span
                                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
