// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAC8wHh_iA8SDW8F4lzMM92oXSOmeP32M",
    authDomain: "instagram-clone-59a5e.firebaseapp.com",
    projectId: "instagram-clone-59a5e",
    storageBucket: "instagram-clone-59a5e.firebasestorage.app",
    messagingSenderId: "261690352007",
    appId: "1:261690352007:web:5004b2dec3fdf574b53322",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user;
    })
    .catch((error) => {
        console.log(error);
    })

    return user;

}