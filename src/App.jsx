import React from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import DashboardView from './components/DashboardView';
import BoardView from './components/BoardView';
import ListView from './components/ListView';
import ActivityFeedView from './components/ActivityFeedView';
import TaskModal from './components/TaskModal';
import TaskDetailDrawer from './components/TaskDetailDrawer';
import AuthModal from './components/AuthModal';
import NotificationToast from './components/NotificationToast';

function MainApp() {
  const { activeTab } = useTasks();

  return (
    <div className="min-h-screen bg-[#fcf8f8] flex flex-col font-sans selection:bg-[#080909] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Canvas Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'board' && <BoardView />}
        {activeTab === 'list' && <ListView />}
        {activeTab === 'activity' && <ActivityFeedView />}
      </main>

      {/* Floating Bottom Navigation Bar (Mobile) */}
      <BottomNav />

      {/* Overlays, Drawers & Modals */}
      <TaskModal />
      <TaskDetailDrawer />
      <AuthModal />
      <NotificationToast />

      {/* Minimalist Architectural Footer */}
      <footer className="hidden md:block border-t border-[#e7e8ea] py-8 text-center text-xs text-[#747878] mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#080909] text-white flex items-center justify-center text-[10px] font-bold">
              B
            </span>
            <span className="font-semibold text-[#080909]">Boro Task Management</span>
            <span>•</span>
            <span>Polestar-Inspired Utility Minimalism</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Full-Stack Ready</span>
            <span>•</span>
            <span>CRUD & Dynamic Data</span>
            <span>•</span>
            <span className="text-[#075CF2] font-semibold">Deployable on Vercel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <MainApp />
    </TaskProvider>
  );
}
