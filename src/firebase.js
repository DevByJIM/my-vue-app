import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC7jev_JuA-3rCheZKTnWblVNmmXyItwYY",
  authDomain: "react-2022-d5775.firebaseapp.com",
  projectId: "react-2022-d5775",
  storageBucket: "react-2022-d5775.appspot.com",
  messagingSenderId: "827854140899",
  appId: "1:827854140899:web:2359b2d20c697ed9129cd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth
};