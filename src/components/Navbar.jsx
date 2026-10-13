import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { 
  Plus, 
  Search, 
  LayoutDashboard, 
  Kanban, 
  ListTodo, 
  Activity, 
  User, 
  LogOut, 
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function Navbar() {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    openCreateModal, 
    setIsAuthModalOpen, 
    logout,
    resetToDefaultData,
    realtimeActive,
    setRealtimeActive
  } = useTasks();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fcf8f8]/90 backdrop-blur-md border-b border-[#e7e8ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand & Logo */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#080909] text-white flex items-center justify-center font-bold text-base shadow-sm border border-[#1b1c1c] transition-transform group-hover:scale-105">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight text-[#080909]">
                  Boro<span className="text-[#075CF2] ml-0.5">Tasks</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#747878] font-medium -mt-0.5">
                  Full-Stack Architecture
                </span>
              </div>
            </div>

            {/* Desktop Navigation View Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 bg-[#f1f3f5] p-1.5 rounded-full border border-[#e7e8ea]/80">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#080909] text-white shadow-sm'
                    : 'text-[#444747] hover:text-[#080909] hover:bg-white/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>

              <button
                onClick={() => setActiveTab('board')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'board'
                    ? 'bg-[#080909] text-white shadow-sm'
                    : 'text-[#444747] hover:text-[#080909] hover:bg-white/60'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                Kanban Board
              </button>

              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'list'
                    ? 'bg-[#080909] text-white shadow-sm'
                    : 'text-[#444747] hover:text-[#080909] hover:bg-white/60'
                }`}
              >
                <ListTodo className="w-3.5 h-3.5" />
                Task List
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'activity'
                    ? 'bg-[#080909] text-white shadow-sm'
                    : 'text-[#444747] hover:text-[#080909] hover:bg-white/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Live Feed
              </button>
            </nav>
          </div>

          {/* Center Search Input */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#747878] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tasks, tags, team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-full bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] placeholder-[#747878] border border-[#e7e8ea] focus:outline-none focus:bg-white focus:border-[#080909] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#080909]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Realtime Live Sync Pill */}
            <button
              onClick={() => setRealtimeActive(!realtimeActive)}
              title="Toggle Live WebSocket Sync Simulation"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                realtimeActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-stone-100 text-stone-500 border-stone-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${realtimeActive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
              {realtimeActive ? 'Live Sync' : 'Paused'}
            </button>

            {/* Create Task Button */}
            <button
              onClick={() => openCreateModal()}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#080909] text-white text-xs font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Task</span>
            </button>

            {/* User Profile & Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-[#f1f3f5] hover:bg-white border border-[#e7e8ea] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#080909] text-white flex items-center justify-center text-xs font-bold">
                  {user?.avatar || 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-[#1c1b1b]">
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e7e8ea] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-[#f1f3f5]">
                      <p className="text-xs font-bold text-[#1c1b1b]">{user?.name}</p>
                      <p className="text-[11px] text-[#747878] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#f1f3f5] text-[10px] font-semibold text-[#075CF2]">
                        {user?.role || 'Member'}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#444747] hover:bg-[#f1f3f5] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#747878]" />
                        Switch / Authenticate User
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          resetToDefaultData();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#444747] hover:bg-[#f1f3f5] transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#747878]" />
                        Reset Demo Tasks
                      </button>
                    </div>

                    <div className="pt-1 border-t border-[#f1f3f5]">
                      {user?.isLoggedIn ? (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            setIsAuthModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#075CF2] hover:bg-blue-50 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Sign In / Register
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
