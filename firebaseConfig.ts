import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpt5IiLZKTxr9bi0jfMkZl_pbnSAq7jZ4",
  authDomain: "postureapp-654b1.firebaseapp.com",
  projectId: "postureapp-654b1",
  storageBucket: "postureapp-654b1.appspot.com",
  messagingSenderId: "1059047809009",
  appId: "1:1059047809009:web:29382eafa74fab1fa1ee50",
  measurementId: "G-DJHNNVPRMP"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

