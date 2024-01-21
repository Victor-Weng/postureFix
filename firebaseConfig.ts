/**
 * @jest-environment node
 */
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCcM98g4QOrZjHaRsH5lRr5_1JKgMmjgkE",
  authDomain: "testrun-c4232.firebaseapp.com",
  databaseURL: "https://testrun-c4232-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "testrun-c4232",
  storageBucket: "testrun-c4232.appspot.com",
  messagingSenderId: "692682631074",
  appId: "1:692682631074:web:658e19354294c15a7834fb"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

