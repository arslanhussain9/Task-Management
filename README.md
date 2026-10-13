# Boro Tasks — Full-Stack Task Management Application

A modern, high-utility minimalist task management web application engineered with the **Boro UI** design system (Stitch Design), featuring Kanban workflows, task lifecycle CRUD, role-based authentication, real-time collaboration updates, interactive velocity charts, and responsive mobile/desktop interfaces.

Built and optimized for one-click deployment on **Vercel**.

---

## Preview & Live Architecture

- **Design Philosophy**: Polestar-inspired high-utility minimalism, warm gallery paper-like aesthetic (`#fcf8f8`), high-radius curvature, and typography-driven visual hierarchy.
- **Workflow Stages**: `To Do` → `In Progress` → `In Review` → `Completed`.
- **Framework**: React 18 + Vite + Tailwind CSS + Lucide Icons.
- **Hosting Target**: Vercel (with SPA route fallback in `vercel.json`).

---

## Key Features

### 1. User Authentication & Authorization
- **Role-Based Access Control**: Lead Architect (Admin), Senior Developer, Product Designer, QA Engineer.
- **Quick Team Account Switcher**: Test different team roles in one click.
- **Custom Account Registration & Login**: Persistent user state with session storage.
- **Guest Demo Mode**: Unauthenticated exploration with instant guest fallback.

### 2. Task Lifecycle & CRUD Operations
- **Create**: Add deliverables with title, priority (High, Medium, Low), status, category, target deadline, assigned member, and subtasks.
- **Read**: Interactive slide-over drawer with progress bar, checklists, metadata tags, and discussion threads.
- **Update**: Edit details, reassign members, toggle status with quick nav pills or dropdowns.
- **Delete**: Remove tasks with safety confirmation and activity stream notifications.

### 3. Multiple Views & Workflow Boards
- **Kanban Board**: Drag-and-drop support, drag status indicators, task counters, and quick add buttons per column.
- **List / Table View**: Clean row-based layout inspired by Boro asset tables, inline status switchers, and action triggers.
- **Dashboard Overview**: Productivity rate metrics, Bento metric cards (To Do, In Progress, In Review, Completed), and weekly velocity bar charts with highlights.
- **Real-Time Activity Feed**: Live audit stream tracking creations, moves, comments, and subtask completions.

### 4. Interactive Collaboration & Real-Time Sync
- **Subtask Checklist**: Interactive milestone checkboxes with dynamic progress percentage recalculation.
- **Comments & Discussion**: Real-time team commentary on any deliverable.
- **Live Sync Simulation**: WebSocket-style simulated teammate events with floating toast alerts.
- **Instant Search & Filtering**: Filter by Category pill, Priority pill, or live text search.

### 5. Responsive Design
- **Desktop**: Full layout with top sticky navigation, search, view pills, and profile drawer.
- **Mobile / Tablet**: Responsive view with signature Boro floating pill bottom navigation and mobile floating action button (`+`).

---

## Getting Started Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Production Build & Vercel Deployment

### 1. Test Production Build
```bash
npm run build
```

### 2. Deploy to Vercel
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete Boro Task Management full-stack application"
   git remote set-url origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)**.
3. Import your GitHub repository.
4. Framework preset will automatically detect **Vite**.
5. Click **Deploy**.
