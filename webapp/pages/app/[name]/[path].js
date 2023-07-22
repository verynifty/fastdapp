export default function MarketData(props) {
    return (
        <></>
    )
}

export const getServerSideProps = async ({ req, res, resolvedUrl }) => {
    console.log(req.query)
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({
        "name": "Fast Dapp",
        "description": "Developing Dapps frontend in minutes",
    }));
    res.end();
    return {
        props: {},
    };
}