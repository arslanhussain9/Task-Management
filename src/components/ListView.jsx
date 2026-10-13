import React from 'react';
import { useTasks } from '../context/TaskContext';
import FilterBar from './FilterBar';
import { 
  CheckSquare, 
  Calendar, 
  Edit3, 
  Trash2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function ListView() {
  const { 
    filteredTasks, 
    setSelectedTaskDetail, 
    openCreateModal, 
    deleteTask, 
    moveTaskStatus 
  } = useTasks();

  const statuses = [
    { id: 'todo', label: 'To Do', color: 'bg-stone-100 text-stone-700' },
    { id: 'progress', label: 'In Progress', color: 'bg-blue-50 text-[#075CF2]' },
    { id: 'review', label: 'In Review', color: 'bg-amber-50 text-amber-700' },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-50 text-emerald-700' }
  ];

  return (
    <div className="w-full pb-20">
      <FilterBar />

      <div className="bg-white rounded-3xl border border-[#e7e8ea] shadow-xs overflow-hidden">
        {/* Table / List Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#fcf8f8] border-b border-[#e7e8ea] text-[11px] font-bold uppercase tracking-wider text-[#747878]">
          <div className="col-span-5">Task Details</div>
          <div className="col-span-2">Assignee</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#f1f3f5]">
          {filteredTasks.map((task) => {
            const completedSubtasks = (task.subtasks || []).filter((s) => s.completed).length;
            const totalSubtasks = (task.subtasks || []).length;

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTaskDetail(task)}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#fcf8f8] cursor-pointer transition-colors group"
              >
                {/* Task Details */}
                <div className="md:col-span-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f1f3f5] text-[#080909] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {task.category.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-xs text-[#080909] group-hover:text-[#075CF2] transition-colors">
                        {task.title}
                      </span>
                      <span className="text-[10px] font-mono text-[#747878]">
                        {task.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#747878]">
                      <span>{task.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                      </span>
                      {totalSubtasks > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <CheckSquare className="w-3 h-3" />
                            {completedSubtasks}/{totalSubtasks}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Assignee */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#080909] text-white flex items-center justify-center text-[10px] font-bold">
                    {task.assignee?.avatar || 'U'}
                  </div>
                  <span className="text-xs text-[#444747] font-medium truncate">
                    {task.assignee?.name || 'Unassigned'}
                  </span>
                </div>

                {/* Priority */}
                <div className="md:col-span-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
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

                {/* Status Dropdown */}
                <div className="md:col-span-2" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={task.status}
                    onChange={(e) => moveTaskStatus(task.id, e.target.value)}
                    className="w-full text-xs font-semibold py-1.5 px-3 rounded-full bg-[#f1f3f5] text-[#1c1b1b] border border-[#e7e8ea] focus:outline-none focus:border-[#080909] cursor-pointer"
                  >
                    {statuses.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => openCreateModal(task)}
                    title="Edit Task"
                    className="p-1.5 hover:bg-[#f1f3f5] rounded-full text-[#747878] hover:text-[#080909] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${task.title}"?`)) {
                        deleteTask(task.id);
                      }
                    }}
                    title="Delete Task"
                    className="p-1.5 hover:bg-rose-50 rounded-full text-[#747878] hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="py-16 text-center text-[#747878]">
              <p className="text-sm font-medium">No tasks found matching your filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
