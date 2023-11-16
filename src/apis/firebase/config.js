import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "mlist-f672c.firebaseapp.com",
    projectId: "mlist-f672c",
    storageBucket: "mlist-f672c.appspot.com",
    messagingSenderId: "645461914603",
    appId: "1:645461914603:web:7266a42308dc826cb81fae"
};

export const app = () => initializeApp(firebaseConfig);