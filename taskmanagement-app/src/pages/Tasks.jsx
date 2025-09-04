import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Calendar, Filter, ChevronDown, ChevronRight } from 'lucide-react'
import { useTaskContext } from '../hooks/useTaskContext'
import TaskModal from '../components/TaskModal'
import SubtaskList from '../components/SubtaskList'
import { format } from 'date-fns'

function Tasks() {
  const {
    getFilteredTasks,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    categories
  } = useTaskContext()

  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedTasks, setExpandedTasks] = useState(new Set())

  const tasks = getFilteredTasks().filter(task => 
    selectedCategory === 'all' || task.category === selectedCategory
  )

  const handleAddTask = () => {
    setEditingTask(null)
    setShowModal(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowModal(true)
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getTasksByStatus = (status) => {
    return tasks.filter(task => status === 'completed' ? task.completed : !task.completed)
  }

  const toggleTaskExpansion = (taskId) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            Tasks
          </h1>
          <p style={{ color: '#6b7280' }}>
            Manage your tasks and stay productive
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleAddTask}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} />
            <span style={{ fontWeight: '500' }}>Filter:</span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                className={`btn ${filter === filterType ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(filterType)}
                style={{ textTransform: 'capitalize' }}
              >
                {filterType}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: '500' }}>Category:</span>
            <select
              className="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>
            {getTasksByStatus('active').length}
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Active Tasks</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
            {getTasksByStatus('completed').length}
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Completed</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6b7280' }}>
            {tasks.length}
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Tasks</div>
        </div>
      </div>

      {/* Tasks List */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {tasks.map(task => {
            const isExpanded = expandedTasks.has(task.id)
            const hasSubtasks = task.subtasks && task.subtasks.length > 0

            return (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />

                  {/* Expand/Collapse button for subtasks */}
                  {hasSubtasks && (
                    <button
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="task-action-btn"
                      style={{
                        marginRight: '0.5rem',
                        color: 'var(--text-secondary)',
                        transition: 'transform 0.2s'
                      }}
                      title={isExpanded ? 'Collapse subtasks' : 'Expand subtasks'}
                    >
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  )}

                  <div className="task-content">
                    <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                      {task.title}
                      {hasSubtasks && (
                        <span style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.75rem',
                          color: 'var(--text-tertiary)',
                          backgroundColor: 'var(--bg-tertiary)',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '0.25rem'
                        }}>
                          {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                        </span>
                      )}
                    </div>
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                    <div className="task-meta">
                      <span className={`badge badge-${task.priority}`}>
                        {task.priority}
                      </span>
                      <span>{task.category}</span>
                      {task.dueDate && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={12} />
                          {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </span>
                      )}
                      <span>Created {format(new Date(task.createdAt), 'MMM dd')}</span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      className="task-action-btn"
                      onClick={() => handleEditTask(task)}
                      title="Edit task"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="task-action-btn"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete task"
                      style={{ color: '#ef4444' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Subtasks */}
                {hasSubtasks && (
                  <SubtaskList
                    taskId={task.id}
                    subtasks={task.subtasks}
                    isExpanded={isExpanded}
                  />
                )}

                {/* Priority indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    backgroundColor: getPriorityColor(task.priority),
                    borderRadius: '0.5rem 0 0 0.5rem'
                  }}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ color: '#6b7280', marginBottom: '1rem' }}>No tasks found</h3>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            {filter === 'all' 
              ? 'Get started by creating your first task!'
              : `No ${filter} tasks match your current filters.`
            }
          </p>
          <button className="btn btn-primary" onClick={handleAddTask}>
            <Plus size={16} />
            Create Task
          </button>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Tasks
