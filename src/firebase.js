import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBHKCQWL61uUosB3J3KiomWu_DDwOchkbs",
  authDomain: "finance-tracker-9f707.firebaseapp.com",
  databaseURL: "https://finance-tracker-9f707-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "finance-tracker-9f707",
  storageBucket: "finance-tracker-9f707.firebasestorage.app",
  messagingSenderId: "912284103772",
  appId: "1:912284103772:web:d9dbed3a765c9b48586299",
  measurementId: "G-M779PRHT3K"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Auth with persistence
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Auth persistence error:', error)
})

// Initialize Realtime Database
export const db = getDatabase(app)

console.log('Firebase initialized successfully')
console.log('Project:', firebaseConfig.projectId)
console.log('Database URL:', firebaseConfig.databaseURL)
console.log('Realtime Database initialized')