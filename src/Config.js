// file name Config.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // if you're using Firestore




const firebaseConfig = {
  apiKey: "AIzaSyBQt9Evf85BRa32CwHFUYpGjGVqmzlte8o",
  authDomain: "contect-51585.firebaseapp.com",
  projectId: "contect-51585",
  storageBucket: "contect-51585.appspot.com",
  messagingSenderId: "617908313229",
  appId: "1:617908313229:web:b9da7af2f5cd2ba9fbd6c4"
};




const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default app;

