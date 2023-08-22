

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
                    <ul class="menu menu-lg divide-y bg-neutral w-full rounded-box mt-5 ">
                        {actions.map((action, actionIdx) => (
                              <li><a href={action.href}><strong className='mx-2'>{action.title}:</strong> {action.description}</a></li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}
