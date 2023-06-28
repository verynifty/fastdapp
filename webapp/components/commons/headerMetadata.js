import Head from 'next/head'


export default function headerMetadata(props) {

    function getTitle() {
        if (props.title) {
            return props.title;
        } else {
            return "Fast Dapp"
        }
    }

    function getDescription() {
        if (props.description) {
            return props.description;
        } else {
            return "Create web3 frontends in minutes"
        }
    }

    function getShareImageUrl() {
        if (props.shareImageUrl) {
            return "https://fastdapp.xyz/api/og?title=" + encodeURIComponent(getTitle()) + "&subtitle=" + encodeURIComponent(getDescription());
        } else {
            return "https://fastdapp.xyz/api/og?title=Fast%20Dapp&subtitle=Create%20websites%20for%20your%20DAPP%20in%20minutes."
        }
    }

    return (
        <Head>
            <title>{getTitle()}</title>
            <meta property="og:title" content={getTitle()} />
            <meta property="og:description" content={getDescription()} />
            <meta name="twitter:title" content={getTitle()} />
            <meta name="twitter:description" content={getDescription} />
            <meta name="twitter:image" content={getShareImageUrl()} />
            <meta
                property="og:image"
                content={getShareImageUrl()}
            />
        </Head>
    )
}
