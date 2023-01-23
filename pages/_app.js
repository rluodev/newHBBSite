import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import splitbee from '@splitbee/web';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
  }, []);
  return (
    <>
      <Head>
        <link rel="favicon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet" /> 
      </Head>
      <Script 
        defer 
        data-domain="hackbackbetter.live"
        src="https://plausible.io/js/plausible.js"
      />
      <Script
        defer
        crossorigin="anonymous"
        src="https://cdn.splitbee.io/sb.js"
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
