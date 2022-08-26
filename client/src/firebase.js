// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3kGvZ7zL3gUQAvKi-Ln78KNZcG5bPnD4",
  authDomain: "chat-4c2cb.firebaseapp.com",
  databaseURL: "https://chat-4c2cb.firebaseio.com",
  projectId: "chat-4c2cb",
  storageBucket: "chat-4c2cb.appspot.com",
  messagingSenderId: "783051458745",
  appId: "1:783051458745:web:094ac5254aef58a8ebf368"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)