import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const col = (uid) => query(collection(db, 'transactions'), where('uid', '==', uid), orderBy('createdAt', 'desc'))

export const subscribe = (uid, cb) => onSnapshot(col(uid), snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))))

export const addTx = (uid, data) => addDoc(collection(db, 'transactions'), { ...data, uid, createdAt: serverTimestamp() })

export const updateTx = (id, data) => updateDoc(doc(db, 'transactions', id), data)

export const deleteTx = (id) => deleteDoc(doc(db, 'transactions', id))
