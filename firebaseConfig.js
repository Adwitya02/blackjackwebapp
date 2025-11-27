import { initializeApp } from
import { getAuth } from 
import { getFirestore } from 

const firebaseConfig = {
  apiKey:
  authDomain:
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
