import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBHKCQWL61uUosB3J3KiomWu_DDwOchkbs",
  authDomain: "finance-tracker-9f707.firebaseapp.com",
  projectId: "finance-tracker-9f707",
  storageBucket: "finance-tracker-9f707.firebasestorage.app",
  messagingSenderId: "912284103772",
  appId: "1:912284103772:web:d9dbed3a765c9b48586299",
  measurementId: "G-M779PRHT3K"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
