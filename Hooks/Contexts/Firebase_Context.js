// Import the functions you need from the SDKs you need
import { createContext, useState, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, onChildAdded, query, limitToLast, push, set, off} from "firebase/database";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const DatabaseContext = createContext(null);

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

// Database Class for Firebase
class Database {

    constructor(app){
        this.database = getDatabase(app);
        this.listeners = [];
    }

    pushToRealTimeDatabase(path, data){
        const databaseRef = ref(this.database, path);
        const newKeyRef = push(databaseRef);
        set(newKeyRef, data)
        // alert("New Data Set")
    }

    // listenForData(path, setData){
    //     const databaseRef = query(ref(this.database, path), limitToLast(1));
    //     onValue(databaseRef, (snapshot) => {
    //         const data = snapshot.val();
    //         setData(data);
    //     })
    //     this.listeners.push(databaseRef);
    // }

    listenForChildUpdate(path, setData){

        // Initially receive only up to 1 child_added event
        const databaseRef = query(ref(this.database, path), limitToLast(1));

        onChildAdded(databaseRef, (snapshot) => {
            /**
             * Function Name: onChildAdded
             * data: I believe this data returns the most recently updated child.
             */
            let logData = (`${snapshot.key} : ${Date().toString()}`);
            console.log(logData);
            const data = snapshot.val();
            setData(data);
        });
        
        this.listeners.push(databaseRef);
    }

    getDataOnce(path, setData){
        const databaseRef = query(ref(this.database, path), limitToLast(100));
        get(child(databaseRef, path)).then((snapshot) => {
            if(snapshot.exists()){ setData(snapshot.val()); return; }
            alert("Data does not exist!")
        })
    }

    cleanListeners(){
        this.listeners.forEach((elem) => off(elem));
    }
}

export function FirebaseProvider({ children }) {
    const database = new Database(app);

    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    );
}

export function useFirebaseDatabase(){
    return useContext(DatabaseContext);
}