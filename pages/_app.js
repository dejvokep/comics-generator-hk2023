import '../styles/globals.css'
import {Fragment} from "react";
import Head from "next/head";
import Menu from "../components/Menu";

function MyApp({ Component, pageProps }) {
  return <Fragment>
    <Head>
      <title>Telecomic</title>
      <meta name="description" content="DESC" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Menu />
    <Component {...pageProps} />
  </Fragment>
}

export default MyApp
