import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import axios from 'axios';

export const config = {
    runtime: 'edge',
};

export default function handler(request) {

    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
        status: 500,
    });
}
