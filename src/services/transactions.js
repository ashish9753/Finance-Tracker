import { ref, push, set, remove, onValue, off } from 'firebase/database'
import { db } from '../firebase'

// Get reference to user's transactions in the database
const getUserTransactionsRef = (uid) => ref(db, `users/${uid}/transactions`)

// Subscribe to real-time transaction updates for the logged-in user
export const subscribe = (uid, cb) => {
  console.log('📡 Subscribing to transactions for user:', uid)
  
  const userTransactionsRef = getUserTransactionsRef(uid)
  
  const handleData = (snapshot) => {
    const data = snapshot.val()
    let transactions = []
    
    if (data) {
      // Convert object to array and add IDs
      transactions = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))
      
      // Sort by creation time (newest first)
      transactions.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    }
    
    console.log('📥 Received transactions:', transactions.length)
    cb(transactions)
  }
  
  const handleError = (error) => {
    console.error('❌ Database subscription error:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
  }
  
  // Set up real-time listener
  onValue(userTransactionsRef, handleData, handleError)
  
  // Return unsubscribe function
  return () => {
    off(userTransactionsRef, 'value', handleData)
  }
}

// Store transaction under user's data tree
export const addTx = async (uid, data) => {
  console.log('💾 Saving transaction...', { uid, data })
  
  try {
    // Validate data
    if (!uid) throw new Error('User ID is required')
    if (!data.title || !data.amount || !data.type) {
      throw new Error('Missing required fields')
    }

    const userTransactionsRef = getUserTransactionsRef(uid)
    
    const txData = { 
      ...data, 
      uid, 
      createdAt: Date.now(), // Using timestamp for better sorting in Realtime Database
      amount: parseFloat(data.amount) // Ensure amount is a number
    }
    
    // Push creates a new child with auto-generated key
    const newTxRef = push(userTransactionsRef)
    await set(newTxRef, txData)
    
    console.log('Transaction saved successfully! ID:', newTxRef.key)
    return { id: newTxRef.key }
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
// Update transaction while preserving user ownership
export const updateTx = async (id, uid, data) => {
  console.log('✏️ Updating transaction:', id)
  
  try {
    if (!id || !uid) throw new Error('Transaction ID and User ID are required')
    
    const transactionRef = ref(db, `users/${uid}/transactions/${id}`)
    
    const txData = {
      ...data,
      uid,
      amount: parseFloat(data.amount),
      updatedAt: Date.now()
    }
    
    await set(transactionRef, txData)
    console.log('Transaction updated successfully!')
  } catch (error) {
    console.error('Failed to update transaction:', error)
    throw error
  }
}

export const deleteTx = async (id, uid) => {
  console.log('🗑️ Deleting transaction:', id)
  
  try {
    if (!id || !uid) throw new Error('Transaction ID and User ID are required')
    
    const transactionRef = ref(db, `users/${uid}/transactions/${id}`)
    await remove(transactionRef)
    console.log('Transaction deleted successfully!')
  } catch (error) {
    console.error('Failed to delete transaction:', error)
    throw error
  }
}
