import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage"

const firebaseConfig = {
  apiKey: "AIzaSyBE2KYC-yd__rdy2r5a2QtLkH0uza_KHbM",

  authDomain: "wastebin-2eb92.firebaseapp.com",

  projectId: "wastebin-2eb92",

  storageBucket: "wastebin-2eb92.appspot.com",

  messagingSenderId: "774926963229",

  appId: "1:774926963229:web:e3e8eea4d2181a99872cf4",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
