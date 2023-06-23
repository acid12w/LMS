// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIDJH4iOC5uOf4bNxYLuFFegMHySMwnoM",
  authDomain: "sg-lms.firebaseapp.com",
  databaseURL: "https://sg-lms-default-rtdb.firebaseio.com",
  projectId: "sg-lms",
  storageBucket: "sg-lms.appspot.com",
  messagingSenderId: "519431182661",
  appId: "1:519431182661:web:6e857fb14324cefc78462c",
  measurementId: "G-07FY6229SB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
