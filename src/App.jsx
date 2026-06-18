import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import FilterBar from './components/FilterBar'

export const CATEGORIES = ['Food', 'Travel', 'Basic Needs', 'Pleasure']

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const [filter, setFilter] = useState({ category: 'All', month: '' })

  function addExpense(expense) {
    setExpenses(prev => [{ ...expense, id: crypto.randomUUID() }, ...prev])
  }

  function deleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const filtered = expenses.filter(e => {
    const categoryMatch = filter.category === 'All' || e.category === filter.category
    const monthMatch = !filter.month || e.date.startsWith(filter.month)
    return categoryMatch && monthMatch
  })

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-white tracking-tight">Expense Tracker</h1>
          <p className="text-gray-400 text-sm mt-0.5">Personal daily expense manager</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <Summary expenses={filtered} />
        <ExpenseForm categories={CATEGORIES} onAdd={addExpense} />
        <FilterBar categories={CATEGORIES} filter={filter} onChange={setFilter} />
        <ExpenseList expenses={filtered} onDelete={deleteExpense} />
      </main>
    </div>
  )
}
