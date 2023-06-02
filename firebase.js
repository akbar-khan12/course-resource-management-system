
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdY-BlJCPgmzDlBKN6uoLRW1Z1qQRGKZA",
  authDomain: "se-proj-58e24.firebaseapp.com",
  projectId: "se-proj-58e24",
  storageBucket: "se-proj-58e24.appspot.com",
  messagingSenderId: "399580520648",
  appId: "1:399580520648:web:43fe3914f53dda6bbb85fd",
  measurementId: "G-WZF5MX4NC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const adminApp = initializeApp(firebaseConfig, "admin");
const adminAuth = getAuth(adminApp);
const db = getDatabase();
const storage= getStorage(app);
// const db1= getFirestore(firebaseApp);

export {db,app,adminAuth,auth, storage}