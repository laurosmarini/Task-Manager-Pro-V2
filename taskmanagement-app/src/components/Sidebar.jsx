import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, CheckSquare, FileText, Settings, Plus } from 'lucide-react'
import { useTaskContext } from '../hooks/useTaskContext'

function Sidebar() {
  const { getTaskStats } = useTaskContext()
  const stats = getTaskStats()

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-nav">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Home size={18} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <CheckSquare size={18} />
              Tasks
              {stats.active > 0 && (
                <span className="badge badge-medium" style={{ marginLeft: 'auto' }}>
                  {stats.active}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <FileText size={18} />
              Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
          Quick Stats
        </h3>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Total Tasks:</span>
            <span style={{ fontWeight: '600' }}>{stats.total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Active:</span>
            <span style={{ fontWeight: '600', color: '#3b82f6' }}>{stats.active}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Completed:</span>
            <span style={{ fontWeight: '600', color: '#10b981' }}>{stats.completed}</span>
          </div>
          {stats.overdue > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Overdue:</span>
              <span style={{ fontWeight: '600', color: '#ef4444' }}>{stats.overdue}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar