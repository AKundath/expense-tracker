import { useMemo } from 'react'

const CATEGORY_COLORS = {
  Food: '#f97316',
  Travel: '#3b82f6',
  'Basic Needs': '#22c55e',
  Pleasure: '#ec4899',
}

const LEGEND = [
  ['Food',        '#f97316',  8,  83],
  ['Travel',      '#3b82f6', 54,  83],
  ['Basic Needs', '#22c55e',  8,  93],
  ['Pleasure',    '#ec4899', 54,  93],
]

function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function donutArc(cx, cy, outerR, innerR, start, end) {
  if (Math.abs(end - start) >= 360) end = start + 359.99
  const o1 = polarToCartesian(cx, cy, outerR, start)
  const o2 = polarToCartesian(cx, cy, outerR, end)
  const i2 = polarToCartesian(cx, cy, innerR, end)
  const i1 = polarToCartesian(cx, cy, innerR, start)
  const large = end - start > 180 ? 1 : 0
  return [
    `M ${o1.x.toFixed(2)} ${o1.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x.toFixed(2)} ${o2.y.toFixed(2)}`,
    `L ${i2.x.toFixed(2)} ${i2.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i1.x.toFixed(2)} ${i1.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

export default function PieChart({ expenses }) {
  const { slices, total } = useMemo(() => {
    const byCategory = {}
    expenses.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount
    })
    const total = Object.values(byCategory).reduce((s, v) => s + v, 0)
    if (total === 0) return { slices: [], total: 0 }

    let angle = 0
    const slices = Object.entries(byCategory).map(([cat, amt]) => {
      const sweep = (amt / total) * 360
      const slice = {
        category: cat,
        pct: amt / total,
        startAngle: angle,
        endAngle: angle + sweep,
        color: CATEGORY_COLORS[cat] || '#6b7280',
      }
      angle += sweep
      return slice
    })
    return { slices, total }
  }, [expenses])

  const cx = 50, cy = 41, outerR = 33, innerR = 20
  const totalLabel = total >= 1000 ? `₹${(total / 1000).toFixed(1)}k` : `₹${total.toFixed(0)}`

  return (
    <div
      className="w-full aspect-square rounded-2xl p-3 backdrop-blur-2xl flex flex-col"
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
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-1 text-center flex-shrink-0"
        style={{
          color: '#ff8c00',
          textShadow: '0 0 4px #ff8c00, 0 0 12px #ff6000, 0 0 28px #ff4000',
        }}
      >
        ✦ Breakdown ✦
      </h2>

      <svg viewBox="0 0 100 100" className="w-full flex-1">
        {slices.length === 0 ? (
          <>
            <circle cx={cx} cy={cy} r={outerR} fill="rgba(255,255,255,0.05)" />
            <circle cx={cx} cy={cy} r={innerR} fill="rgba(0,0,0,0.3)" />
            <text x={cx} y={cy + 2} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5">
              No data
            </text>
          </>
        ) : (
          <>
            {slices.map(slice => (
              <path
                key={slice.category}
                d={donutArc(cx, cy, outerR, innerR, slice.startAngle, slice.endAngle)}
                fill={slice.color}
                opacity="0.9"
              />
            ))}
            <circle cx={cx} cy={cy} r={innerR} fill="rgba(0,0,0,0.45)" />
            <text x={cx} y={cy - 2} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="3.8">
              Total
            </text>
            <text x={cx} y={cy + 6} textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold">
              {totalLabel}
            </text>
          </>
        )}

        {/* Legend */}
        {LEGEND.map(([cat, color, x, y]) => {
          const slice = slices.find(s => s.category === cat)
          const pct = slice ? ` ${Math.round(slice.pct * 100)}%` : ''
          return (
            <g key={cat}>
              <circle cx={x} cy={y - 1.5} r={2} fill={color} opacity="0.9" />
              <text x={x + 4.5} y={y} fill="rgba(255,255,255,0.55)" fontSize="4">
                {cat}{pct}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
