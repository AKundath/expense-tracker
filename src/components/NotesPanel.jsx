import { useState } from 'react'
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function NotesPanel() {
  const [notes, setNotes] = useLocalStorage('expense-notes', [])
  const [input, setInput] = useState('')

  function addNote() {
    if (!input.trim()) return
    setNotes(prev => [{ id: crypto.randomUUID(), text: input.trim(), done: false }, ...prev])
    setInput('')
  }

  function toggleNote(id) {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, done: !n.done } : n))
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div
      className="h-full rounded-2xl p-4 backdrop-blur-2xl flex flex-col"
      style={{
        background: 'rgba(0, 0, 0, 0.30)',
        border: '1.5px solid rgba(0, 220, 255, 0.75)',
        boxShadow: `
          0 0 8px rgba(0, 220, 255, 0.6),
          0 0 24px rgba(0, 220, 255, 0.25),
          inset 0 0 30px rgba(0, 220, 255, 0.04)
        `,
      }}
    >
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-4 text-center flex-shrink-0"
        style={{
          color: '#00dcff',
          textShadow: '0 0 4px #00dcff, 0 0 12px #00aaff, 0 0 28px #0088ff',
        }}
      >
        ✦ Notes ✦
      </h2>

      <ul className="flex-1 overflow-y-auto space-y-2 mb-3 min-h-0">
        {notes.length === 0 && (
          <li className="text-white/25 text-xs text-center py-6">No notes yet.</li>
        )}
        {notes.map(note => (
          <li key={note.id} className="flex items-start gap-2 group">
            <button
              onClick={() => toggleNote(note.id)}
              className="mt-0.5 flex-shrink-0 transition-colors"
              style={{ color: note.done ? '#00dcff' : 'rgba(255,255,255,0.3)' }}
            >
              {note.done ? <CheckSquare size={13} /> : <Square size={13} />}
            </button>
            <span
              className={`text-xs flex-1 leading-relaxed break-words ${
                note.done ? 'line-through text-white/25' : 'text-white/75'
              }`}
            >
              {note.text}
            </span>
            <button
              onClick={() => deleteNote(note.id)}
              className="flex-shrink-0 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={11} />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addNote()}
          placeholder="Add a note…"
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
        />
        <button
          onClick={addNote}
          className="flex-shrink-0 p-1.5 rounded-lg transition-colors"
          style={{
            background: 'rgba(0, 0, 0, 0.40)',
            border: '1px solid rgba(0, 220, 255, 0.5)',
            boxShadow: '0 0 6px rgba(0, 220, 255, 0.35)',
          }}
        >
          <Plus size={14} style={{ color: '#00dcff', filter: 'drop-shadow(0 0 3px #00dcff)' }} />
        </button>
      </div>
    </div>
  )
}
