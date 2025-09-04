// Sample data for demonstration purposes
export const sampleTasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature',
    category: 'Work',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, vegetables',
    category: 'Personal',
    priority: 'medium',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    completedAt: null
  },
  {
    id: '3',
    title: 'Exercise routine',
    description: '30 minutes cardio workout',
    category: 'Health',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0], // Today
    completed: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    completedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Plan weekend trip',
    description: 'Research destinations and book accommodation',
    category: 'Personal',
    priority: 'low',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    completedAt: null
  },
  {
    id: '5',
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for Monday meeting',
    category: 'Work',
    priority: 'high',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday (overdue)
    completed: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    completedAt: null
  }
]

export const sampleNotes = [
  {
    id: '1',
    title: 'Meeting Notes - Project Kickoff',
    content: `Key points from today's project kickoff meeting:

• Project timeline: 8 weeks
• Team members: John, Sarah, Mike, Lisa
• Main deliverables:
  - Requirements analysis (Week 1-2)
  - Design phase (Week 3-4)
  - Development (Week 5-7)
  - Testing and deployment (Week 8)

Action items:
- Set up project repository
- Schedule weekly standup meetings
- Create project documentation template

Next meeting: Friday 2 PM`,
    category: 'Work',
    tags: ['meeting', 'project', 'kickoff'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Recipe Ideas',
    content: `Healthy dinner recipes to try this week:

1. Grilled salmon with quinoa and roasted vegetables
   - Salmon fillets, quinoa, broccoli, bell peppers
   - Season with lemon, herbs, olive oil

2. Chicken stir-fry with brown rice
   - Chicken breast, mixed vegetables, brown rice
   - Use soy sauce, ginger, garlic for flavor

3. Vegetarian pasta with tomato basil sauce
   - Whole wheat pasta, fresh tomatoes, basil
   - Add spinach and mushrooms for extra nutrients`,
    category: 'Personal',
    tags: ['recipes', 'healthy', 'cooking'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Book Recommendations',
    content: `Books to read this quarter:

📚 Fiction:
- "The Seven Husbands of Evelyn Hugo" by Taylor Jenkins Reid
- "Klara and the Sun" by Kazuo Ishiguro
- "Project Hail Mary" by Andy Weir

📖 Non-Fiction:
- "Atomic Habits" by James Clear
- "The Psychology of Money" by Morgan Housel
- "Digital Minimalism" by Cal Newport

📝 Professional Development:
- "Clean Code" by Robert Martin
- "The Pragmatic Programmer" by Hunt & Thomas`,
    category: 'Personal',
    tags: ['books', 'reading', 'learning'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Travel Planning - Europe Trip',
    content: `Planning summer vacation to Europe:

🌍 Destinations (2 weeks):
- Paris, France (3 days)
- Amsterdam, Netherlands (2 days)
- Berlin, Germany (3 days)
- Prague, Czech Republic (2 days)
- Vienna, Austria (2 days)
- Zurich, Switzerland (2 days)

✈️ Transportation:
- Fly into Paris, fly out of Zurich
- Eurail pass for train travel between cities

🏨 Accommodation:
- Mix of hotels and Airbnb
- Book 2-3 months in advance for better rates

💰 Budget estimate: $3,500 per person
- Flights: $800
- Accommodation: $1,200
- Food & activities: $1,200
- Transportation: $300`,
    category: 'Personal',
    tags: ['travel', 'europe', 'vacation', 'planning'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
]

// Function to load sample data into localStorage
export const loadSampleData = () => {
  // Only load if no existing data
  const existingTasks = localStorage.getItem('taskManagerTasks')
  const existingNotes = localStorage.getItem('taskManagerNotes')
  
  if (!existingTasks || JSON.parse(existingTasks).length === 0) {
    localStorage.setItem('taskManagerTasks', JSON.stringify(sampleTasks))
  }
  
  if (!existingNotes || JSON.parse(existingNotes).length === 0) {
    localStorage.setItem('taskManagerNotes', JSON.stringify(sampleNotes))
  }
}