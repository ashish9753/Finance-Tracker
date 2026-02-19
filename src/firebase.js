import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBHKCQWL61uUosB3J3KiomWu_DDwOchkbs",
  authDomain: "finance-tracker-9f707.firebaseapp.com",
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

// Initialize Firestore
export const db = getFirestore(app)

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
}).then(() => {
  console.log('✅ Firestore offline persistence enabled')
}).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('⚠️ Persistence failed: Multiple tabs open')
  } else if (err.code === 'unimplemented') {
    console.warn('⚠️ Persistence not available in this browser')
  } else {
    console.error('❌ Persistence error:', err)
  }
})

// Log Firebase initialization
console.log('🔥 Firebase initialized successfully')
console.log('📊 Project:', firebaseConfig.projectId)

