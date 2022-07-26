
import '../styles/globals.css';
import Head from 'next/head';
import {authentication} from '../firebase-config';
import {useState, useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'next/router';

import { RecoilRoot, useRecoilState } from 'recoil';
//import {modalState} from '../atom/modalAtom';


function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //const [user0, setUser0] = useRecoilState(modalState);
  //console.log(user0)


  useEffect(() => {
    onAuthStateChanged(authentication, (currentUser) => { 
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.log('noooo');
      }
      setLoading(false);
      
    });
  }, [])


  if (loading) return <h1>Loading...</h1>

  if (user && Component.name === 'Login') {
    router.push('/');
    return <h1>Loading...</h1>
  }
  if (user == null && Component.name != 'Login') {
    router.push('/login');
    return <h1>Loading...</h1>
  }

  return (
    <RecoilRoot>
      <Head>
          <title>whatsapp clone</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} user={user} />
    </RecoilRoot>
  )
}

export default MyApp
