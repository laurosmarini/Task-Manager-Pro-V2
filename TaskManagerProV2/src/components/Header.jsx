import React from 'react'
import { Search, Bell, Settings } from 'lucide-react'
import { useTaskContext } from '../hooks/useTaskContext'
import { useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function Header() {
  const { searchQuery, setSearchQuery } = useTaskContext()
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/tasks':
        return 'Tasks'
      case '/notes':
        return 'Notes'
      case '/settings':
        return 'Settings'
      default:
        return 'Task Manager Pro'
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Task Manager Pro</h1>
        <span style={{ color: '#6b7280', fontSize: '1rem' }}>/ {getPageTitle()}</span>
      </div>
      
      <div className="header-right">
        {(location.pathname === '/tasks' || location.pathname === '/notes') && (
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder={`Search ${location.pathname === '/tasks' ? 'tasks' : 'notes'}...`}
              className="input search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <ThemeToggle />

        <button className="btn btn-secondary">
          <Bell size={16} />
        </button>

        <button className="btn btn-secondary">
          <Settings size={16} />
        </button>
      </div>
    </header>
  )
}

export default Header
