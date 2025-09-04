import React, { createContext, useContext, useReducer, useEffect } from 'react'

const TaskContext = createContext()

const initialState = {
  tasks: [],
  filter: 'all', // all, active, completed
  searchQuery: '',
  categories: ['Work', 'Personal', 'Shopping', 'Health']
}

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload }
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] }
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        )
      }
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null }
            : task
        )
      }
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] }
    
    default:
      return state
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagerTasks')
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) })
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      category: taskData.category || 'Personal',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      subtasks: taskData.subtasks || [],
      parentId: taskData.parentId || null
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
  }

  const updateTask = (id, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, ...updates } })
  }

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id })
  }

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }

  const addCategory = (category) => {
    if (!state.categories.includes(category)) {
      dispatch({ type: 'ADD_CATEGORY', payload: category })
    }
  }

  // Subtask management methods
  const addSubtask = (parentId, subtaskData) => {
    const parentTask = state.tasks.find(task => task.id === parentId)
    if (!parentTask) return

    const newSubtask = {
      id: Date.now().toString(),
      title: subtaskData.title,
      completed: false,
      createdAt: new Date().toISOString()
    }

    const updatedSubtasks = [...(parentTask.subtasks || []), newSubtask]
    updateTask(parentId, { subtasks: updatedSubtasks })
  }

  const updateSubtask = (parentId, subtaskId, updates) => {
    const parentTask = state.tasks.find(task => task.id === parentId)
    if (!parentTask) return

    const updatedSubtasks = parentTask.subtasks.map(subtask =>
      subtask.id === subtaskId ? { ...subtask, ...updates } : subtask
    )
    updateTask(parentId, { subtasks: updatedSubtasks })
  }

  const deleteSubtask = (parentId, subtaskId) => {
    const parentTask = state.tasks.find(task => task.id === parentId)
    if (!parentTask) return

    const updatedSubtasks = parentTask.subtasks.filter(subtask => subtask.id !== subtaskId)
    updateTask(parentId, { subtasks: updatedSubtasks })
  }

  const toggleSubtask = (parentId, subtaskId) => {
    const parentTask = state.tasks.find(task => task.id === parentId)
    if (!parentTask) return

    const updatedSubtasks = parentTask.subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    )
    updateTask(parentId, { subtasks: updatedSubtasks })
  }

  const getSubtasksProgress = (taskId) => {
    const task = state.tasks.find(t => t.id === taskId)
    if (!task || !task.subtasks || task.subtasks.length === 0) {
      return { completed: 0, total: 0, percentage: 0 }
    }

    const completed = task.subtasks.filter(subtask => subtask.completed).length
    const total = task.subtasks.length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

    return { completed, total, percentage }
  }

  // Filtered tasks based on current filter and search query
  const getFilteredTasks = () => {
    let filtered = state.tasks

    // Apply status filter
    if (state.filter === 'active') {
      filtered = filtered.filter(task => !task.completed)
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(task => task.completed)
    }

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => {
      // Sort by completion status (incomplete first), then by creation date
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }

  const getTaskStats = () => {
    const total = state.tasks.length
    const completed = state.tasks.filter(task => task.completed).length
    const active = total - completed
    const overdue = state.tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate) < new Date()
    ).length

    return { total, completed, active, overdue }
  }

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSearchQuery,
    addCategory,
    getFilteredTasks,
    getTaskStats,
    // Subtask methods
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
    getSubtasksProgress
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
