import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAMsA1469Fc4fw33ru6X4xZoxAExEsr3cs",
  authDomain: "supermarketbaby-f8e5a.firebaseapp.com",
  projectId: "supermarketbaby-f8e5a",
  storageBucket: "supermarketbaby-f8e5a.appspot.com",
  messagingSenderId: "867266491530",
  appId: "1:867266491530:web:47a4e5c6f10f0b3441a973",
  measurementId: "G-L6MCT6RC67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, addDoc };
