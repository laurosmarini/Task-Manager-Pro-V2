import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ThemeContext = createContext()

const initialState = {
  theme: 'light',
  systemPreference: 'light'
}

function themeReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_SYSTEM_PREFERENCE':
      return { ...state, systemPreference: action.payload }
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      return { ...state, theme: newTheme }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('taskManagerTheme')
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = systemPrefersDark ? 'dark' : 'light'
      dispatch({ type: 'SET_SYSTEM_PREFERENCE', payload: systemTheme })
      if (!savedTheme) {
        dispatch({ type: 'SET_THEME', payload: systemTheme })
      }
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const newSystemPref = e.matches ? 'dark' : 'light'
      dispatch({ type: 'SET_SYSTEM_PREFERENCE', payload: newSystemPref })

      // Only auto-switch if no manual preference is saved
      const savedTheme = localStorage.getItem('taskManagerTheme')
      if (!savedTheme) {
        dispatch({ type: 'SET_THEME', payload: newSystemPref })
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
    localStorage.setItem('taskManagerTheme', state.theme)
  }, [state.theme])

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const value = {
    ...state,
    setTheme,
    toggleTheme
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}
