import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';



export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    try {
        console.log("HELLO")
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'FastDapp';
        const hasSubTitle = searchParams.has('title');
        const subtitle = hasSubTitle
            ? searchParams.get('subtitle')?.slice(0, 100)
            : '';

        const avatar = createAvatar(micah, {
            seed: title
            // ... other options
        });

        const svg = await avatar.toDataUri();
        const imgJson = avatar.toJson()
        console.log(svg, imgJson)

        return new ImageResponse(
            (
                <div
                    style={{
                        background: 'linear-gradient(0deg, rgba(227,121,13,1) 0%, rgba(249,199,18,1) 100%)',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        position: 'relative'
                    }}
                >
                        <img src={svg}
                         style={{
                            position: 'absolute',
                            bottom: '200px',
                            height: '1790px',
                            width: '1800px',
                        }} />

                        
                   
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '180px',
                            fontSize: 90,
                            fontStyle: 'normal',
                            color: 'black',
                            marginTop: 0,
                            whiteSpace: 'pre-wrap',
                            transform: 'translate(40px, 0) rotate(-7deg)'
                        }}
                    >
                        Fast Dapp
                    </div>
                    <div 
                         style={{
                            position: 'absolute',
                            bottom: '0px',
                            height: '200px',
                            width: '2000px',
                            backgroundColor: "#00000",
                           
                        }} >
                            </div>
                            <div
                        style={{
                            position: 'absolute',
                            bottom: '35px',
                            fontSize: 120,
                            fontStyle: 'normal',
                            color: 'white',
                            marginTop: 0,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {title}
                    </div>
                </div>
            ),
            {
                width: 2000,
                height: 2000,
            },
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}