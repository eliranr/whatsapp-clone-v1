import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCSb6iyTkMQsvxrfX8V2_HbQXpaKnZC730",
    authDomain: "whatsapp-clone-61f24.firebaseapp.com",
    projectId: "whatsapp-clone-61f24",
    storageBucket: "whatsapp-clone-61f24.appspot.com",
    messagingSenderId: "801084856438",
    appId: "1:801084856438:web:a24210d096738fe5772757"
};



// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const authentication = getAuth(app);
const db = getFirestore();
const storage = getStorage();
export {authentication, db, storage};