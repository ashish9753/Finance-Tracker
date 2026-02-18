export default function SummaryCards({ txs, dark }) {
  const income  = txs.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  const balance = income - expense
  const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  const cards = [
    {
      label: 'Total Balance',
      value: fmt(balance),
      change: balance >= 0 ? 'Positive' : 'Negative',
      color: balance >= 0 ? 'text-emerald-400' : 'text-red-400',
      gradient: balance >= 0 ? 'from-emerald-500/20 to-teal-500/5' : 'from-red-500/20 to-rose-500/5',
      border: balance >= 0 ? (dark ? 'border-emerald-500/20' : 'border-emerald-200') : (dark ? 'border-red-500/20' : 'border-red-200'),
      icon: '💰',
      iconBg: balance >= 0 ? 'bg-emerald-500/15 ring-1 ring-emerald-500/20' : 'bg-red-500/15 ring-1 ring-red-500/20',
      stagger: 'stagger-1',
    },
    {
      label: 'Total Income',
      value: fmt(income),
      change: `${txs.filter(t => t.type === 'income').length} transactions`,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500/15 to-green-500/5',
      border: dark ? 'border-emerald-500/15' : 'border-emerald-100',
      icon: '📈',
      iconBg: 'bg-emerald-500/15 ring-1 ring-emerald-500/20',
      stagger: 'stagger-2',
    },
    {
      label: 'Total Expenses',
      value: fmt(expense),
      change: `${txs.filter(t => t.type === 'expense').length} transactions`,
      color: 'text-red-400',
      gradient: 'from-red-500/15 to-rose-500/5',
      border: dark ? 'border-red-500/15' : 'border-red-100',
      icon: '📉',
      iconBg: 'bg-red-500/15 ring-1 ring-red-500/20',
      stagger: 'stagger-3',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {cards.map(c => (
        <div
          key={c.label}
          className={`animate-fadeInUp ${c.stagger} relative rounded-2xl border p-6 bg-gradient-to-br ${c.gradient} ${c.border} overflow-hidden group cursor-default
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            dark ? 'hover:shadow-black/30' : 'hover:shadow-gray-200/80'
          }`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.02] rounded-2xl" />
          <div className="flex items-center justify-between mb-5">
            <span className={`text-sm font-semibold tracking-wide uppercase ${dark ? 'text-zinc-400' : 'text-gray-500'}`}>{c.label}</span>
            <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110`}>
              {c.icon}
            </div>
          </div>
          <p className={`text-3xl font-bold tracking-tight ${c.color}`}>{c.value}</p>
          <p className={`text-sm mt-2 ${dark ? 'text-zinc-500' : 'text-gray-400'}`}>{c.change}</p>
        </div>
      ))}
    </div>
  )
}
