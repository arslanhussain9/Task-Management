import React from 'react';
import { useTasks } from '../context/TaskContext';
import { 
  Calendar, 
  CheckSquare, 
  MoreVertical, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Edit3,
  MessageSquare
} from 'lucide-react';

export default function TaskCard({ task }) {
  const { 
    setSelectedTaskDetail, 
    openCreateModal, 
    deleteTask, 
    moveTaskStatus 
  } = useTasks();

  const statuses = ['todo', 'progress', 'review', 'completed'];
  const currentIndex = statuses.indexOf(task.status);

  // Completed subtasks count
  const completedSubtasks = (task.subtasks || []).filter((st) => st.completed).length;
  const totalSubtasks = (task.subtasks || []).length;
  const subtaskProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  // Priority color config
  const priorityConfig = {
    High: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500'
    },
    Medium: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500'
    },
    Low: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500'
    }
  }[task.priority] || {
    bg: 'bg-stone-50 text-stone-700 border-stone-200',
    dot: 'bg-stone-500'
  };

  const handleNextStatus = (e) => {
    e.stopPropagation();
    if (currentIndex < statuses.length - 1) {
      moveTaskStatus(task.id, statuses[currentIndex + 1]);
    }
  };

  const handlePrevStatus = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      moveTaskStatus(task.id, statuses[currentIndex - 1]);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openCreateModal(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      onClick={() => setSelectedTaskDetail(task)}
      className="bg-white rounded-2xl p-5 border border-[#e7e8ea] hover:border-[#1b1c1c] transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between group relative"
    >
      <div>
        {/* Header Tags: Priority + Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${priorityConfig.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dot}`} />
              {task.priority}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f1f3f5] text-[11px] font-semibold text-[#444747]">
              {task.category}
            </span>
          </div>

          <span className="text-[10px] font-mono text-[#747878] font-medium tracking-tight">
            {task.id}
          </span>
        </div>

        {/* Task Title */}
        <h3 className="font-semibold text-sm text-[#080909] group-hover:text-[#075CF2] transition-colors leading-snug mb-1.5">
          {task.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-[#747878] line-clamp-2 leading-relaxed mb-4">
          {task.description}
        </p>

        {/* Subtask checklist progress bar */}
        {totalSubtasks > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] text-[#747878] mb-1 font-medium">
              <span className="flex items-center gap-1">
                <CheckSquare className="w-3 h-3 text-[#747878]" />
                Checklist
              </span>
              <span>
                {completedSubtasks}/{totalSubtasks}
              </span>
            </div>
            <div className="w-full bg-[#f1f3f5] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#080909] h-full rounded-full transition-all duration-300"
                style={{ width: `${subtaskProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Info: Due Date, Assignee, and Status Shifter */}
      <div className="pt-3 border-t border-[#f1f3f5] flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          {/* Due date */}
          <div className="flex items-center gap-1 text-[11px] text-[#747878]">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate || 'No due date'}</span>
          </div>

          {/* Comments count */}
          {(task.comments || []).length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-[#747878]">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
        </div>

        {/* Assignee & Controls */}
        <div className="flex items-center gap-2">
          {/* Status navigation quick buttons */}
          <div className="hidden group-hover:flex items-center gap-1 bg-[#f1f3f5] p-0.5 rounded-full border border-[#e7e8ea]">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevStatus}
                title="Move to previous status"
                className="p-1 hover:bg-white rounded-full text-[#444747] transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            )}
            {currentIndex < statuses.length - 1 && (
              <button
                onClick={handleNextStatus}
                title="Move to next status"
                className="p-1 hover:bg-white rounded-full text-[#444747] transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handleEdit}
              title="Edit Task"
              className="p-1 hover:bg-white rounded-full text-[#444747] transition-colors"
            >
              <Edit3 className="w-3 h-3" />
            </button>
            <button
              onClick={handleDelete}
              title="Delete Task"
              className="p-1 hover:bg-rose-100 rounded-full text-rose-600 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>

          {/* Assignee Avatar */}
          <div
            title={`Assigned to: ${task.assignee?.name || 'Unassigned'}`}
            className="w-6 h-6 rounded-full bg-[#080909] text-white flex items-center justify-center text-[10px] font-bold shrink-0"
          >
            {task.assignee?.avatar || 'U'}
          </div>
        </div>
      </div>
    </div>
  );
}
