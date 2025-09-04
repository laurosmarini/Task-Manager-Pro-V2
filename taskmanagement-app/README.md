# Task Manager Pro

A comprehensive task management and note-taking application built with React and Vite. This application helps you organize your tasks, take notes, and stay productive with a clean, modern interface.

## 🚀 Features

### Task Management

- ✅ Create, edit, and delete tasks
- 📅 Set due dates and priorities (Low, Medium, High)
- 🏷️ Organize tasks with custom categories
- ✔️ Mark tasks as completed
- 🔍 Search and filter tasks
- ⚠️ Track overdue tasks
- 📊 View task statistics

### Note Taking

- 📝 Create and edit rich text notes
- 🏷️ Organize notes with categories and tags
- 🔍 Search notes by content, title, or tags
- 📋 Grid and list view modes
- 🗂️ Category-based filtering

### Additional Features

- 💾 Local data storage (persists between sessions)
- 📤 Export data as JSON backup
- 📥 Import data from backup files
- 🗑️ Clear all data option
- 📱 Responsive design for all devices
- 🎨 Modern, clean UI with intuitive navigation
- 📈 Dashboard with overview statistics

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **date-fns** - Date formatting and manipulation
- **CSS3** - Styling and responsive design
- **Local Storage API** - Data persistence

## 📦 Installation

1. **Clone or download the project**
2. **Navigate to the project directory**

   ```bash
   cd TaskManagement
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```text
TaskManagment/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx      # Main navigation header
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   ├── TaskModal.jsx   # Task creation/editing modal
│   │   └── NoteModal.jsx   # Note creation/editing modal
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx   # Overview and statistics
│   │   ├── Tasks.jsx       # Task management page
│   │   ├── Notes.jsx       # Note management page
│   │   └── Settings.jsx    # Application settings
│   ├── hooks/              # Custom React hooks
│   │   ├── useTaskContext.jsx  # Task state management
│   │   └── useNoteContext.jsx  # Note state management
│   ├── styles/             # CSS styling files
│   │   ├── index.css       # Global styles and utilities
│   │   └── App.css         # Component-specific styles
│   ├── utils/              # Utility functions
│   │   └── sampleData.js   # Sample data for demonstration
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Usage Guide

### Getting Started

1. The application loads with sample data for demonstration
2. Navigate between sections using the sidebar
3. All data is automatically saved to your browser's local storage

### Managing Tasks

1. **Create Task**: Click "Add Task" button and fill in the details
2. **Edit Task**: Click the edit icon on any task
3. **Complete Task**: Check the checkbox next to the task
4. **Delete Task**: Click the trash icon and confirm deletion
5. **Filter Tasks**: Use the filter buttons and category dropdown
6. **Search Tasks**: Use the search bar in the header

### Taking Notes

1. **Create Note**: Click "New Note" button
2. **Add Tags**: Type tags separated by spaces
3. **Organize**: Select or create categories
4. **Edit Note**: Click the edit icon on any note
5. **Search Notes**: Use the search functionality
6. **View Modes**: Switch between grid and list views

### Data Management

1. **Export Data**: Go to Settings → Export Data to download a backup
2. **Import Data**: Go to Settings → Import Data to restore from backup
3. **Clear Data**: Use with caution - this removes all tasks and notes

## 🎨 Features in Detail

### Dashboard

- Overview of all tasks and notes
- Quick statistics cards
- Today's tasks and overdue items
- Recent activity summary

### Advanced Task Management

- Priority levels with color coding
- Due date tracking with overdue indicators
- Category organization
- Completion tracking with timestamps
- Advanced filtering and search

### Advanced Note Taking Features

- Rich text editing with formatting
- Tag-based organization
- Category management
- Multiple view modes
- Content search capabilities

### Settings

- Application statistics
- Category management
- Data export/import
- Storage information

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 💾 Data Storage

- All data is stored locally in your browser using the Local Storage API
- Data persists between browser sessions
- No external servers or accounts required
- Privacy-focused - your data never leaves your device

## 🔒 Privacy & Security

- **100% Local**: All data stays on your device
- **No Tracking**: No analytics or user tracking
- **No Registration**: No accounts or personal information required
- **Offline Capable**: Works without internet connection

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify it for your own needs!

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

Potential features that could be added:

- Dark mode theme
- Drag and drop task reordering
- Task templates
- Reminders and notifications
- Cloud sync capabilities
- Collaboration features
- Advanced text editor for notes
- File attachments
- Calendar integration

---

**Enjoy organizing your tasks and notes with Task Manager Pro!** 🎉
