'use client';
import React, { useRef, Suspense, useEffect } from 'react';
import Head from 'next/head'
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
  const [location, setLocation] = React.useState("");
  const [rendered, setRendered] = React.useState(false);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const { name } = router.query


  useEffect(() => {
    async function load() {
      if (!isLoaded) {
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
    <div class="min-h-screen">

      <HeaderMetadata title={title} description={description} />
      {render()}
    </div>
  )
}
