// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUN4_WT_3L3ElLD-XF_4UafSSTG7B3Xpo",
  authDomain: "bpa-react.firebaseapp.com",
  projectId: "bpa-react",
  storageBucket: "bpa-react.appspot.com",
  messagingSenderId: "324739363539",
  appId: "1:324739363539:web:5b7a2234bf24350a2e1a26",
  measurementId: "G-6EQXTPVF0J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);