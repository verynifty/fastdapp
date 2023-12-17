import { NextRequest } from 'next/server';
import axios from 'axios';


export default async function handler(request, result) {
    try {
        const callResult = await axios.get("https://ydaemon.yearn.fi/1/vaults/all?hideAlways=true&orderBy=tvl.tvl&orderDirection=desc&strategiesDetails=withDetails&strategiesRisk=withRisk&strategiesCondition=inQueue")
        console.log("APICall", callResult.data);
        let vaults = callResult.data;
        vaults = vaults.filter((vault) => {
            return vault.tvl != null && vault.tvl.tvl != null;
        })
        /*
        vaults = vaults.sort((a, b) => {
            return a.tvl.tvl > b.tvl.tvl;
        })
        */ 
        result.status(200).json(vaults);
    } catch (error) {
        console.log("APICall", error)
        result.status(500).json(error);
    }
}