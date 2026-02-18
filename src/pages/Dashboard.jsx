import { useState, useEffect } from 'react'
import { subscribe } from '../services/transactions'
import Navbar from '../components/Navbar'
import SummaryCards from '../components/SummaryCards'
import SpendingChart from '../components/SpendingChart'
import TransactionList from '../components/TransactionList'
import TransactionModal from '../components/TransactionModal'

export default function Dashboard({ user, dark, setDark }) {
  const [txs, setTxs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => subscribe(user.uid, setTxs), [user.uid])

  const filtered = txs.filter(t => {
    if (filter !== 'all' && t.type !== filter) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.category.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const openAdd = () => { setEditItem(null); setShowModal(true) }
  const openEdit = (tx) => { setEditItem(tx); setShowModal(true) }

  const base = dark
    ? 'bg-[#09090b] text-white min-h-screen'
    : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 text-gray-900 min-h-screen'
  const searchInput = dark
    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-emerald-500/50'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400'
  const filterBtn = (v) =>
    `text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
      filter === v
        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25'
        : dark ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
    }`

  return (
    <div className={`transition-colors duration-300 ${base}`}>
      <Navbar user={user} dark={dark} setDark={setDark} onAdd={openAdd} />
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <SummaryCards txs={txs} dark={dark} />
        <SpendingChart txs={txs} dark={dark} />

        <div className={`animate-fadeInUp stagger-2 flex flex-col sm:flex-row gap-3 p-3 rounded-2xl border ${
          dark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-gray-100 shadow-sm'
        }`}>
          <input
            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${searchInput}`}
            placeholder="🔍  Search by title or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-1.5">
            {['all', 'income', 'expense'].map(v => (
              <button key={v} onClick={() => setFilter(v)} className={filterBtn(v)}>
                {v === 'all' ? 'All' : v === 'income' ? '📈 Income' : '📉 Expense'}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-fadeInUp stagger-3 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base">Transactions</h2>
            <p className={`text-xs mt-0.5 ${dark ? 'text-zinc-500' : 'text-gray-400'}`}>{filtered.length} record{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30"
          >
            <span className="text-lg leading-none">+</span> Add Transaction
          </button>
        </div>

        <TransactionList txs={filtered} dark={dark} onEdit={openEdit} />
      </main>

      {/* Floating Action Button */}
      <button
        onClick={openAdd}
        title="Add Transaction"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-2xl font-bold shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      >
        +
      </button>

      {showModal && <TransactionModal uid={user.uid} dark={dark} onClose={() => setShowModal(false)} editItem={editItem} />}
    </div>
  )
}
