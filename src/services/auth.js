import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const login = (e, p) => signInWithEmailAndPassword(auth, e, p)
export const register = (e, p) => createUserWithEmailAndPassword(auth, e, p)
export const logout = () => signOut(auth)
