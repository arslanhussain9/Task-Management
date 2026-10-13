import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import FilterBar from './FilterBar';
import { Plus, CheckCircle, Clock, Eye, ListChecks } from 'lucide-react';

export default function BoardView() {
  const { filteredTasks, openCreateModal, moveTaskStatus } = useTasks();

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-stone-400',
      badgeBg: 'bg-stone-100 text-stone-700',
      icon: Clock
    },
    {
      id: 'progress',
      title: 'In Progress',
      color: 'bg-[#075CF2]',
      badgeBg: 'bg-blue-50 text-[#075CF2]',
      icon: ListChecks
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700',
      icon: Eye
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700',
      icon: CheckCircle
    }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, statusId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      moveTaskStatus(taskId, statusId);
    }
  };

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <FilterBar />

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start pb-20">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter((t) => t.status === column.id);
          const Icon = column.icon;

          return (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="bg-[#f7f3f2] rounded-3xl p-4 border border-[#e7e8ea] flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e7e8ea]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${column.color}`} />
                  <h2 className="font-semibold text-xs uppercase tracking-wider text-[#1c1b1b]">
                    {column.title}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${column.badgeBg}`}
                  >
                    {columnTasks.length}
                  </span>
                </div>

                <button
                  onClick={() => openCreateModal({ status: column.id })}
                  title={`Add task to ${column.title}`}
                  className="w-6 h-6 rounded-full bg-white hover:bg-[#080909] hover:text-white text-[#444747] flex items-center justify-center transition-all shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks List inside Column */}
              <div className="space-y-3 flex-1">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', task.id);
                    }}
                  >
                    <TaskCard task={task} />
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="h-36 rounded-2xl border-2 border-dashed border-[#c4c7c7] flex flex-col items-center justify-center text-center p-4">
                    <p className="text-xs font-medium text-[#747878]">No tasks here</p>
                    <button
                      onClick={() => openCreateModal({ status: column.id })}
                      className="mt-2 text-xs font-semibold text-[#075CF2] hover:underline"
                    >
                      + Create one
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
