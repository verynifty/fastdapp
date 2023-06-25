'use client';
import React, { useRef, Suspense, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'

import Render from 'components/render';
import { Web3Storage } from 'web3.storage'
import axios from 'axios';


export default function TestPage({ source }) {

  const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
  const router = useRouter()

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [rendered, setRendered] = React.useState(false);
  const {name} = router.query


  useEffect(() => {
    async function load() {
      if (!isLoaded) {
        try {
            let file_url = "https://raw.githubusercontent.com/verynifty/etherpage/main/examples/" + router.query.name + ".md"
            let f = await axios.get(file_url)
            console.log(file_url);
            setRendered((f.data))
            setIsLoaded(true);
        } catch (error) {
            
        }
       
      }

    }

    load();

  }, [name]);



  function render() {
    if (isLoaded) {
      return (<Render location={location} content={rendered} />)
    } else {
      return (<div>Loading...</div>)
    }
  }

  return (
    <div>
      <Head>
        <title>{router.query.name}</title>
        <meta
          name={router.query.name} 
          content=""
        />
      </Head>
      {render()}
    </div>
  )
}
