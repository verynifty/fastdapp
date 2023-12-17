export default function MarketData(props) {
    return (
        <></>
    )
}

export const getServerSideProps = async ({ req, res, resolvedUrl }) => {
    console.log(req.query)
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, access_token'
    )
    res.write(JSON.stringify({
        "name": "Fast Dapp",
        "description": "Developing Dapps frontend in minutes",
        "iconPath": "vercel.svg"
    }));
    res.end();
    return {
        props: {},
    };
}