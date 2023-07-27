import Image from 'next/image'

import { Container } from '@/components/Container'
import avatarImage1 from '../../docs/static/img/templates/nouns.png'
import aaveImage from '@/images/dapps/aave.png'
import nounsImage from '@/images/dapps/noun.png'
import erc6551Image from '@/images/dapps/erc6551.png'
import nftImage from '@/images/dapps/nft.png'
import erc20Image from '@/images/dapps/erc20.png'
import lidoImage from '@/images/dapps/lido_staking.png'
import nfmImage from '@/images/dapps/nfm.png'


const dapps = [
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: nounsImage,
    url: "/app/nouns"
  },
  {
    title: 'Aave',
    description: 'An Aave V3 minimalist frontend',
    image: aaveImage,
    url: "/app/aave"
  },
  {
    title: 'ERC6551',
    description: 'Create token bound accounts',
    image: erc6551Image,
    url: "/app/erc6551"
  },
  {
    title: 'NFT top collections',
    description: 'See and sweep top NFT collections',
    image: nftImage,
    url: "/app/reservoir_sweep"
  },
  {
    title: 'ERC20 Transfer',
    description: 'Transfer ERC20 tokens',
    image: erc20Image,
    url: "/app/token_transfer"
  },
  {
    title: 'Lido Staking',
    description: 'Stake your ETH on Lido',
    image: lidoImage,
    url: "/app/lido_staking"
  },
]


export function Dapps() {
  return (
    <section
      id="dapps"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Amazing DApps
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Try some of the featured DApps, you like one? Get the code and remix it!
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {dapps.map((dapp, dappIndex) => (
            <a href={dapp.url}
              key={dappIndex}
              className="overflow-hidden  aspect-video bg-red-400 cursor-pointer rounded-xl relative group"
            >
              <div
                className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end"
              >
                <div>
                  <div
                    className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out"
                  >
                    <div className="font-bold">{dapp.title}</div>

                    <div className="opacity-60 text-sm ">
                      {dapp.description}
                    </div>
                  </div>
                </div>
              </div>
              <Image
                alt=""
                className="object-fit w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={dapp.image}
              />
            </a>
          ))}
        </ul>
      </Container>
    </section>
  )
}
