import React, { createContext, useContext, useReducer, useEffect } from 'react'

const NoteContext = createContext()

const initialState = {
  notes: [],
  searchQuery: '',
  selectedCategory: 'all'
}

function noteReducer(state, action) {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload }
    
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] }
    
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        )
      }
    
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    
    default:
      return state
  }
}

export function NoteProvider({ children }) {
  const [state, dispatch] = useReducer(noteReducer, initialState)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('taskManagerNotes')
    if (savedNotes) {
      dispatch({ type: 'SET_NOTES', payload: JSON.parse(savedNotes) })
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('taskManagerNotes', JSON.stringify(state.notes))
  }, [state.notes])

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      title: noteData.title,
      content: noteData.content,
      category: noteData.category || 'General',
      tags: noteData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_NOTE', payload: newNote })
  }

  const updateNote = (id, updates) => {
    dispatch({ 
      type: 'UPDATE_NOTE', 
      payload: { 
        id, 
        ...updates, 
        updatedAt: new Date().toISOString() 
      } 
    })
  }

  const deleteNote = (id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id })
  }

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }

  const setSelectedCategory = (category) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category })
  }

  // Get filtered notes based on search and category
  const getFilteredNotes = () => {
    let filtered = state.notes

    // Apply category filter
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === state.selectedCategory)
    }

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }

  // Get all unique categories
  const getCategories = () => {
    const categories = [...new Set(state.notes.map(note => note.category))]
    return ['all', ...categories.sort()]
  }

  // Get note statistics
  const getNoteStats = () => {
    const total = state.notes.length
    const categories = getCategories().length - 1 // Exclude 'all'
    const recentNotes = state.notes.filter(note => {
      const noteDate = new Date(note.updatedAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return noteDate > weekAgo
    }).length

    return { total, categories, recentNotes }
  }

  const value = {
    ...state,
    addNote,
    updateNote,
    deleteNote,
    setSearchQuery,
    setSelectedCategory,
    getFilteredNotes,
    getCategories,
    getNoteStats
  }

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}

export function useNoteContext() {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider')
  }
  return context
}