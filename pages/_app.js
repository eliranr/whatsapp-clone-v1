
import '../styles/globals.css';
import Head from 'next/head';
import {authentication} from '../firebase-config';
import {useState, useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'next/router';

import { RecoilRoot } from 'recoil';
import {db} from '../firebase-config';
import { onSnapshot, doc, collection, query, orderBy, where, getDocs } from 'firebase/firestore';



function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [dataMessages1, setDataMessages1] = useState([]);
  const [dataMessages2, setDataMessages2] = useState([]);



  useEffect(() => {
    if (user != null) {
      try {
        onSnapshot(
          doc(db, 'contacts', user.uid), (snapshot) => {
            if (snapshot.data() != null) {
              setContacts(snapshot.data().list);
            } else {
              setContacts([]);
            }
          }
        )
      } catch (err) {
        console.log(err);
      }
      
    }
  }, [db, user]);



  ///////// start ////

  useEffect(() => {
    if (user == null) return;
    onSnapshot(
      query(collection(db, 'messages'), where("from", "==", user.phoneNumber)), (snapshot) => {
        setDataMessages1([...snapshot.docs, ...dataMessages1]);
      }
    )
    onSnapshot(
      query(collection(db, 'messages'), where("to", "==", user.phoneNumber)), (snapshot) => {
        setDataMessages2([...snapshot.docs, ...dataMessages2]);
      }
    )




    
  }, [db, user]);

  const sortTime = (array) => {
    return array.sort((a, b) => {
      try {
        return b.data().timestamp.valueOf() - a.data().timestamp.valueOf()
      } catch(err) {
        //console.log(a.data().timestamp)
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(authentication, (currentUser) => { 
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setContacts(null)
        setDataMessages1([])
        setDataMessages2([])
        setContacts(null)
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
  if (user && contacts == null) {
    return <h1>Loading...</h1>
  }
  return (
    <RecoilRoot>
      <Head>
          <title>whatsapp clone</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} user={user} contacts={contacts} dataMessages={sortTime([...dataMessages1, ...dataMessages2])} />
    </RecoilRoot>
  )
}

export default MyApp
