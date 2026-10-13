export const INITIAL_USER = {
  id: 'usr_01',
  name: 'Arslan Hussain',
  email: 'arslan@boro.design',
  role: 'Lead Architect',
  avatar: 'AH',
  isLoggedIn: true
};

export const INITIAL_TASKS = [
  {
    id: 'TASK-101',
    title: 'Design Minimalist Task Dashboard',
    description: 'Implement the Polestar-inspired high-utility minimalist layout adhering to Boro design system tokens and high-radius cards.',
    priority: 'High',
    status: 'completed',
    category: 'Design',
    assignee: {
      name: 'Arslan Hussain',
      avatar: 'AH',
      email: 'arslan@boro.design'
    },
    dueDate: '2026-10-14',
    subtasks: [
      { id: 'sub_1', text: 'Define 24px container padding and rhythm', completed: true },
      { id: 'sub_2', text: 'Configure custom Warm Gallery color palette', completed: true },
      { id: 'sub_3', text: 'Render high-contrast pill action buttons', completed: true }
    ],
    comments: [
      {
        id: 'c_1',
        author: 'Sarah Chen',
        text: 'The warm off-white background (#fcf8f8) gives a paper-like feel.',
        timestamp: '2 hours ago'
      }
    ],
    createdAt: '2026-10-12T10:00:00.000Z'
  },
  {
    id: 'TASK-102',
    title: 'Implement Full CRUD Operations for Tasks',
    description: 'Enable creating, updating, moving status, and deleting tasks with instant optimistic UI and validation.',
    priority: 'High',
    status: 'progress',
    category: 'Frontend',
    assignee: {
      name: 'Sumit Kumar',
      avatar: 'SK',
      email: 'sumit@boro.design'
    },
    dueDate: '2026-10-16',
    subtasks: [
      { id: 'sub_4', text: 'Build task modal with validation', completed: true },
      { id: 'sub_5', text: 'Add interactive subtask checklist toggle', completed: true },
      { id: 'sub_6', text: 'Add confirmation toast on deletion', completed: false }
    ],
    comments: [
      {
        id: 'c_2',
        author: 'Arslan Hussain',
        text: 'Make sure subtask completion updates the task progress bar automatically.',
        timestamp: '35 mins ago'
      }
    ],
    createdAt: '2026-10-12T14:30:00.000Z'
  },
  {
    id: 'TASK-103',
    title: 'Connect Real-Time Event Sync & Activity Feed',
    description: 'Simulate live collaborator updates using WebSocket simulation and broadcast notifications for team members.',
    priority: 'Medium',
    status: 'progress',
    category: 'Backend',
    assignee: {
      name: 'Alex Rivera',
      avatar: 'AR',
      email: 'alex@boro.design'
    },
    dueDate: '2026-10-18',
    subtasks: [
      { id: 'sub_7', text: 'Create event emitter for status transitions', completed: true },
      { id: 'sub_8', text: 'Broadcast audit activity logs', completed: false },
      { id: 'sub_9', text: 'Display toast notifications for remote actions', completed: false }
    ],
    comments: [],
    createdAt: '2026-10-13T09:15:00.000Z'
  },
  {
    id: 'TASK-104',
    title: 'Authenticate User & Role-Based Authorization',
    description: 'Support sign in, sign out, switch demo accounts, and control member vs admin capabilities.',
    priority: 'High',
    status: 'review',
    category: 'Security',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'SC',
      email: 'sarah@boro.design'
    },
    dueDate: '2026-10-15',
    subtasks: [
      { id: 'sub_10', text: 'Design Boro-style bottom auth modal', completed: true },
      { id: 'sub_11', text: 'Persist authenticated session in storage', completed: true },
      { id: 'sub_12', text: 'Lock admin-only actions (reset data, delete all)', completed: true }
    ],
    comments: [
      {
        id: 'c_3',
        author: 'Alex Rivera',
        text: 'Guest demo button works smoothly without requiring password entry.',
        timestamp: '1 hour ago'
      }
    ],
    createdAt: '2026-10-13T11:00:00.000Z'
  },
  {
    id: 'TASK-105',
    title: 'Configure Vercel Deployment & SPA Routing',
    description: 'Optimize build outputs, create vercel.json rewrite rules, and ensure zero 404s on direct route reloads.',
    priority: 'Medium',
    status: 'todo',
    category: 'DevOps',
    assignee: {
      name: 'Arslan Hussain',
      avatar: 'AH',
      email: 'arslan@boro.design'
    },
    dueDate: '2026-10-19',
    subtasks: [
      { id: 'sub_13', text: 'Create vercel.json with SPA rewrites', completed: true },
      { id: 'sub_14', text: 'Test production build with vite build', completed: false }
    ],
    comments: [],
    createdAt: '2026-10-13T12:00:00.000Z'
  },
  {
    id: 'TASK-106',
    title: 'Mobile Artboard Optimization & Bottom Nav',
    description: 'Ensure floating pill navigation, touch targets, and responsive drawer work on iOS and Android viewports.',
    priority: 'Low',
    status: 'todo',
    category: 'Design',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'SC',
      email: 'sarah@boro.design'
    },
    dueDate: '2026-10-21',
    subtasks: [
      { id: 'sub_15', text: 'Implement pill-shaped bottom nav bar', completed: true },
      { id: 'sub_16', text: 'Test safe-area insets on mobile display', completed: false }
    ],
    comments: [],
    createdAt: '2026-10-13T12:30:00.000Z'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act_1',
    user: 'Arslan Hussain',
    action: 'marked as completed',
    taskTitle: 'Design Minimalist Task Dashboard',
    time: '10m ago',
    type: 'success'
  },
  {
    id: 'act_2',
    user: 'Sumit Kumar',
    action: 'updated checklist on',
    taskTitle: 'Implement Full CRUD Operations for Tasks',
    time: '25m ago',
    type: 'info'
  },
  {
    id: 'act_3',
    user: 'Sarah Chen',
    action: 'moved to In Review',
    taskTitle: 'Authenticate User & Role-Based Authorization',
    time: '45m ago',
    type: 'warning'
  },
  {
    id: 'act_4',
    user: 'Alex Rivera',
    action: 'added comment to',
    taskTitle: 'Connect Real-Time Event Sync & Activity Feed',
    time: '1h ago',
    type: 'neutral'
  }
];

export const TEAM_MEMBERS = [
  { name: 'Arslan Hussain', avatar: 'AH', role: 'Lead Architect', email: 'arslan@boro.design' },
  { name: 'Sumit Kumar', avatar: 'SK', role: 'Full Stack Engineer', email: 'sumit@boro.design' },
  { name: 'Sarah Chen', avatar: 'SC', role: 'Product Designer', email: 'sarah@boro.design' },
  { name: 'Alex Rivera', avatar: 'AR', role: 'Backend Engineer', email: 'alex@boro.design' }
];

export const CATEGORIES = ['All', 'Frontend', 'Backend', 'Design', 'DevOps', 'Security'];
