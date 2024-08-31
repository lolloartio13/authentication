// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLRHy3I1gdcZ_zvgkulzgioiDUrzv0nq0",
  authDomain: "auth-project-da682.firebaseapp.com",
  projectId: "auth-project-da682",
  storageBucket: "auth-project-da682.appspot.com",
  messagingSenderId: "684364656708",
  appId: "1:684364656708:web:0c80525cc5764b7d3e0c11",
  measurementId: "G-XQ0VRDQBJK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };