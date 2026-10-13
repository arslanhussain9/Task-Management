import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { TEAM_MEMBERS, CATEGORIES } from '../data/initialData';
import { X, Plus, Trash2, Calendar, User, Tag, AlertCircle } from 'lucide-react';

export default function TaskModal() {
  const { isTaskModalOpen, closeTaskModal, editingTask, createTask, updateTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('todo');
  const [category, setCategory] = useState('Frontend');
  const [dueDate, setDueDate] = useState('');
  const [assigneeName, setAssigneeName] = useState(TEAM_MEMBERS[0].name);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'Medium');
      setStatus(editingTask.status || 'todo');
      setCategory(editingTask.category || 'Frontend');
      setDueDate(editingTask.dueDate || '');
      setAssigneeName(editingTask.assignee?.name || TEAM_MEMBERS[0].name);
      setSubtasks(editingTask.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('todo');
      setCategory('Frontend');
      setDueDate(new Date().toISOString().split('T')[0]);
      setAssigneeName(TEAM_MEMBERS[0].name);
      setSubtasks([]);
    }
    setError('');
  }, [editingTask, isTaskModalOpen]);

  if (!isTaskModalOpen) return null;

  const handleAddSubtask = () => {
    if (!newSubtaskText.trim()) return;
    setSubtasks([
      ...subtasks,
      {
        id: 'st_' + Date.now(),
        text: newSubtaskText.trim(),
        completed: false
      }
    ]);
    setNewSubtaskText('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((st) => st.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a task title.');
      return;
    }

    const assignedMember =
      TEAM_MEMBERS.find((m) => m.name === assigneeName) || TEAM_MEMBERS[0];

    const taskPayload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      category,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      assignee: {
        name: assignedMember.name,
        avatar: assignedMember.avatar,
        email: assignedMember.email
      },
      subtasks
    };

    if (editingTask?.id) {
      updateTask(editingTask.id, taskPayload);
    } else {
      createTask(taskPayload);
    }

    closeTaskModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={closeTaskModal} 
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e7e8ea] z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f1f3f5]">
          <div>
            <h2 className="text-lg font-bold text-[#080909]">
              {editingTask?.id ? 'Edit Deliverable' : 'Create New Deliverable'}
            </h2>
            <p className="text-xs text-[#747878] mt-0.5">
              Fill in key task parameters, assignments, and milestones.
            </p>
          </div>
          <button
            onClick={closeTaskModal}
            className="p-1.5 rounded-full hover:bg-[#f1f3f5] text-[#747878] hover:text-[#080909] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#080909] mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Set up WebSocket real-time channel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:bg-white focus:border-[#080909] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#080909] mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Detail the technical or design expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:bg-white focus:border-[#080909] transition-all resize-none"
            />
          </div>

          {/* Grid row: Priority & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-semibold text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-semibold text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
              >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Grid row: Category & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-semibold text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#080909] mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
              />
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-xs font-bold text-[#080909] mb-1.5">
              Assigned Team Member
            </label>
            <select
              value={assigneeName}
              onChange={(e) => setAssigneeName(e.target.value)}
              className="w-full px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909]"
            >
              {TEAM_MEMBERS.map((member) => (
                <option key={member.name} value={member.name}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
          </div>

          {/* Subtasks Builder */}
          <div>
            <label className="block text-xs font-bold text-[#080909] mb-1.5">
              Milestone Checklist (Subtasks)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add subtask item..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="flex-1 px-3 py-2 rounded-2xl bg-[#f1f3f5] text-xs font-medium text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-4 py-2 rounded-full bg-[#f1f3f5] hover:bg-[#080909] hover:text-white text-xs font-semibold transition-colors"
              >
                Add
              </button>
            </div>

            {subtasks.length > 0 && (
              <div className="space-y-1.5 max-h-32 overflow-y-auto no-scrollbar pt-1">
                {subtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#fcf8f8] border border-[#e7e8ea] text-xs"
                  >
                    <span className="text-[#444747] font-medium">{st.text}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(st.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#f1f3f5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeTaskModal}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#747878] hover:text-[#080909] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#080909] text-white text-xs font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              {editingTask?.id ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
