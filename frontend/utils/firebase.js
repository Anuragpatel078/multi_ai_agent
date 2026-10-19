// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codeverse-671ed.firebaseapp.com",
  projectId: "codeverse-671ed",
  storageBucket: "codeverse-671ed.firebasestorage.app",
  messagingSenderId: "677172135331",
  appId: "1:677172135331:web:77d22c4c70143fc8f78616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)
 export const googleProvider=new GoogleAuthProvider()