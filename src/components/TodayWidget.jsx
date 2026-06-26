const todayISO = () => new Date().toISOString().split('T')[0]

const CATEGORY_BADGE = {
  Food: 'bg-orange-500/20 text-orange-300',
  Travel: 'bg-blue-500/20 text-blue-300',
  'Basic Needs': 'bg-green-500/20 text-green-300',
  Pleasure: 'bg-pink-500/20 text-pink-300',
}

export default function TodayWidget({ expenses }) {
  const today = todayISO()
  const todayExpenses = expenses.filter(e => e.date === today)
  const total = todayExpenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div
      className="w-full rounded-2xl p-4 backdrop-blur-2xl"
      style={{
        background: 'rgba(0, 0, 0, 0.30)',
        border: '1.5px solid rgba(34, 197, 94, 0.75)',
        boxShadow: `
          0 0 8px rgba(34, 197, 94, 0.5),
          0 0 24px rgba(34, 197, 94, 0.2),
          inset 0 0 30px rgba(34, 197, 94, 0.04)
        `,
      }}
    >
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-3 text-center"
        style={{
          color: '#4ade80',
          textShadow: '0 0 4px #4ade80, 0 0 12px #22c55e, 0 0 24px #16a34a',
        }}
      >
        ✦ Today ✦
      </h2>

      <p className="text-white text-2xl font-bold text-center leading-none mb-1">
        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-white/35 text-xs text-center mb-3">
        {todayExpenses.length} transaction{todayExpenses.length !== 1 ? 's' : ''}
      </p>

      {todayExpenses.length === 0 ? (
        <p className="text-white/25 text-xs text-center">Nothing spent today.</p>
      ) : (
        <ul className="space-y-1.5 max-h-36 overflow-y-auto">
          {todayExpenses.map(e => (
            <li key={e.id} className="flex items-center gap-2">
              <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${CATEGORY_BADGE[e.category] ?? 'bg-white/10 text-white/50'}`}>
                {e.category}
              </span>
              <span className="text-xs text-white/60 flex-1 truncate">
                {e.description || e.bank || '—'}
              </span>
              <span className="text-xs font-medium text-white whitespace-nowrap">
                ₹{e.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
