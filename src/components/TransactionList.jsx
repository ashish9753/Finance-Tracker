import { deleteTx } from '../services/transactions'

const CAT_ICONS = { Food: '🍔', Transport: '🚗', Shopping: '🛍️', Health: '❤️', Education: '📚', Entertainment: '🎬', Salary: '💼', Freelance: '💻', Investment: '📊', Other: '📌' }

export default function TransactionList({ txs, dark, onEdit }) {
  const muted = dark ? 'text-zinc-400' : 'text-gray-500'

  if (!txs.length) return (
    <div className={`animate-fadeIn rounded-2xl border p-14 text-center transition-colors ${
      dark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-100'
    }`}>
      <div className="text-5xl mb-4 animate-pulse-soft">📊</div>
      <p className="font-bold text-base">No transactions yet</p>
      <p className={`text-sm mt-1.5 ${muted}`}>Add your first transaction to get started</p>
    </div>
  )

  return (
    <div className="space-y-2.5">
      {txs.map((tx, i) => (
        <div
          key={tx.id}
          className={`animate-fadeInUp group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg
            ${ dark
              ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-black/40'
              : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-gray-100'
            }`}
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
            tx.type === 'income'
              ? 'bg-emerald-500/15 ring-1 ring-emerald-500/25'
              : 'bg-red-500/15 ring-1 ring-red-500/25'
          }`}>
            {CAT_ICONS[tx.category] || '📌'}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{tx.title}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                dark ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'
              }`}>{tx.category}</span>
              <span className={`text-xs ${muted}`}>· {tx.date}</span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p className={`font-bold text-sm ${
              tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
            </p>
            <div className="flex gap-1 mt-1.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(tx)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-150 hover:scale-105 active:scale-95 ${
                  dark ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >Edit</button>
              <button
                onClick={() => deleteTx(tx.id)}
                className="text-xs px-2.5 py-1 rounded-lg font-medium bg-red-500/15 hover:bg-red-500/30 text-red-400 transition-all duration-150 hover:scale-105 active:scale-95"
              >Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
