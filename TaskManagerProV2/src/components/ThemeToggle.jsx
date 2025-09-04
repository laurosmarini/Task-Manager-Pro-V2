import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeContext } from '../hooks/useThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      className="btn btn-secondary"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.5rem',
        height: '2.5rem'
      }}
    >
      {theme === 'light' ? (
        <Moon size={16} />
      ) : (
        <Sun size={16} />
      )}
    </button>
  )
}

export default ThemeToggle
