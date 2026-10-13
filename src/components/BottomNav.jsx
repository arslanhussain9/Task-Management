import React from 'react';
import { useTasks } from '../context/TaskContext';
import { 
  LayoutDashboard, 
  Kanban, 
  ListTodo, 
  Activity, 
  User, 
  Plus 
} from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, openCreateModal, setIsAuthModalOpen } = useTasks();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'board', label: 'Board', icon: Kanban },
    { id: 'list', label: 'Tasks', icon: ListTodo },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Floating Action Button */}
      <button
        onClick={() => openCreateModal()}
        className="md:hidden fixed right-6 bottom-24 w-14 h-14 bg-[#080909] text-white rounded-full flex items-center justify-center shadow-2xl hover:opacity-90 active:scale-95 transition-all z-40 border border-[#1b1c1c]"
        aria-label="Add Task"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Floating Pill Bottom Navigation Bar (Boro Signature Style) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
        <nav className="flex items-center gap-1 px-3 py-1.5 bg-[#fcf8f8]/90 backdrop-blur-xl rounded-full border border-[#c4c7c7] shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#080909] text-white scale-105 shadow-sm'
                    : 'text-[#444747] hover:text-[#080909]'
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}

          <div className="w-[1px] h-5 bg-[#e7e8ea] mx-1" />

          {/* User Profile trigger */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 rounded-full text-[#444747] hover:text-[#080909] transition-all"
            title="User Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </>
  );
}
