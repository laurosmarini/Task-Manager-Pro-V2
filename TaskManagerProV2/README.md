# TaskManagerProV2 🚀

> **Enhanced Task Management Application** - A modern, feature-rich productivity suite built with React 19, Vite, and cutting-edge UI/UX design.

![TaskManagerProV2](https://img.shields.io/badge/TaskManagerProV2-2.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ What's New in V2

### 🎨 **Modern UI/UX**
- **Dark Mode**: Complete theme system with system preference detection
- **Smooth Animations**: Micro-interactions and page transitions
- **Enhanced Mobile Experience**: Touch-friendly interactions and responsive design
- **Loading States**: Skeleton loaders and progress indicators

### 📋 **Advanced Task Management**
- **Task Subtasks**: Hierarchical task organization with progress tracking
- **Priority System**: Visual priority indicators with color coding
- **Due Dates**: Calendar integration with overdue notifications
- **Categories**: Customizable task categories
- **Search & Filters**: Advanced filtering and search capabilities

### 🛡️ **Reliability & Performance**
- **Error Boundaries**: Graceful error handling throughout the app
- **Local Storage**: Persistent data with migration support
- **Optimistic Updates**: Instant UI feedback
- **Performance Optimized**: Lazy loading and code splitting

### 🎯 **Productivity Features**
- **Keyboard Shortcuts**: Power user functionality
- **Drag & Drop**: Intuitive task management (planned)
- **Calendar View**: Time-based task visualization (planned)
- **Kanban Board**: Visual task management (planned)
- **Time Tracking**: Task duration monitoring (planned)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/laurosmarini/TaskManagerProV2.git
   cd TaskManagerProV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📖 Features Overview

### 🌓 Dark Mode
- Toggle between light and dark themes
- Automatic system preference detection
- Persistent theme selection
- Smooth theme transitions

### 📝 Task Management
- Create, edit, and delete tasks
- Set priorities (High, Medium, Low) with color coding
- Add due dates with calendar integration
- Organize tasks with custom categories
- Mark tasks as completed
- Search and filter tasks

### 📋 Task Subtasks
- Add subtasks to any task
- Track subtask completion progress
- Visual progress indicators
- Expandable/collapsible subtask lists
- Automatic parent task completion

### 📓 Note Taking
- Rich text notes with formatting
- Category organization
- Tag-based system
- Search functionality
- Grid and list view modes

### 📊 Dashboard
- Overview statistics
- Recent tasks and notes
- Today's tasks and overdue items
- Quick access to key features

### ⚙️ Settings
- Application statistics
- Data export/import
- Category management
- Theme preferences

## 🏗️ Project Structure

```
TaskManagerProV2/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared components
│   │   ├── ErrorBoundary.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── SubtaskList.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useTaskContext.jsx
│   │   ├── useNoteContext.jsx
│   │   └── useThemeContext.jsx
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Notes.jsx
│   │   └── Settings.jsx
│   ├── styles/             # CSS styling
│   │   ├── index.css       # Global styles
│   │   ├── themes.css      # Theme variables
│   │   ├── animations.css  # Animations
│   │   └── App.css         # Component styles
│   ├── utils/              # Utility functions
│   └── App.jsx             # Main application component
├── public/                 # Static assets
├── docs/                   # Documentation
├── config/                 # Build configurations
├── scripts/                # Deployment scripts
├── TaskManagerProV2.md     # Enhancement specification
└── package.json
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run build:prod      # Build with production config
npm run preview         # Preview production build

# Deployment
npm run deploy          # Deploy to production
npm run health-check    # Health check script

# Analysis
npm run analyze         # Bundle analysis
```

### Environment Setup

The application uses:
- **React 19** with modern hooks and concurrent features
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **Lucide React** for consistent iconography
- **date-fns** for date manipulation
- **Local Storage API** for data persistence

## 🎨 Theme System

TaskManagerProV2 features a comprehensive theme system:

### Light Theme
- Clean, bright interface
- High contrast for readability
- Subtle shadows and borders

### Dark Theme
- Easy on the eyes
- Reduced eye strain
- Modern dark UI patterns

### Theme Features
- CSS custom properties for easy customization
- Smooth transitions between themes
- System preference detection
- Persistent user preferences

## 📱 Responsive Design

- **Mobile-first approach**
- Touch-friendly interactions
- Adaptive layouts for all screen sizes
- Optimized for phones, tablets, and desktops

## 💾 Data Management

- **Local Storage**: All data stored locally
- **Export/Import**: Backup and restore functionality
- **Data Migration**: Automatic data structure updates
- **Privacy-focused**: No external data transmission

## 🔧 Customization

### Themes
Modify `src/styles/themes.css` to customize colors and styling.

### Components
Extend existing components or create new ones in `src/components/`.

### Features
Add new features by following the established patterns in the codebase.

## 📈 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Tree shaking and minification
- **Caching**: Efficient asset caching strategies

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Automatic deployments on push
3. Custom domain support

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variables setup

### Manual Deployment
```bash
npm run build:prod
# Deploy the 'dist' folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent code style
- Add proper error handling
- Write clear commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the blazing fast build tool
- **Lucide** for the beautiful icons
- **date-fns** for date utilities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/laurosmarini/TaskManagerProV2/issues)
- **Discussions**: [GitHub Discussions](https://github.com/laurosmarini/TaskManagerProV2/discussions)
- **Documentation**: [TaskManagerProV2.md](TaskManagerProV2.md)

## 🎯 Roadmap

### Phase 2 Features (Coming Soon)
- [ ] **Calendar View**: Monthly calendar with task integration
- [ ] **Kanban Board**: Drag-and-drop visual task management
- [ ] **Time Tracking**: Task duration monitoring and reporting
- [ ] **Keyboard Shortcuts**: Power user functionality
- [ ] **Advanced Search**: Multi-field search with filters

### Phase 3 Features (Future)
- [ ] **Collaboration**: Multi-user task sharing
- [ ] **Cloud Sync**: Cross-device synchronization
- [ ] **Mobile App**: React Native implementation
- [ ] **Browser Extension**: Quick task capture
- [ ] **API Integration**: Third-party service connections

---

**Built with ❤️ using React 19, Vite, and modern web technologies**

*Transform your productivity with TaskManagerProV2 - where modern design meets powerful functionality!*
