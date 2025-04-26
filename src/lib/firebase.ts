import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwOuoUk42OJI4-21iptUur_6M4ECLxnVI",
  authDomain: "anonymous-board-58d0d.firebaseapp.com",
  projectId: "anonymous-board-58d0d",
  storageBucket: "anonymous-board-58d0d.firebasestorage.app",
  messagingSenderId: "416141008041",
  appId: "1:416141008041:web:011cecdbd30aeca61dddb8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
