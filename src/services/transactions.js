import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from '../firebase'

// Only fetch transactions belonging to the logged-in user
const col = (uid) => query(collection(db, 'transactions'), where('uid', '==', uid), orderBy('createdAt', 'desc'))

export const subscribe = (uid, cb) => {
  console.log('📡 Subscribing to transactions for user:', uid)
  return onSnapshot(col(uid), 
    (snap) => {
      const txs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      console.log('📥 Received transactions:', txs.length)
      cb(txs)
    },
    (error) => {
      console.error('❌ Subscription error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
    }
  )
}

// Store uid with every transaction so it's scoped to the user
export const addTx = async (uid, data) => {
  console.log('💾 Saving transaction...', { uid, data })
  
  try {
    // Validate data
    if (!uid) throw new Error('User ID is required')
    if (!data.title || !data.amount || !data.type) {
      throw new Error('Missing required fields')
    }

    const txData = { 
      ...data, 
      uid, 
      createdAt: serverTimestamp(),
      amount: parseFloat(data.amount) // Ensure amount is a number
    }
    
    const docRef = await addDoc(collection(db, 'transactions'), txData)
    console.log('Transaction saved successfully! ID:', docRef.id)
    return docRef
  } catch (error) {
    console.error('Failed to save transaction:', error)
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      uid,
      data
    })
    throw error
  }
}

// Preserve uid on update so ownership is never lost
export const updateTx = async (id, uid, data) => {
  console.log('✏️ Updating transaction:', id)
  
  try {
    if (!id || !uid) throw new Error('Transaction ID and User ID are required')
    
    const txData = {
      ...data,
      uid,
      amount: parseFloat(data.amount),
      updatedAt: serverTimestamp()
    }
    
    await updateDoc(doc(db, 'transactions', id), txData)
    console.log('Transaction updated successfully!')
  } catch (error) {
    console.error('Failed to update transaction:', error)
    throw error
  }
}

export const deleteTx = async (id) => {
  console.log('🗑️ Deleting transaction:', id)
  
  try {
    if (!id) throw new Error('Transaction ID is required')
    
    await deleteDoc(doc(db, 'transactions', id))
    console.log('Transaction deleted successfully!')
  } catch (error) {
    console.error('Failed to delete transaction:', error)
    throw error
  }
}
