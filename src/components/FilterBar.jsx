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
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
      >
        <option value="All">All categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="month"
        name="month"
        value={filter.month}
        onChange={handleChange}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
      />

      {(filter.category !== 'All' || filter.month) && (
        <button
          onClick={() => onChange({ category: 'All', month: '' })}
          className="text-xs text-gray-400 hover:text-white border border-gray-700 rounded-lg px-3 py-2 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
