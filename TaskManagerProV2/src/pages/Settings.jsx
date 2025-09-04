import React, { useState } from 'react'
import { Download, Upload, Trash2, Settings as SettingsIcon, Save } from 'lucide-react'
import { useTaskContext } from '../hooks/useTaskContext'
import { useNoteContext } from '../hooks/useNoteContext'

function Settings() {
  const { tasks, categories: taskCategories, addCategory: addTaskCategory } = useTaskContext()
  const { notes, getCategories } = useNoteContext()
  
  const [newTaskCategory, setNewTaskCategory] = useState('')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)

  const exportData = () => {
    const data = {
      tasks,
      notes,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `task-manager-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.tasks) {
          localStorage.setItem('taskManagerTasks', JSON.stringify(data.tasks))
        }
        if (data.notes) {
          localStorage.setItem('taskManagerNotes', JSON.stringify(data.notes))
        }
        
        alert('Data imported successfully! Please refresh the page to see the changes.')
      } catch (error) {
        alert('Error importing data. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('taskManagerTasks')
      localStorage.removeItem('taskManagerNotes')
      alert('All data cleared successfully! Please refresh the page.')
    }
  }

  const addNewTaskCategory = () => {
    if (newTaskCategory.trim() && !taskCategories.includes(newTaskCategory.trim())) {
      addTaskCategory(newTaskCategory.trim())
      setNewTaskCategory('')
    }
  }

  const getStats = () => {
    const taskStats = {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      categories: taskCategories.length
    }
    
    const noteStats = {
      total: notes.length,
      categories: getCategories().length - 1 // Exclude 'all'
    }

    return { taskStats, noteStats }
  }

  const { taskStats, noteStats } = getStats()

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
          Settings
        </h1>
        <p style={{ color: '#6b7280' }}>
          Manage your application settings and data
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* App Statistics */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SettingsIcon size={20} />
            Application Statistics
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>
                {taskStats.total}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Tasks</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                {taskStats.completed}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8b5cf6' }}>
                {noteStats.total}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Notes</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>
                {taskStats.categories}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Categories</div>
            </div>
          </div>
        </div>

        {/* Category Management */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Manage Categories
          </h2>
          
          <div className="form-group">
            <label className="form-label">Add New Task Category</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Category name..."
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewTaskCategory()}
                style={{ flex: 1 }}
              />
              <button
                className="btn btn-primary"
                onClick={addNewTaskCategory}
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Current Task Categories:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {taskCategories.map(category => (
                <span key={category} className="badge badge-low">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Data Management
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <button
            className="btn btn-secondary"
            onClick={exportData}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem' }}
          >
            <Download size={24} />
            <span>Export Data</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Download backup file
            </span>
          </button>

          <label
            className="btn btn-secondary"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem', cursor: 'pointer' }}
          >
            <Upload size={24} />
            <span>Import Data</span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Restore from backup
            </span>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
            />
          </label>

          <button
            className="btn btn-danger"
            onClick={clearAllData}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem' }}
          >
            <Trash2 size={24} />
            <span>Clear All Data</span>
            <span style={{ fontSize: '0.75rem', color: '#ffffff' }}>
              Remove everything
            </span>
          </button>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            About Data Storage
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5' }}>
            Your data is stored locally in your browser's storage. It will persist between sessions
            but may be lost if you clear your browser data. Use the export feature to create backups.
          </p>
        </div>
      </div>

      {/* App Information */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          About Task Manager Pro
        </h2>
        
        <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Version:</strong> 1.0.0
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Features:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Task management with priorities and due dates</li>
            <li>Rich note-taking with categories and tags</li>
            <li>Local data storage and backup</li>
            <li>Search and filtering capabilities</li>
            <li>Responsive design for all devices</li>
          </ul>
          <p>
            <strong>Storage:</strong> All data is stored locally in your browser.
            No data is sent to external servers.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings