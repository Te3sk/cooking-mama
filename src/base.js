// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {
  getAuth,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp6rc8pQ9SjCtWw73dL3fS8Uth7DoY2LI",
  authDomain: "cooking-mama-ef8f5.firebaseapp.com",
  projectId: "cooking-mama-ef8f5",
  storageBucket: "cooking-mama-ef8f5.appspot.com",
  messagingSenderId: "981873181578",
  appId: "1:981873181578:web:3a433a51ed8f498f3ffe73",
  measurementId: "G-TQZKCWLEHY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
