import React, { useState } from 'react'
import { Plus, X, Check, Edit2 } from 'lucide-react'
import { useTaskContext } from '../hooks/useTaskContext'

function SubtaskList({ taskId, subtasks = [], isExpanded = false }) {
  const {
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
    getSubtasksProgress
  } = useTaskContext()

  const [showAddForm, setShowAddForm] = useState(false)
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [editingSubtask, setEditingSubtask] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const progress = getSubtasksProgress(taskId)

  const handleAddSubtask = (e) => {
    e.preventDefault()
    if (newSubtaskTitle.trim()) {
      addSubtask(taskId, { title: newSubtaskTitle.trim() })
      setNewSubtaskTitle('')
      setShowAddForm(false)
    }
  }

  const handleEditSubtask = (subtask) => {
    setEditingSubtask(subtask.id)
    setEditTitle(subtask.title)
  }

  const handleSaveEdit = (subtaskId) => {
    if (editTitle.trim()) {
      updateSubtask(taskId, subtaskId, { title: editTitle.trim() })
    }
    setEditingSubtask(null)
    setEditTitle('')
  }

  const handleCancelEdit = () => {
    setEditingSubtask(null)
    setEditTitle('')
  }

  if (!isExpanded && subtasks.length === 0) {
    return null
  }

  return (
    <div className="subtask-list" style={{ marginTop: '1rem' }}>
      {/* Progress Bar */}
      {subtasks.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              Subtasks ({progress.completed}/{progress.total})
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)'
            }}>
              {progress.percentage}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress.percentage}%`,
              height: '100%',
              backgroundColor: 'var(--accent-success)',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}

      {/* Subtasks */}
      {subtasks.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          {subtasks.map((subtask, index) => (
            <div
              key={subtask.id}
              className="subtask-item fade-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(taskId, subtask.id)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--accent-primary)'
                }}
              />

              {editingSubtask === subtask.id ? (
                <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(subtask.id)
                      if (e.key === 'Escape') handleCancelEdit()
                    }}
                    className="input"
                    style={{ flex: 1, fontSize: '0.875rem' }}
                    autoFocus
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSaveEdit(subtask.id)}
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCancelEdit}
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <span style={{
                    flex: 1,
                    fontSize: '0.875rem',
                    textDecoration: subtask.completed ? 'line-through' : 'none',
                    color: subtask.completed ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleEditSubtask(subtask)}
                  >
                    {subtask.title}
                  </span>

                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEditSubtask(subtask)}
                    style={{
                      padding: '0.25rem',
                      opacity: 0.7,
                      transition: 'opacity 0.2s'
                    }}
                    title="Edit subtask"
                  >
                    <Edit2 size={12} />
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => deleteSubtask(taskId, subtask.id)}
                    style={{
                      padding: '0.25rem',
                      color: 'var(--accent-error)',
                      opacity: 0.7,
                      transition: 'opacity 0.2s'
                    }}
                    title="Delete subtask"
                  >
                    <X size={12} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Subtask Form */}
      {showAddForm ? (
        <form onSubmit={handleAddSubtask} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Enter subtask title..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              className="input"
              style={{ flex: 1, fontSize: '0.875rem' }}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem' }}
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowAddForm(false)
                setNewSubtaskTitle('')
              }}
              style={{ padding: '0.5rem 1rem' }}
            >
              <X size={16} />
            </button>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => setShowAddForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Plus size={14} />
          Add Subtask
        </button>
      )}
    </div>
  )
}

export default SubtaskList
