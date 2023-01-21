import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyC1MzWOe8TlU5wQ2SccO2h3DO-jHHH6AWE",
  authDomain: "salesmenu-b3a07.firebaseapp.com",
  projectId: "salesmenu-b3a07",
  storageBucket: "salesmenu-b3a07.appspot.com",
  messagingSenderId: "511341656211",
  appId: "1:511341656211:web:d6347f6f6c5544673df566",
  measurementId: "G-03RPD9BSWK",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
