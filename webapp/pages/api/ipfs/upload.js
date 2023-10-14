import { NextRequest } from 'next/server';
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage({
    secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET,
});

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    try {
        // get content from request body
        const { content } = await request.body.json();
        // upload content to thirdweb storage
        const uri = await storage.upload(content);
        console.log(uri);
        return new Response(uri, {
            status: 200,
        });
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}