import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TEAM_MEMBERS } from '../data/initialData';
import { X, Sparkles, UserCheck, Shield } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, login, logout } = useTasks();

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'custom'
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState('Developer');

  if (!isAuthModalOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;

    const initials = customName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    login({
      id: 'usr_' + Date.now(),
      name: customName.trim(),
      email: customEmail.trim(),
      role: customRole,
      avatar: initials || 'U',
      isLoggedIn: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsAuthModalOpen(false)} 
      />

      {/* Styled bottom sheet for mobile, modal for desktop */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e7e8ea] z-10 animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f1f3f5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#080909] text-white flex items-center justify-center font-bold text-sm">
              B
            </div>
            <div>
              <h2 className="text-base font-bold text-[#080909]">
                User Authentication & Role Management
              </h2>
              <p className="text-xs text-[#747878]">
                Boro Identity & Access Control
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#f1f3f5] text-[#747878] hover:text-[#080909] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current User Status Banner */}
        <div className="my-5 p-4 rounded-2xl bg-[#fcf8f8] border border-[#e7e8ea] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#080909] text-white flex items-center justify-center text-xs font-bold">
              {user?.avatar || 'U'}
            </div>
            <div>
              <p className="text-xs font-bold text-[#080909]">{user?.name}</p>
              <p className="text-[11px] text-[#747878]">{user?.role} • {user?.email}</p>
            </div>
          </div>
          {user?.isLoggedIn && (
            <button
              onClick={logout}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-[#f1f3f5] rounded-full mb-5">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'demo' ? 'bg-white text-[#080909] shadow-xs' : 'text-[#747878]'
            }`}
          >
            Team Quick Switch
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'custom' ? 'bg-white text-[#080909] shadow-xs' : 'text-[#747878]'
            }`}
          >
            Create / Custom Login
          </button>
        </div>

        {/* Tab 1: Team Quick Switch */}
        {activeTab === 'demo' && (
          <div className="space-y-2.5">
            <p className="text-xs text-[#747878] mb-2 font-medium">
              Select any team member to preview role-based access:
            </p>
            {TEAM_MEMBERS.map((member) => (
              <button
                key={member.email}
                onClick={() =>
                  login({
                    id: 'usr_' + member.avatar,
                    name: member.name,
                    email: member.email,
                    role: member.role,
                    avatar: member.avatar
                  })
                }
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                  user?.email === member.email
                    ? 'border-[#080909] bg-stone-50'
                    : 'border-[#e7e8ea] hover:border-[#747878] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#080909] text-white flex items-center justify-center text-xs font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#080909]">{member.name}</h4>
                    <p className="text-[11px] text-[#747878]">{member.role}</p>
                  </div>
                </div>
                {user?.email === member.email ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Active
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-[#075CF2]">Switch</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Custom Login */}
        {activeTab === 'custom' && (
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g., Alex Johnson"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:bg-white focus:border-[#080909]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:bg-white focus:border-[#080909]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1">
                Role
              </label>
              <select
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-semibold text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
              >
                <option value="Lead Architect">Lead Architect (Admin)</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Product Designer">Product Designer</option>
                <option value="QA Engineer">QA Engineer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#080909] text-white text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
            >
              Sign In as {customName || 'User'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
