// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNF3Gqcsidvi1vbEcJ1pOiVmj8KIwRUjI",
    authDomain: "edeno-b66fc.firebaseapp.com",
    databaseURL: "https://edeno-b66fc-default-rtdb.firebaseio.com",
    projectId: "edeno-b66fc",
    storageBucket: "edeno-b66fc.appspot.com",
    messagingSenderId: "202858629259",
    appId: "1:202858629259:web:1473dc728bf62238b5ec8e",
    measurementId: "G-SCBVHJFE4Y"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);