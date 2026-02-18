import { useState } from 'react'
import { login, register } from '../services/auth'

export default function Login({ dark }) {
  const [isReg, setIsReg] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      isReg ? await register(email, pass) : await login(email, pass)
    } catch (er) {
      setErr(er.message.replace('Firebase: ', ''))
    }
    setLoading(false)
  }

  const base = dark
    ? 'bg-[#09090b] text-white'
    : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-gray-900'
  const card = dark
    ? 'bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black/60'
    : 'bg-white border border-gray-200/80 shadow-2xl shadow-gray-200/60'
  const input = dark
    ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-emerald-500/50'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400'

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${base}`}>
      <div className={`animate-scaleIn w-full max-w-sm p-8 rounded-3xl ${card}`}>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30">
            ₹
          </div>
          <div>
            <span className="font-bold text-lg leading-none block">FinanceTracker</span>
            <span className="text-xs text-emerald-500 font-medium">Personal Finance</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-1">{isReg ? 'Create account' : 'Welcome back'}</h2>
        <p className={`text-sm mb-6 ${dark ? 'text-zinc-400' : 'text-gray-500'}`}>
          {isReg ? 'Start tracking your finances today' : 'Sign in to your account'}
        </p>

        <form onSubmit={handle} className="space-y-3">
          <input
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${input}`}
            type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
          />
          <input
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/30 ${input}`}
            type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required
          />
          {err && (
            <div className="animate-fadeIn flex items-start gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
              <span>⚠️</span><span>{err}</span>
            </div>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/30 mt-1"
          >
            {loading ? '⏳ Please wait...' : isReg ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className={`text-center text-sm mt-5 ${dark ? 'text-zinc-400' : 'text-gray-500'}`}>
          {isReg ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsReg(!isReg)}
            className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
          >
            {isReg ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}
