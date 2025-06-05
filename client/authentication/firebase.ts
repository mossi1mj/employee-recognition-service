// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbjHiFCrK2L6SZrthZh_bAHdgcLRHEptM",
  authDomain: "glassy-droplet-347916.firebaseapp.com",
  projectId: "glassy-droplet-347916",
  storageBucket: "glassy-droplet-347916.firebasestorage.app",
  messagingSenderId: "497787108233",
  appId: "1:497787108233:web:eaa438cc7fa9fae7e6bf58",
  measurementId: "G-GEV6PF2V0B",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

auth.useDeviceLanguage(); // Set the auth language to the device's language

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_FIREBASE_REDIRECT_URL || "",
  handleCodeInApp: true,
};

export {
  auth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
};
