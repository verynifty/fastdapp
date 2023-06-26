import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
    runtime: 'edge',
};

export default function handler(request) {
    try {
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

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: '#FFEA00',
                        backgroundSize: '150px 150px',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center',
                        }}
                    >
                        <svg fill="#000000"
                            width="250px" height="250px" viewBox="0 0 560.317 560.316"
                        >
                            <g>
                                <g>
                                    <path d="M207.523,560.316c0,0,194.42-421.925,194.444-421.986l10.79-23.997c-41.824,12.02-135.271,34.902-135.57,35.833
			C286.96,122.816,329.017,0,330.829,0c-39.976,0-79.952,0-119.927,0l-12.167,57.938l-51.176,209.995l135.191-36.806
			L207.523,560.316z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div
                        style={{
                            fontSize: 70,
                            fontStyle: 'normal',
                            letterSpacing: '-0.025em',
                            color: 'black',
                            marginTop: 10,
                            padding: '0 12px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            color: 'black',
                            marginTop: 0,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {subtitle}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}