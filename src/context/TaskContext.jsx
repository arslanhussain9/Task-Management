import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TASKS, INITIAL_USER, INITIAL_ACTIVITIES, TEAM_MEMBERS } from '../data/initialData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // LocalStorage persistence for tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('boro_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('boro_user');
      return savedUser ? JSON.parse(savedUser) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Views & Filters
  const [activeTab, setActiveTab] = useState('board'); // 'dashboard', 'board', 'list', 'activity', 'team'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTaskDetail, setSelectedTaskDetail] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Activity Feed & Realtime Simulation
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('boro_activities');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });
  const [toasts, setToasts] = useState([]);
  const [realtimeActive, setRealtimeActive] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('boro_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('boro_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('boro_activities', JSON.stringify(activities));
    } catch (e) {
      console.error(e);
    }
  }, [activities]);

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add activity item
  const addActivity = (action, taskTitle, type = 'info', actorName = user?.name || 'You') => {
    const newAct = {
      id: 'act_' + Date.now(),
      user: actorName,
      action,
      taskTitle,
      time: 'Just now',
      type
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 40)]);
  };

  // Task CRUD operations
  const createTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      comments: taskData.comments || [],
      subtasks: taskData.subtasks || []
    };
    setTasks((prev) => [newTask, ...prev]);
    addActivity('created new task', newTask.title, 'success');
    showToast(`Task "${newTask.title}" created successfully!`, 'success');
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, ...updates };
          if (selectedTaskDetail?.id === taskId) {
            setSelectedTaskDetail(updated);
          }
          return updated;
        }
        return t;
      })
    );
    const existing = tasks.find((t) => t.id === taskId);
    addActivity('updated details for', existing?.title || 'task', 'info');
    showToast('Task details updated', 'info');
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (selectedTaskDetail?.id === taskId) {
      setSelectedTaskDetail(null);
    }
    addActivity('deleted task', taskToDelete.title, 'warning');
    showToast(`Deleted "${taskToDelete.title}"`, 'warning');
  };

  const moveTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, status: newStatus };
          if (selectedTaskDetail?.id === taskId) {
            setSelectedTaskDetail(updated);
          }
          return updated;
        }
        return t;
      })
    );
    const target = tasks.find((t) => t.id === taskId);
    const readableStatus =
      newStatus === 'todo'
        ? 'To Do'
        : newStatus === 'progress'
        ? 'In Progress'
        : newStatus === 'review'
        ? 'In Review'
        : 'Completed';
    addActivity(`moved to ${readableStatus}`, target?.title || 'task', 'info');
    showToast(`Moved to ${readableStatus}`, 'info');
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = (t.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const updated = { ...t, subtasks: updatedSubtasks };
          if (selectedTaskDetail?.id === taskId) {
            setSelectedTaskDetail(updated);
          }
          return updated;
        }
        return t;
      })
    );
  };

  const addComment = (taskId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'c_' + Date.now(),
      author: user?.name || 'Current User',
      text: text.trim(),
      timestamp: 'Just now'
    };
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = {
            ...t,
            comments: [...(t.comments || []), newComment]
          };
          if (selectedTaskDetail?.id === taskId) {
            setSelectedTaskDetail(updated);
          }
          return updated;
        }
        return t;
      })
    );
    const target = tasks.find((t) => t.id === taskId);
    addActivity('commented on', target?.title || 'task', 'info');
  };

  // Auth operations
  const login = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
    showToast(`Signed in as ${userData.name}`, 'success');
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: 'guest@boro.design',
      role: 'Viewer',
      avatar: 'GU',
      isLoggedIn: false
    });
    showToast('Signed out', 'neutral');
  };

  const resetToDefaultData = () => {
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    setSelectedTaskDetail(null);
    showToast('Reset application to demo data', 'info');
  };

  // Open modal helpers
  const openCreateModal = (task = null) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(false);
  };

  // Real-time collaborator simulation loop
  useEffect(() => {
    if (!realtimeActive) return;

    const sampleSimulations = [
      {
        member: TEAM_MEMBERS[1], // Sumit Kumar
        action: 'pushed commit & updated',
        type: 'info'
      },
      {
        member: TEAM_MEMBERS[2], // Sarah Chen
        action: 'reviewed UI tokens for',
        type: 'success'
      },
      {
        member: TEAM_MEMBERS[3], // Alex Rivera
        action: 'verified endpoint latency for',
        type: 'info'
      }
    ];

    const interval = setInterval(() => {
      if (tasks.length === 0) return;
      const sim = sampleSimulations[Math.floor(Math.random() * sampleSimulations.length)];
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
      if (randomTask) {
        addActivity(sim.action, randomTask.title, sim.type, sim.member.name);
        showToast(`⚡ ${sim.member.name} ${sim.action} "${randomTask.title.slice(0, 24)}..."`, 'info');
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [realtimeActive, tasks]);

  // Filtered tasks computation
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      selectedCategory === 'All' || task.category === selectedCategory;
    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPriority && matchesSearch;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        user,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        priorityFilter,
        setPriorityFilter,
        searchQuery,
        setSearchQuery,
        isTaskModalOpen,
        openCreateModal,
        closeTaskModal,
        editingTask,
        selectedTaskDetail,
        setSelectedTaskDetail,
        isAuthModalOpen,
        setIsAuthModalOpen,
        activities,
        toasts,
        showToast,
        removeToast,
        createTask,
        updateTask,
        deleteTask,
        moveTaskStatus,
        toggleSubtask,
        addComment,
        login,
        logout,
        resetToDefaultData,
        realtimeActive,
        setRealtimeActive
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
