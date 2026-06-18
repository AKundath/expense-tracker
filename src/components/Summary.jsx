const CATEGORY_BADGE = {
  Food: 'bg-orange-500/20 text-orange-300',
  Travel: 'bg-blue-500/20 text-blue-300',
  'Basic Needs': 'bg-green-500/20 text-green-300',
  Pleasure: 'bg-pink-500/20 text-pink-300',
}

const CATEGORY_DOT = {
  Food: 'bg-orange-400',
  Travel: 'bg-blue-400',
  'Basic Needs': 'bg-green-400',
  Pleasure: 'bg-pink-400',
}

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  return (
    <div className="rounded-2xl p-5">
      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Total Spent</p>
      <p className="text-4xl font-bold text-white mb-4">
        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>

      {Object.keys(byCategory).length > 0 && (
        <div className="space-y-2">
          {Object.entries(byCategory)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, amt]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${CATEGORY_DOT[cat] ?? 'bg-gray-400'}`} />
                <span className="text-sm text-white/70 flex-1">{cat}</span>
                <span className="text-sm font-medium text-white">
                  ₹{amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-white/40 w-10 text-right">
                  {total > 0 ? Math.round((amt / total) * 100) : 0}%
                </span>
              </div>
            ))}
        </div>
      )}

      {expenses.length === 0 && (
        <p className="text-white/30 text-sm">No expenses yet.</p>
      )}
    </div>
  )
}
