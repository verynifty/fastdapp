import { createPublicClient, http, getContract } from 'viem'
import { mainnet, goerli } from 'viem/chains'


export default async function handler(req, res) {

    const { id } = req.query;


    const publicClient = createPublicClient({
        chain: goerli,
        transport: http()
    });

    const contract = getContract({
        address: '0xc7b4e5690d9d59f47ecba0a89375d7f0953ada23',
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getInfoFromId",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        publicClient,
    });

    try {
        const result = await contract.read.getInfoFromId([id]);
        let JSONRESULT = {
            "description": "A domain name for your Fast Dapp app at: " + result[2],
            "external_url": "https://fastdapp.xyz/a/" + result[2],
            "image": "https://fastdapp.xyz/api/name-img?title=" + result[2],
            "name": result[2],
            "attributes": [
                {
                    "trait_type": "Owner",
                    "value": result[0]
                },
                {
                    "display_type": "number",
                    "trait_type": "Length",
                    "value": result[2].length
                },
                {
                    "trait_type": "Location",
                    "value": result[1]
                },
            ]
        }
        res.status(200).json(JSONRESULT)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to load data' })
    }
}
