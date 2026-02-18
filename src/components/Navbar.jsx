import { logout } from '../services/auth'

export default function Navbar({ user, dark, setDark, onAdd }) {
  const nav = dark
    ? 'bg-black/80 backdrop-blur-md border-white/5 text-white'
    : 'bg-white/80 backdrop-blur-md border-gray-200/80 text-gray-900 shadow-sm'

  return (
    <nav className={`sticky top-0 z-50 border-b px-6 py-3.5 flex items-center justify-between transition-colors duration-300 animate-slideDown ${nav}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/30">
          ₹
        </div>
        <div>
          <span className="font-bold text-base hidden sm:block tracking-tight">FinanceTracker</span>
          <span className="text-[10px] hidden sm:block text-emerald-500 font-medium -mt-0.5">Personal Finance</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden sm:flex items-center gap-1">
        <span className={`text-sm font-semibold px-3.5 py-1.5 rounded-xl ${
          dark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
        }`}>
          📊 Dashboard
        </span>
        <button
          onClick={onAdd}
          className="text-sm font-semibold px-3.5 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/25 ml-1"
        >
          + Add Transaction
        </button>
      </div>

      {/* Profile + Controls */}
      <div className="flex items-center gap-2">
        <div className={`hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border ${dark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          {user?.email}
        </div>
        <button
          onClick={() => setDark(!dark)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all duration-200 hover:scale-110 active:scale-95 ${dark ? 'bg-zinc-800 hover:bg-zinc-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
        >
          {dark ? '☀️' : '🌙'}
        </button>
        <button
          onClick={logout}
          className="text-xs bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-3.5 py-1.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
