import { NextRequest } from 'next/server';
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage({
    secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET,
});


export default async function handler(request, result) {
    try {
        // get content from request body
        console.log(request.body);
        const content = request.body
        const uri = await storage.upload(content);
        console.log(uri);
        //const url = await storage.resolveScheme("ipfs://example");
        //console.log(url);

        result.status(200).json({ uri });
    } catch (e) {
        console.log(`${e.message}`);
        result.status(500).json({ error: `${e.message}` });
    }
}