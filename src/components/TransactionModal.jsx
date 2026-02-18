import { useState } from 'react'
import { addTx, updateTx } from '../services/transactions'

const CATS = ['Food', 'Transport', 'Shopping', 'Health', 'Education', 'Entertainment', 'Salary', 'Freelance', 'Investment', 'Other']

export default function TransactionModal({ uid, dark, onClose, editItem }) {
  const [form, setForm] = useState(editItem ? { title: editItem.title, amount: editItem.amount, type: editItem.type, category: editItem.category, date: editItem.date } : { title: '', amount: '', type: 'expense', category: 'Other', date: new Date().toISOString().split('T')[0] })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    editItem ? await updateTx(editItem.id, form) : await addTx(uid, form)
    setLoading(false)
    onClose()
  }

  const overlay = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn'
  const modal = dark
    ? 'bg-zinc-950 border border-zinc-800/80 text-white shadow-2xl shadow-black/60'
    : 'bg-white border border-gray-200 text-gray-900 shadow-2xl shadow-gray-200/60'
  const input = dark
    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:bg-zinc-800/80'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:bg-white'
  const label = dark ? 'text-zinc-400' : 'text-gray-500'

  return (
    <div className={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`animate-scaleIn w-full max-w-md rounded-2xl p-6 ${modal}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">{editItem ? 'Edit Transaction' : 'New Transaction'}</h3>
            <p className={`text-xs mt-0.5 ${dark ? 'text-zinc-500' : 'text-gray-400'}`}>{editItem ? 'Update the details below' : 'Fill in the details below'}</p>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-150 hover:scale-110 active:scale-90 ${
              dark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
            }`}
          >✕</button>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div className={`grid grid-cols-2 gap-2 p-1 rounded-xl ${
            dark ? 'bg-zinc-900' : 'bg-gray-100'
          }`}>
            {['expense', 'income'].map(t => (
              <button
                type="button" key={t} onClick={() => set('type', t)}
                className={`py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                  form.type === t
                    ? t === 'income'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md shadow-red-500/30'
                    : dark ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t === 'income' ? '📈 Income' : '📉 Expense'}
              </button>
            ))}
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase tracking-wide ${label}`}>Title</label>
            <input className={`mt-1.5 w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${input}`} placeholder="e.g. Grocery Shopping" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase tracking-wide ${label}`}>Amount (₹)</label>
            <input className={`mt-1.5 w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${input}`} type="number" min="0" step="0.01" placeholder="0.00" value={form.amount} onChange={e => set('amount', e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase tracking-wide ${label}`}>Category</label>
              <select className={`mt-1.5 w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${input}`} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase tracking-wide ${label}`}>Date</label>
              <input className={`mt-1.5 w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${input}`} type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/30 mt-2"
          >
            {loading ? '⏳ Saving...' : editItem ? '✅ Update Transaction' : '➕ Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  )
}
