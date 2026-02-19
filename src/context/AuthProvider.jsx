import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `Logged in as ${user.email} (uid: ${user.uid})` : 'Not logged in')
      setUser(user)
    })
    return unsubscribe
  }, [])
  if (user === undefined) return null
  return <AuthCtx.Provider value={user}>{children}</AuthCtx.Provider>
}
