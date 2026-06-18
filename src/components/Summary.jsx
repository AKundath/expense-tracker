const CATEGORY_COLORS = {
  Food: 'bg-orange-500',
  Travel: 'bg-blue-500',
  'Basic Needs': 'bg-green-500',
  Pleasure: 'bg-pink-500',
}

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Spent</p>
      <p className="text-4xl font-bold text-white mb-4">
        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>

      {Object.keys(byCategory).length > 0 && (
        <div className="space-y-2">
          {Object.entries(byCategory)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, amt]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${CATEGORY_COLORS[cat] ?? 'bg-gray-500'}`} />
                <span className="text-sm text-gray-300 flex-1">{cat}</span>
                <span className="text-sm font-medium text-white">
                  ₹{amt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-gray-500 w-10 text-right">
                  {total > 0 ? Math.round((amt / total) * 100) : 0}%
                </span>
              </div>
            ))}
        </div>
      )}

      {expenses.length === 0 && (
        <p className="text-gray-600 text-sm">No expenses yet.</p>
      )}
    </div>
  )
}
