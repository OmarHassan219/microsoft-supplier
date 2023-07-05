import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbcz_6j1JnaSlzBw-jEMVczq3itPCk1bM",
    authDomain: "supplier-34b95.firebaseapp.com",
    projectId: "supplier-34b95",
    storageBucket: "supplier-34b95.appspot.com",
    messagingSenderId: "802599623168",
    appId: "1:802599623168:web:6c7475fee5bd9da3d0d6e5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const Storage = getStorage(app);
export const db = getFirestore(app);