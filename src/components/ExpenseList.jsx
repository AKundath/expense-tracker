import { Trash2 } from 'lucide-react'

const CATEGORY_BADGE = {
  Food: 'bg-orange-500/20 text-orange-300',
  Travel: 'bg-blue-500/20 text-blue-300',
  'Basic Needs': 'bg-green-500/20 text-green-300',
  Pleasure: 'bg-pink-500/20 text-pink-300',
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
      <div
        className="rounded-2xl p-8 backdrop-blur-2xl text-center"
        style={{
          background: 'rgba(0, 0, 0, 0.30)',
          border: '1.5px solid rgba(255, 140, 0, 0.75)',
          boxShadow: `
            0 0 8px rgba(255, 140, 0, 0.6),
            0 0 24px rgba(255, 140, 0, 0.25),
            inset 0 0 30px rgba(255, 140, 0, 0.04)
          `,
        }}
      >
        <p className="text-white/30 text-sm">No expenses to show.</p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-5 backdrop-blur-2xl"
      style={{
        background: 'rgba(0, 0, 0, 0.30)',
        border: '1.5px solid rgba(255, 140, 0, 0.75)',
        boxShadow: `
          0 0 8px rgba(255, 140, 0, 0.6),
          0 0 24px rgba(255, 140, 0, 0.25),
          inset 0 0 30px rgba(255, 140, 0, 0.04)
        `,
      }}
    >
      {/* Neon sign header */}
      <h2
        className="text-sm font-bold uppercase tracking-widest mb-4"
        style={{
          color: '#ff8c00',
          textShadow: '0 0 4px #ff8c00, 0 0 12px #ff8c00, 0 0 28px #ff6000, 0 0 50px #ff4000',
        }}
      >
        ✦ Transactions ✦
      </h2>

      <ul className="space-y-2">
        {expenses.map(expense => (
          <li
            key={expense.id}
            className="rounded-xl px-4 py-3 flex items-center gap-4 backdrop-blur-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.20)',
              border: '1px solid rgba(255, 140, 0, 0.25)',
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_BADGE[expense.category] ?? 'bg-white/10 text-white/60'}`}>
                  {expense.category}
                </span>
                {expense.description && (
                  <span className="text-sm text-white/80 truncate">{expense.description}</span>
                )}
              </div>
              <p className="text-xs text-white/35 mt-0.5">{formatDate(expense.date)}</p>
            </div>

            <span className="font-semibold text-white whitespace-nowrap">
              ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>

            <button
              onClick={() => onDelete(expense.id)}
              className="text-white/25 hover:text-red-400 transition-colors flex-shrink-0"
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
