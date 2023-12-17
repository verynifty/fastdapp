'use client';
import React, { useRef, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router'

import Render from 'components/render';
import { Web3Storage } from 'web3.storage'
import axios from 'axios';

import HeaderMetadata from '@/components/commons/headerMetadata';


export default function TestPage({ source }) {

  var yamlFront = require('yaml-front-matter');

  const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })
  const router = useRouter()

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isIPFS, setIsIPFS] = React.useState(false);

  const [location, setLocation] = React.useState("");
  const [rendered, setRendered] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const { name } = router.query


  useEffect(() => {
    async function load() {
      if (!isLoaded) {
        let app_name = router.query.name;
        if (app_name == null) {
          app_name = "simple";
        }
        if (app_name.startsWith("ipfs://")) {
          let urlSplit = app_name.split('/')
          let cid = urlSplit[2]
          let filename = urlSplit[3]
          let file_url = "https://" + cid + ".ipfs.w3s.link/" + filename
          let f = await axios.get(file_url)
          setIsIPFS(true)
          setRendered((f.data).content)
          setIsLoaded(true);
        } else {
          try {
            let file_url = "https://raw.githubusercontent.com/verynifty/etherpage/main/examples/" + router.query.name + ".md"
            let f = await axios.get(file_url)
            console.log(file_url);
            let parsedFront = yamlFront.loadFront(f.data);
            console.log(parsedFront)
            setTitle(parsedFront.title);
            setDescription(parsedFront.description);
            setRendered((f.data))
            setIsLoaded(true);
          } catch (error) {

          }
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
    <>
      <div className="app_container">
        <HeaderMetadata title={title} description={description} />
        {render()}
      </div>
    </>
  )
}
