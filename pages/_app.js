
import '../styles/globals.css';
import Converations from '../components/Converations';
import Head from 'next/head'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <Head>
          <title>whatsapp clone</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
