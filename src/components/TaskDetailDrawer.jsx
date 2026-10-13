import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { 
  X, 
  Calendar, 
  User, 
  CheckSquare, 
  Square, 
  MessageSquare, 
  Send, 
  Trash2, 
  Edit3, 
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function TaskDetailDrawer() {
  const { 
    selectedTaskDetail, 
    setSelectedTaskDetail, 
    toggleSubtask, 
    addComment, 
    deleteTask, 
    openCreateModal,
    moveTaskStatus 
  } = useTasks();

  const [commentInput, setCommentInput] = useState('');

  if (!selectedTaskDetail) return null;

  const task = selectedTaskDetail;
  const statuses = [
    { id: 'todo', label: 'To Do' },
    { id: 'progress', label: 'In Progress' },
    { id: 'review', label: 'In Review' },
    { id: 'completed', label: 'Completed' }
  ];

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(task.id, commentInput);
    setCommentInput('');
  };

  const completedSubtasks = (task.subtasks || []).filter((s) => s.completed).length;
  const totalSubtasks = (task.subtasks || []).length;
  const progressPercent = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={() => setSelectedTaskDetail(null)} 
      />

      <div className="relative w-full max-w-xl h-full bg-white shadow-2xl border-l border-[#e7e8ea] z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#f1f3f5] flex items-center justify-between bg-[#fcf8f8]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#747878] bg-[#f1f3f5] px-2.5 py-1 rounded-full">
              {task.id}
            </span>
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                task.priority === 'High'
                  ? 'bg-rose-50 text-rose-700'
                  : task.priority === 'Medium'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {task.priority} Priority
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                openCreateModal(task);
              }}
              title="Edit Task"
              className="p-2 rounded-full hover:bg-white text-[#444747] hover:text-[#080909] transition-colors border border-transparent hover:border-[#e7e8ea]"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete "${task.title}"?`)) {
                  deleteTask(task.id);
                }
              }}
              title="Delete Task"
              className="p-2 rounded-full hover:bg-rose-50 text-[#747878] hover:text-rose-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedTaskDetail(null)}
              className="p-2 rounded-full hover:bg-white text-[#747878] hover:text-[#080909] transition-colors border border-transparent hover:border-[#e7e8ea]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
          {/* Title */}
          <div>
            <h1 className="text-xl font-bold text-[#080909] leading-snug">
              {task.title}
            </h1>
            <p className="text-xs text-[#747878] mt-2 leading-relaxed">
              {task.description || 'No detailed description provided.'}
            </p>
          </div>

          {/* Workflow Stage Bar */}
          <div className="p-4 rounded-2xl bg-[#fcf8f8] border border-[#e7e8ea]">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#747878] mb-2.5">
              Workflow Status
            </span>
            <div className="grid grid-cols-4 gap-1.5 bg-[#f1f3f5] p-1 rounded-full">
              {statuses.map((st) => {
                const isActive = task.status === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => moveTaskStatus(task.id, st.id)}
                    className={`py-1.5 px-2 rounded-full text-xs font-semibold transition-all text-center ${
                      isActive
                        ? 'bg-[#080909] text-white shadow-xs'
                        : 'text-[#444747] hover:text-[#080909]'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-[#fcf8f8] border border-[#e7e8ea]">
              <span className="text-[11px] text-[#747878] block font-medium">Assigned To</span>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-6 h-6 rounded-full bg-[#080909] text-white flex items-center justify-center text-[10px] font-bold">
                  {task.assignee?.avatar || 'U'}
                </div>
                <span className="text-xs font-semibold text-[#1c1b1b]">
                  {task.assignee?.name || 'Unassigned'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fcf8f8] border border-[#e7e8ea]">
              <span className="text-[11px] text-[#747878] block font-medium">Target Deadline</span>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-[#1c1b1b]">
                <Calendar className="w-3.5 h-3.5 text-[#747878]" />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Subtasks Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#080909] flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-[#075CF2]" />
                Deliverable Checklist ({completedSubtasks}/{totalSubtasks})
              </span>
              <span className="text-[11px] font-semibold text-[#747878]">
                {Math.round(progressPercent)}%
              </span>
            </div>

            {totalSubtasks > 0 && (
              <div className="w-full bg-[#f1f3f5] h-1.5 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-[#080909] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            <div className="space-y-2">
              {(task.subtasks || []).map((st) => (
                <div
                  key={st.id}
                  onClick={() => toggleSubtask(task.id, st.id)}
                  className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                    st.completed
                      ? 'bg-[#fcf8f8] border-[#e7e8ea] text-[#747878]'
                      : 'bg-white border-[#e7e8ea] hover:border-[#080909] text-[#1c1b1b]'
                  }`}
                >
                  <div className="mt-0.5">
                    {st.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-[#747878]" />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${st.completed ? 'line-through text-[#747878]' : ''}`}>
                    {st.text}
                  </span>
                </div>
              ))}

              {totalSubtasks === 0 && (
                <p className="text-xs text-[#747878] italic">No subtask milestones added yet.</p>
              )}
            </div>
          </div>

          {/* Comments Discussion Thread */}
          <div className="pt-2">
            <span className="text-xs font-bold text-[#080909] flex items-center gap-1.5 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#075CF2]" />
              Discussion & Updates ({(task.comments || []).length})
            </span>

            <div className="space-y-3 mb-4">
              {(task.comments || []).map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-[#fcf8f8] border border-[#e7e8ea]">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#080909]">{c.author}</span>
                    <span className="text-[#747878]">{c.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#444747] leading-relaxed">{c.text}</p>
                </div>
              ))}

              {(task.comments || []).length === 0 && (
                <p className="text-xs text-[#747878] italic">No comments yet. Start the thread below.</p>
              )}
            </div>
          </div>
        </div>

        {/* Comment Input Footer */}
        <div className="p-4 bg-[#fcf8f8] border-t border-[#e7e8ea]">
          <form onSubmit={handleSendComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Leave a comment or progress note..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-white text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="px-4 py-2.5 rounded-full bg-[#080909] disabled:bg-stone-300 text-white text-xs font-semibold shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
