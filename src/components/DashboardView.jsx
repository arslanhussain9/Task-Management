import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { 
  CheckCircle, 
  Clock, 
  ListChecks, 
  Eye, 
  ArrowUpRight, 
  TrendingUp, 
  Plus, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function DashboardView() {
  const { tasks, openCreateModal, setActiveTab, setSelectedTaskDetail } = useTasks();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'progress').length;
  const inReviewTasks = tasks.filter((t) => t.status === 'review').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Bar chart heights representing team activity rhythm
  const barHeights = [
    { h: 'h-8', label: 'Mon' },
    { h: 'h-12', label: 'Tue' },
    { h: 'h-10', label: 'Wed' },
    { h: 'h-16', label: 'Thu' },
    { h: 'h-20', label: 'Fri' },
    { h: 'h-14', label: 'Sat' },
    { h: 'h-24', label: 'Sun' },
    { h: 'h-18', label: 'Mon' },
    { h: 'h-28', label: 'Tue' },
    { h: 'h-32 bg-[#080909]', label: 'Today', highlight: true }, // Highlighted bar
    { h: 'h-16', label: 'Thu' },
    { h: 'h-20', label: 'Fri' },
    { h: 'h-24', label: 'Sat' },
    { h: 'h-12', label: 'Sun' },
    { h: 'h-14', label: 'Mon' },
    { h: 'h-16', label: 'Tue' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 pb-24">
      {/* Hero Overview Section (Styled after Boro Balance Section) */}
      <section className="bg-white rounded-3xl p-8 border border-[#e7e8ea] shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#747878]">
            Workspace Productivity
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
            <TrendingUp className="w-3 h-3 mr-1" />
            {completionRate}% Completed
          </span>
        </div>

        {/* Large Metric Display */}
        <div className="flex items-baseline justify-center font-bold tracking-tight text-[#080909] my-2">
          <span className="text-6xl sm:text-7xl font-semibold">{completedTasks}</span>
          <span className="text-4xl sm:text-5xl text-[#747878] font-normal ml-1">/{totalTasks}</span>
          <span className="text-base text-[#747878] font-medium ml-3">Tasks Finished</span>
        </div>

        <p className="text-xs text-[#747878] max-w-md mt-1">
          Real-time tracking of team delivery velocity, priorities, and workflow stages.
        </p>

        {/* Interactive Activity Bars (from Stitch Boro Wallet screen) */}
        <div className="mt-8 flex justify-center items-end gap-2 sm:gap-3 h-36 w-full max-w-xl px-4 pt-4 border-b border-[#f1f3f5]">
          {barHeights.map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-full max-w-[10px] rounded-full transition-all duration-300 ${
                  bar.highlight ? 'bg-[#080909]' : 'bg-[#e5e2e1] hover:bg-[#747878]'
                } ${bar.h}`}
                title={`Activity point ${idx + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Time Selector Pills */}
        <div className="mt-6 flex justify-center items-center gap-2 sm:gap-4 text-xs font-semibold text-[#747878]">
          {['1D', '1W', '1M', '6M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1 rounded-full transition-all ${
                selectedTimeframe === tf
                  ? 'bg-[#080909] text-white shadow-xs'
                  : 'hover:text-[#080909] hover:bg-[#f1f3f5]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      {/* Bento Grid - Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* To Do Card */}
        <div 
          onClick={() => setActiveTab('board')}
          className="bg-white rounded-2xl p-5 border border-[#e7e8ea] hover:border-[#080909] shadow-xs cursor-pointer transition-all flex flex-col justify-between h-36 group"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#747878]">To Do</span>
            <div className="w-7 h-7 rounded-full bg-[#f1f3f5] flex items-center justify-center text-[#444747] group-hover:bg-[#080909] group-hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-[#080909] tracking-tight">{todoTasks}</span>
            <p className="text-[11px] text-[#747878] mt-0.5">Pending launch</p>
          </div>
        </div>

        {/* In Progress Card */}
        <div 
          onClick={() => setActiveTab('board')}
          className="bg-white rounded-2xl p-5 border border-[#e7e8ea] hover:border-[#075CF2] shadow-xs cursor-pointer transition-all flex flex-col justify-between h-36 group"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#747878]">In Progress</span>
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[#075CF2] group-hover:bg-[#075CF2] group-hover:text-white transition-colors">
              <ListChecks className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-[#075CF2] tracking-tight">{inProgressTasks}</span>
            <p className="text-[11px] text-[#747878] mt-0.5">Active execution</p>
          </div>
        </div>

        {/* In Review Card */}
        <div 
          onClick={() => setActiveTab('board')}
          className="bg-white rounded-2xl p-5 border border-[#e7e8ea] hover:border-amber-500 shadow-xs cursor-pointer transition-all flex flex-col justify-between h-36 group"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#747878]">In Review</span>
            <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-amber-700 tracking-tight">{inReviewTasks}</span>
            <p className="text-[11px] text-[#747878] mt-0.5">Awaiting check</p>
          </div>
        </div>

        {/* Completed Card */}
        <div 
          onClick={() => setActiveTab('board')}
          className="bg-white rounded-2xl p-5 border border-[#e7e8ea] hover:border-emerald-500 shadow-xs cursor-pointer transition-all flex flex-col justify-between h-36 group"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#747878]">Completed</span>
            <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-emerald-700 tracking-tight">{completedTasks}</span>
            <p className="text-[11px] text-[#747878] mt-0.5">Production ready</p>
          </div>
        </div>
      </section>

      {/* Action Banner (styled after Boro Earn Banner) */}
      <section className="bg-white rounded-3xl p-6 border border-[#e7e8ea] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-[#f1f3f5] flex items-center justify-center text-[#080909] shrink-0">
            <Sparkles className="w-6 h-6 text-[#075CF2]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#080909]">Create & Assign New Deliverables</h3>
            <p className="text-xs text-[#747878] mt-0.5">
              Organize sprints, assign team owners, and define checklist items with real-time sync.
            </p>
          </div>
        </div>

        <button
          onClick={() => openCreateModal()}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#080909] text-white text-xs font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all shrink-0 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </section>

      {/* Recent High Priority Tasks */}
      <section className="bg-white rounded-3xl p-6 border border-[#e7e8ea] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#080909]">Urgent & High Priority Items</h3>
          <button
            onClick={() => setActiveTab('board')}
            className="text-xs font-semibold text-[#075CF2] hover:underline flex items-center gap-1"
          >
            View Board
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#f1f3f5]">
          {tasks
            .filter((t) => t.priority === 'High')
            .slice(0, 4)
            .map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTaskDetail(task)}
                className="py-3 flex items-center justify-between hover:bg-[#fcf8f8] px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#080909]">{task.title}</h4>
                    <p className="text-[11px] text-[#747878]">Due {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f3f5] text-[#444747]">
                    {task.status}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#080909] text-white flex items-center justify-center text-[10px] font-bold">
                    {task.assignee?.avatar || 'U'}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
