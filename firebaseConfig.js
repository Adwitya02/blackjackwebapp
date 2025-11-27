import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDF2ltsfcjgRu4qn83Sic_kVKnJWWnH3GE",
  authDomain: "blackjackwebapp-adwitya.firebaseapp.com",
  projectId: "blackjackwebapp-adwitya",
  storageBucket: "blackjackwebapp-adwitya.appspot.com",
  messagingSenderId: "628143120072",
  appId: "1:628143120072:web:7ee3925e15c59f4a06cffd"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
