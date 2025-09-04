import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import Settings from './pages/Settings'
import { TaskProvider } from './hooks/useTaskContext'
import { NoteProvider } from './hooks/useNoteContext'
import { loadSampleData } from './utils/sampleData'
import './styles/App.css'

function App() {
  useEffect(() => {
    // Load sample data on first run for demonstration
    loadSampleData()
  }, [])
  return (
    <TaskProvider>
      <NoteProvider>
        <Router>
          <div className="app">
            <Header />
            <div className="app-content">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </NoteProvider>
    </TaskProvider>
  )
}

export default App