import { Trash2 } from 'lucide-react'

const CATEGORY_BADGE = {
  Food: 'bg-orange-500/15 text-orange-300',
  Travel: 'bg-blue-500/15 text-blue-300',
  'Basic Needs': 'bg-green-500/15 text-green-300',
  Pleasure: 'bg-pink-500/15 text-pink-300',
}

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600 text-sm">
        No expenses to show.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transactions</h2>
      <ul className="space-y-2">
        {expenses.map(expense => (
          <li
            key={expense.id}
            className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_BADGE[expense.category] ?? 'bg-gray-700 text-gray-300'}`}>
                  {expense.category}
                </span>
                {expense.description && (
                  <span className="text-sm text-gray-200 truncate">{expense.description}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{formatDate(expense.date)}</p>
            </div>

            <span className="font-semibold text-white whitespace-nowrap">
              ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>

            <button
              onClick={() => onDelete(expense.id)}
              className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
              aria-label="Delete expense"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
