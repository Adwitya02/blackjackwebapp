import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let authListenerAttached = false;

window.requireLogin = async function () {
  return new Promise((resolve) => {
    if (!authListenerAttached) {
      onAuthStateChanged(auth, (user) => {
        if (user) resolve(user);
      });
      authListenerAttached = true;
    }

    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const email = prompt("Enter email:");
    const pass = prompt("Enter password:");

    signInWithEmailAndPassword(auth, email, pass)
      .then((cred) => resolve(cred.user))
      .catch(async () => {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        resolve(cred.user);
      });
  });
};