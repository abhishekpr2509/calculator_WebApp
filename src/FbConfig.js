// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEYZ9xLf-EednXw6gpbKEAV6VmI7s-CuI",
  authDomain: "t2calculatorapp.firebaseapp.com",
  projectId: "t2calculatorapp",
  storageBucket: "t2calculatorapp.appspot.com",
  messagingSenderId: "375473039706",
  appId: "1:375473039706:web:af31534bebf04d3f02ab63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
export { db };