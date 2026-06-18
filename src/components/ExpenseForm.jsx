import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

const today = () => new Date().toISOString().split('T')[0]

const EMPTY = { amount: '', category: '', description: '', date: today() }

const inputClass = "bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-blue-400/60 focus:border-blue-400/40 backdrop-blur-sm transition-all"

export default function ExpenseForm({ categories, onAdd }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError('Enter a valid amount.')
      return
    }
    if (!form.category) {
      setError('Select a category.')
      return
    }
    if (!form.date) {
      setError('Pick a date.')
      return
    }
    onAdd({ ...form, amount: parseFloat(Number(form.amount).toFixed(2)) })
    setForm(EMPTY)
  }

  return (
    <div
      className="rounded-2xl p-5 backdrop-blur-2xl"
      style={{
        background: 'rgba(0, 0, 0, 0.30)',
        border: '1.5px solid rgba(255, 30, 30, 0.75)',
        boxShadow: `
          0 0 8px rgba(255, 30, 30, 0.6),
          0 0 24px rgba(255, 30, 30, 0.25),
          0 0 8px rgba(30, 144, 255, 0.4),
          0 0 32px rgba(30, 144, 255, 0.15),
          inset 0 0 30px rgba(255, 30, 30, 0.04),
          inset 0 0 60px rgba(30, 144, 255, 0.04)
        `,
      }}
    >
      {/* Neon sign header */}
      <h2
        className="text-sm font-bold uppercase tracking-widest mb-4"
        style={{
          color: '#ffe600',
          textShadow: '0 0 4px #ffe600, 0 0 12px #ffe600, 0 0 28px #ffaa00, 0 0 50px #ff8800',
        }}
      >
        ✦ Add Expense ✦
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40 tracking-wide">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40 tracking-wide">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled className="bg-gray-900">Select…</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40 tracking-wide">
              Description <span className="text-white/20">(optional)</span>
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Lunch, Uber"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40 tracking-wide">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        {/* Neon submit button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 transition-all backdrop-blur-sm"
          style={{
            background: 'rgba(0,0,0,0.55)',
            border: '2px solid rgba(255, 30, 30, 0.9)',
            boxShadow:
              '0 0 6px #ff1e1e, 0 0 18px #ff1e1e, 0 0 40px rgba(255,30,30,0.4), inset 0 0 12px rgba(255,30,30,0.08), 0 0 6px #1e90ff, 0 0 18px rgba(30,144,255,0.3)',
          }}
        >
          <PlusCircle
            size={20}
            style={{
              color: '#1e90ff',
              filter: 'drop-shadow(0 0 4px #1e90ff) drop-shadow(0 0 10px #1e90ff)',
            }}
          />
          <span
            className="font-bold tracking-widest uppercase text-sm"
            style={{
              color: '#ffe600',
              textShadow: '0 0 4px #ffe600, 0 0 12px #ffe600, 0 0 24px #ffaa00, 0 0 48px #ff8800',
            }}
          >
            Add Expense
          </span>
        </button>
      </form>
    </div>
  )
}
