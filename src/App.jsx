import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import FilterBar from './components/FilterBar'
import NotesPanel from './components/NotesPanel'
import PieChart from './components/PieChart'
import ClockWidget from './components/ClockWidget'
import TodayWidget from './components/TodayWidget'

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
    <div className="relative min-h-screen text-gray-100">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/lai-man-nung-keZPESSP6uI-unsplash.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/50" />

      <div className="relative z-10">
        <header className="border-b border-white/10 backdrop-blur-md bg-black/20 px-4 py-5">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white tracking-tight">Expense Tracker</h1>
            <p className="text-white/50 text-sm mt-0.5">Personal daily expense manager</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">

          {/* Top: Notes | Summary+Form | PieChart */}
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 items-stretch mb-4">

            {/* Left: Notes Panel — stretches to match center height */}
            <NotesPanel />

            {/* Center: Summary + Add Expense */}
            <div className="space-y-4">
              <Summary expenses={filtered} />
              <ExpenseForm categories={CATEGORIES} onAdd={addExpense} />
            </div>

            {/* Right: Pie Chart only — static square */}
            <div className="self-start">
              <PieChart expenses={filtered} />
            </div>

          </div>

          {/* Bottom: Clock | FilterBar+Transactions | TodayWidget */}
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
            <div className="self-start">
              <ClockWidget />
            </div>
            <div className="space-y-4">
              <FilterBar categories={CATEGORIES} filter={filter} onChange={setFilter} />
              <ExpenseList expenses={filtered} onDelete={deleteExpense} />
            </div>
            <div className="self-start">
              <TodayWidget expenses={expenses} />
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
