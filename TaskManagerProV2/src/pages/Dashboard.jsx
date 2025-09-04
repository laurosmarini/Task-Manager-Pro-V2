import React from 'react'
import { CheckSquare, FileText, Calendar, AlertCircle } from 'lucide-react'
import { useTaskContext } from '../hooks/useTaskContext'
import { useNoteContext } from '../hooks/useNoteContext'
import { format } from 'date-fns'

function Dashboard() {
  const { getTaskStats, getFilteredTasks } = useTaskContext()
  const { getNoteStats, getFilteredNotes } = useNoteContext()
  
  const taskStats = getTaskStats()
  const noteStats = getNoteStats()
  const recentTasks = getFilteredTasks().slice(0, 5)
  const recentNotes = getFilteredNotes().slice(0, 3)

  const getOverdueTasks = () => {
    return getFilteredTasks().filter(task => 
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate) < new Date()
    )
  }

  const getTodayTasks = () => {
    const today = new Date().toDateString()
    return getFilteredTasks().filter(task => 
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate).toDateString() === today
    )
  }

  const overdueTasks = getOverdueTasks()
  const todayTasks = getTodayTasks()

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
          Welcome back!
        </h1>
        <p style={{ color: '#6b7280' }}>
          Here's what's happening with your tasks and notes today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <CheckSquare className="stat-icon" size={24} />
          <div className="stat-value">{taskStats.active}</div>
          <div className="stat-label">Active Tasks</div>
        </div>
        
        <div className="stat-card">
          <CheckSquare className="stat-icon" size={24} style={{ color: '#10b981' }} />
          <div className="stat-value">{taskStats.completed}</div>
          <div className="stat-label">Completed Tasks</div>
        </div>
        
        <div className="stat-card">
          <FileText className="stat-icon" size={24} style={{ color: '#8b5cf6' }} />
          <div className="stat-value">{noteStats.total}</div>
          <div className="stat-label">Total Notes</div>
        </div>
        
        <div className="stat-card">
          <AlertCircle className="stat-icon" size={24} style={{ color: '#ef4444' }} />
          <div className="stat-value">{taskStats.overdue}</div>
          <div className="stat-label">Overdue Tasks</div>
        </div>
      </div>

      {/* Today's Tasks */}
      {todayTasks.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} style={{ color: '#3b82f6' }} />
            Due Today ({todayTasks.length})
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {todayTasks.map(task => (
              <div key={task.id} className="task-item" style={{ margin: 0 }}>
                <div className="task-header">
                  <div className="task-content">
                    <div className="task-title">{task.title}</div>
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                    <div className="task-meta">
                      <span className={`badge badge-${task.priority}`}>
                        {task.priority}
                      </span>
                      <span>{task.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #ef4444' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={20} style={{ color: '#ef4444' }} />
            Overdue Tasks ({overdueTasks.length})
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {overdueTasks.slice(0, 3).map(task => (
              <div key={task.id} className="task-item" style={{ margin: 0, backgroundColor: '#fef2f2' }}>
                <div className="task-header">
                  <div className="task-content">
                    <div className="task-title">{task.title}</div>
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                    <div className="task-meta">
                      <span className={`badge badge-${task.priority}`}>
                        {task.priority}
                      </span>
                      <span>{task.category}</span>
                      <span style={{ color: '#ef4444', fontWeight: '500' }}>
                        Due: {format(new Date(task.dueDate), 'MMM dd')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Recent Tasks
          </h2>
          {recentTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {recentTasks.map(task => (
                <div key={task.id} className="task-item" style={{ margin: 0 }}>
                  <div className="task-header">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                      className="task-checkbox"
                    />
                    <div className="task-content">
                      <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                        {task.title}
                      </div>
                      <div className="task-meta">
                        <span className={`badge badge-${task.priority}`}>
                          {task.priority}
                        </span>
                        <span>{task.category}</span>
                        {task.dueDate && (
                          <span>Due: {format(new Date(task.dueDate), 'MMM dd')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
              No tasks yet. Create your first task!
            </p>
          )}
        </div>

        {/* Recent Notes */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Recent Notes
          </h2>
          {recentNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {recentNotes.map(note => (
                <div key={note.id} className="note-item" style={{ margin: 0 }}>
                  <div className="note-title">{note.title}</div>
                  <div className="note-content" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                    {note.content.substring(0, 100)}
                    {note.content.length > 100 && '...'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {format(new Date(note.updatedAt), 'MMM dd, yyyy')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
              No notes yet. Create your first note!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard