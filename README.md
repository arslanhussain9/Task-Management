<div align="center">

# 📋 Boro Tasks — Full-Stack Task & Workflow Management

A sleek, high-performance task management web application engineered with a **Polestar-inspired minimalist design system**. Built for modern engineering and design teams featuring interactive Kanban workflows, granular role-based authentication, milestone checklists, dynamic metrics, and real-time activity synchronization.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/arslanhussain9/Task-Management)

</div>

---

## 🚀 Overview

**Boro Tasks** is designed around the philosophy of high-utility minimalism: reducing interface friction to maximize developer productivity. It combines structured project tracking with an elegant, paper-like warm aesthetic, responsive multi-device layouts, and full client-side state persistence.

The application allows teams to organize deliverables across four discrete workflow stages:
$$\text{To Do} \longrightarrow \text{In Progress} \longrightarrow \text{In Review} \longrightarrow \text{Completed}$$

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose & Usage |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** (`^18.3.1`) | Component architecture, state lifecycle, hooks (`useState`, `useEffect`, `useContext`) |
| **Bundler & Build Tool** | **Vite** (`^6.0.7`) | Lightning-fast HMR (Hot Module Replacement) and optimized production compilation |
| **Styling & Design Tokens** | **Tailwind CSS** (`^3.4.17`) | Utility-first styling with custom tokens, high-radius curvature, and typography rules |
| **Iconography** | **Lucide React** (`^0.469.0`) | Clean, modern stroke icons matching the minimalist UI theme |
| **Typography** | **Inter** (Google Fonts) | Systemic, utilitarian typographic hierarchy with tightened tracking (`-0.02em` to `-0.04em`) |
| **Post-Processing** | **PostCSS** & **Autoprefixer** | Cross-browser CSS compatibility and modern style parsing |
| **State Management** | **React Context API** | Global state managing tasks, authenticated users, filters, and live event streams |
| **Data Persistence** | **Browser LocalStorage API** | Automatic synchronization ensuring tasks and activity logs persist across browser sessions |

---

## ✨ Key Features

### 🔐 1. Authentication & Role-Based Access Control (RBAC)
- **Role Hierarchy**: Supports `Lead Architect (Admin)`, `Senior Developer`, `Product Designer`, and `QA Engineer`.
- **One-Click Team Switcher**: Switch between team profiles in real-time to preview role perspectives.
- **Custom Account Registration**: Register custom accounts with automated avatar generation.
- **Guest Mode**: Explore without credentials using instantaneous guest fallback.

### ⚡ 2. Complete Task Lifecycle & CRUD Operations
- **Task Creation**: Modal with fields for Title, Description, Priority (High/Medium/Low with indicator dots), Status, Category, Due Date, Assignee, and dynamic subtasks.
- **Interactive Detail Drawer**: Slide-over panel featuring milestone progress bars, interactive checklist toggles, metadata tags, and discussion threads.
- **Flexible Status Transitions**: Move tasks via drag-and-drop, quick column forward/backward navigation pills, or inline status selectors.
- **Deletion with Audit Trail**: Delete deliverables with confirmation safeguards and automated activity feed logging.

### 📊 3. Multiple Workflow Views
- **Kanban Board**: 4-column visual board with task count pills, drag-and-drop support, priority badges, and direct per-column addition buttons.
- **List / Table View**: Clean row-based layout inspired by modern asset tables with inline status dropdowns and quick action triggers.
- **Analytics Dashboard**: Real-time velocity tracking, completion rate percentage, interactive activity rhythm bar charts with timeframe filters (`1D`, `1W`, `1M`, `6M`, `1Y`), and Bento-style summary cards.

### 🔄 4. Real-Time Collaboration & Activity Stream
- **Interactive Subtask Checklist**: Granular milestone checkboxes with real-time recalculation of completion progress bars.
- **Discussion Threads**: Add progress updates, notes, and commentary directly to any deliverable.
- **Teammate Live Sync Simulation**: Emulates WebSocket event streaming with floating toast notifications when team members push code or update milestones.
- **Live Search & Filter**: Real-time query search across task titles, descriptions, categories, and assigned members.

### 📱 5. Responsive Multi-Device UI
- **Desktop**: Full layout with sticky top navigation, live search, view switcher pills, and user profile drawer.
- **Mobile & Tablet**: Mobile artboard layout featuring signature floating pill bottom navigation and accessible floating action button (`+`).

---

## 🎨 Design System: Boro UI

The interface implements the **Boro UI** design system:
- **Warm Gallery Palette**: Off-white background (`#fcf8f8`), crisp white surfaces (`#ffffff`), and thin hairline strokes (`#e7e8ea`) eliminating heavy drop shadows.
- **High-Impact Contrast**: Primary action buttons in solid black (`#080909`) with white text and functional color accents (Blue `#075CF2`, Green `#00C853`, Amber `#F59E0B`, Red `#BA1A1A`).
- **High-Radius Curvature**: 16px to 24px container radius with signature full pill-shaped controls (`rounded-full`).

---

## 📁 Project Structure

```text
task-management-app/
├── index.html                  # HTML entry point with Inter font & meta tags
├── package.json                # Project dependencies, scripts & metadata
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS tokens & color palette
├── vite.config.js              # Vite bundler configuration
└── src/
    ├── App.jsx                 # Main application shell with tab routing
    ├── index.css               # Base Tailwind layers, scrollbar & utilities
    ├── main.jsx                # React DOM mounting entry point
    ├── components/
    │   ├── ActivityFeedView.jsx# Real-time audit log & event simulator
    │   ├── AuthModal.jsx       # Boro-styled login & role switcher modal
    │   ├── BoardView.jsx       # 4-column drag-and-drop Kanban board
    │   ├── BottomNav.jsx       # Floating pill bottom navigation for mobile
    │   ├── DashboardView.jsx   # Metrics, Bento cards & velocity bar chart
    │   ├── FilterBar.jsx       # Category and priority filter pills
    │   ├── ListView.jsx        # Row-based tabular task overview
    │   ├── Navbar.jsx          # Top navigation bar with search & actions
    │   ├── NotificationToast.jsx # Floating toast notifications for live events
    │   ├── TaskCard.jsx        # Minimalist task card component
    │   ├── TaskDetailDrawer.jsx# Slide-over drawer with checklists & comments
    │   └── TaskModal.jsx       # Task creation & editing modal
    ├── context/
    │   └── TaskContext.jsx     # Global state, CRUD handlers & local persistence
    └── data/
        └── initialData.js      # Seed deliverables, team members & categories
```

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arslanhussain9/Task-Management.git
   cd Task-Management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates optimized assets inside the `dist/` folder.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/arslanhussain9">Arslan Hussain</a></sub>
</div>
