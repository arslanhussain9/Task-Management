import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CATEGORIES } from '../data/initialData';
import { Filter, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FilterBar() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priorityFilter, 
    setPriorityFilter, 
    tasks, 
    filteredTasks,
    searchQuery,
    setSearchQuery
  } = useTasks();

  const priorities = ['All', 'High', 'Medium', 'Low'];

  const hasActiveFilters = selectedCategory !== 'All' || priorityFilter !== 'All' || searchQuery !== '';

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriorityFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="w-full mb-8 space-y-4">
      {/* Category Pills & Priority Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Categories Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#080909] text-white shadow-sm'
                    : 'bg-[#f1f3f5] text-[#444747] hover:bg-[#e5e2e1]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Priority Filter and Count */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-[#f1f3f5] p-1 rounded-full border border-[#e7e8ea]">
            {priorities.map((p) => {
              const isSelected = priorityFilter === p;
              return (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-[#080909] shadow-xs'
                      : 'text-[#747878] hover:text-[#1c1b1b]'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
            >
              <X className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

      </div>

      {/* Results status badge */}
      <div className="flex items-center justify-between text-xs text-[#747878] px-1">
        <span>
          Showing <strong className="text-[#1c1b1b] font-semibold">{filteredTasks.length}</strong> of{' '}
          {tasks.length} tasks
        </span>
        {searchQuery && (
          <span>
            Search query: <span className="italic text-[#1c1b1b]">"{searchQuery}"</span>
          </span>
        )}
      </div>
    </div>
  );
}
