import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

const today = () => new Date().toISOString().split('T')[0]

const EMPTY = { amount: '', category: '', description: '', date: today() }

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
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              <option value="" disabled>Select…</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Description <span className="text-gray-600">(optional)</span></label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Lunch, Uber"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2.5 transition-colors"
        >
          <PlusCircle size={18} />
          Add Expense
        </button>
      </form>
    </div>
  )
}
