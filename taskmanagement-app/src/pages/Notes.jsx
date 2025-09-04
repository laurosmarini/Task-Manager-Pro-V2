import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Tag } from 'lucide-react'
import { useNoteContext } from '../hooks/useNoteContext'
import NoteModal from '../components/NoteModal'
import { format } from 'date-fns'

function Notes() {
  const {
    getFilteredNotes,
    deleteNote,
    getCategories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useNoteContext()

  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const notes = getFilteredNotes()
  const categories = getCategories()

  const handleAddNote = () => {
    setEditingNote(null)
    setShowModal(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setShowModal(true)
  }

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId)
    }
  }

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            Notes
          </h1>
          <p style={{ color: '#6b7280' }}>
            Capture your thoughts and ideas
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNote}>
          <Plus size={16} />
          New Note
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} />
            <span style={{ fontWeight: '500' }}>Category:</span>
          </div>
          
          <select
            className="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search notes..."
                className="input search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Notes Count */}
      <div style={{ marginBottom: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
        {notes.length} {notes.length === 1 ? 'note' : 'notes'} found
      </div>

      {/* Notes Display */}
      {notes.length > 0 ? (
        <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {notes.map(note => (
            <div 
              key={note.id} 
              className="note-item"
              style={viewMode === 'list' ? { display: 'flex', alignItems: 'flex-start', gap: '1rem' } : {}}
            >
              <div className="note-header">
                <div>
                  <div className="note-title">{note.title}</div>
                  <div className="note-date">
                    {format(new Date(note.updatedAt), 'MMM dd, yyyy')}
                  </div>
                </div>
                <div className="note-actions">
                  <button
                    className="task-action-btn"
                    onClick={() => handleEditNote(note)}
                    title="Edit note"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="task-action-btn"
                    onClick={() => handleDeleteNote(note.id)}
                    title="Delete note"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div 
                className="note-content"
                style={viewMode === 'list' ? { maxHeight: '80px', overflow: 'hidden' } : {}}
              >
                {viewMode === 'grid' 
                  ? truncateContent(note.content, 200)
                  : truncateContent(note.content, 100)
                }
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <span className="badge badge-low">
                  {note.category}
                </span>
                {note.tags && note.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {note.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag}
                        style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          backgroundColor: '#f3f4f6',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '0.25rem'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                    {note.tags.length > 2 && (
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        +{note.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ color: '#6b7280', marginBottom: '1rem' }}>No notes found</h3>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            {searchQuery || selectedCategory !== 'all'
              ? 'No notes match your current search or filter.'
              : 'Start capturing your thoughts by creating your first note!'
            }
          </p>
          <button className="btn btn-primary" onClick={handleAddNote}>
            <Plus size={16} />
            Create Note
          </button>
        </div>
      )}

      {/* Note Modal */}
      {showModal && (
        <NoteModal
          note={editingNote}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Notes