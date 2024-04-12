import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { firestore, getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCbwAE1uavXg0UZYFQcp74oLAXH_5EiPko",
    authDomain: "chatapp-3e18f.firebaseapp.com",
    projectId: "chatapp-3e18f",
    storageBucket: "chatapp-3e18f.appspot.com",
    messagingSenderId: "332214123188",
    appId: "1:332214123188:web:3608b66432d67873bff5e1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()
const storage = getStorage()
export { app, auth, db, storage }