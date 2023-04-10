// Import the functions you need from the SDKs you need
import { createContext, useState, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child, onChildAdded, query, 
    limitToLast, push, set, off, remove} from "firebase/database";
import { getCurrentTime } from '../../Functions/utilities';
 
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

// function date_to_string_with_milliseconds(date){
//     let date_str = date.toISOString() 
//     let date_without_milliseconds = new Date(date_str) // truncated date since milliseconds are not included
//     let milliseconds_delta = date - date_without_milliseconds
//     let date_str_with_milliseconds = date_str.replace(/(^.*:\d\d:\d\d)(.*$)/, `$1:${milliseconds_delta}000$2`)
//     return date_str_with_milliseconds
//   }


// Database Class for Firebase
class Database {

    constructor(app){
        this.database = getDatabase(app);
        this.listeners = [];
    }

    pushChildToRealTimeDatabase(path, data){
        const databaseRef = ref(this.database, path);
        const newKeyRef = push(databaseRef);
        set(newKeyRef, data)
        // alert("New Data Set")
    }

    pushWithKeyRealTimeDatabase(path, key, data){  
        const databaseRef = ref(this.database, path + "/" + key);
        set(databaseRef, data)
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
        let count = 0;
        onChildAdded(databaseRef, (snapshot) => {
            /**
             * Function Name: onChildAdded
             * data: I believe this data returns the most recently updated child.
             */
            const data = snapshot.val();
            data["dateTime"] = getCurrentTime();
            setData(data);

            
        });
        
        this.listeners.push(databaseRef);
    }

    fetchListOfChildren(path, child_key=null){
        const databaseRef = query(ref(this.database, path));
        let snapshot = get(databaseRef);
        let dict_obj = snapshot.val();
        if (child_key === null)
            return Object.keys(dict_obj)
        else 
            return Object.keys(dict_obj).map(key => dict_obj[key][child_key]);
    }

    
    getFetchPromise(path){
        const databaseRef = query(ref(this.database, path));
        let snapshotPromise = get(databaseRef);
        return snapshotPromise; 
    }

    deletePath(path){
        const databaseRef = ref(this.database, path);
        remove(databaseRef);
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