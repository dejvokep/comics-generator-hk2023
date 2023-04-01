import '../styles/globals.css'
import {Fragment} from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <Fragment>
    <Head>
      <title>NAME</title>
      <meta name="description" content="DESC" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Component {...pageProps} />
  </Fragment>
}

export default MyApp
