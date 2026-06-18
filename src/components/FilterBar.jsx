const inputClass = "bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm appearance-none"

export default function FilterBar({ categories, filter, onChange }) {
  function handleChange(e) {
    onChange(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <select
        name="category"
        value={filter.category}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="All" className="bg-gray-900">All categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
        ))}
      </select>

      <input
        type="month"
        name="month"
        value={filter.month}
        onChange={handleChange}
        className={`${inputClass} [color-scheme:dark]`}
      />

      {(filter.category !== 'All' || filter.month) && (
        <button
          onClick={() => onChange({ category: 'All', month: '' })}
          className="text-xs text-white/50 hover:text-white border border-white/15 rounded-lg px-3 py-2 transition-colors backdrop-blur-sm bg-white/5"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
