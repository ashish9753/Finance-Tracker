import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useState } from 'react'

const COLORS = ['#10b981','#f59e0b','#3b82f6','#ef4444','#8b5cf6','#06b6d4','#f97316','#ec4899','#14b8a6','#6366f1']

export default function SpendingChart({ txs, dark }) {
  const [view, setView] = useState('pie')

  const card = dark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200 shadow-sm'
  const muted = dark ? 'text-zinc-400' : 'text-gray-500'
  const tabActive = 'bg-emerald-500 text-white'
  const tabInactive = dark ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'

  const expenses = txs.filter(t => t.type === 'expense')

  // Category-wise totals for Pie chart
  const categoryMap = {}
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount)
  })
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  // Month-wise income vs expense for Bar chart
  const monthMap = {}
  txs.forEach(t => {
    const [year, month] = (t.date || '').split('-')
    if (!year || !month) return
    const key = `${year}-${month}`
    if (!monthMap[key]) monthMap[key] = { month: key, income: 0, expense: 0 }
    monthMap[key][t.type] += Number(t.amount)
  })
  const barData = Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month)).slice(-6).map(d => ({
    ...d,
    month: new Date(d.month + '-01').toLocaleString('default', { month: 'short', year: '2-digit' })
  }))

  const fmt = (v) => `₹${Number(v).toLocaleString('en-IN')}`

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className={`rounded-xl px-3 py-2 text-xs shadow-lg border ${dark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
        {label && <p className="font-semibold mb-1">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || p.fill }}>{p.name}: {fmt(p.value)}</p>
        ))}
      </div>
    )
  }

  if (!txs.length) return null

  return (
    <div className={`rounded-2xl border p-5 ${card}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm">Spending Analytics</h3>
        <div className="flex gap-1">
          {[{ key: 'pie', label: '🥧 Category' }, { key: 'bar', label: '📊 Monthly' }].map(({ key, label }) => (
            <button key={key} onClick={() => setView(key)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${view === key ? tabActive : tabInactive}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === 'pie' && (
        pieData.length === 0
          ? <p className={`text-center text-sm py-8 ${muted}`}>No expense data yet</p>
          : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap sm:flex-col gap-2 justify-center sm:justify-start">
                {pieData.slice(0, 6).map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className={`text-xs ${muted}`}>{d.name}</span>
                    <span className="text-xs font-semibold">{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )
      )}

      {view === 'bar' && (
        barData.length === 0
          ? <p className={`text-center text-sm py-8 ${muted}`}>No monthly data yet</p>
          : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barCategoryGap="30%" barGap={4}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: dark ? '#a1a1aa' : '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: dark ? '#a1a1aa' : '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )
      )}
    </div>
  )
}
