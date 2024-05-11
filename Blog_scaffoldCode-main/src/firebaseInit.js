// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2b5icW5WRBpchbYFmRytxeL8hIQY-skg",
  authDomain: "my-blogs-b015e.firebaseapp.com",
  projectId: "my-blogs-b015e",
  storageBucket: "my-blogs-b015e.appspot.com",
  messagingSenderId: "513866914416",
  appId: "1:513866914416:web:c93ba7c6175becfbf772b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)