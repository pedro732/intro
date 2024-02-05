import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDNxFi7l8QaT1dvphHItFVBtGUAzTfTFO4",
    authDomain: "intro-9757d.firebaseapp.com",
    projectId: "intro-9757d",
    storageBucket: "intro-9757d.appspot.com",
    messagingSenderId: "82609994339",
    appId: "1:82609994339:web:fa6da5a911096623ead656",
    measurementId: "G-HCJ69XRED1"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();