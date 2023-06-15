import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'

/*
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />

        / main
              <Footer />

*/
export default function Home() {
  return (
    <>
      <Head>
        <title>Muse Build alpha</title>
        <meta
          name="Muse Build alpha"
          content=" create websites for your DAPP in a few minutes."
        />
      </Head>
      <main>
        <Hero />
        <PrimaryFeatures />
        <CallToAction />

      </main>
      <Footer />

    </>
  )
}
