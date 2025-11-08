'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface Task {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'complete';
  completed: boolean;
  dueDate?: string;
}

export default function AllTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Task 01', status: 'pending', completed: false, dueDate: '2025-11-10' },
    { id: '2', name: 'Task 02', status: 'in-progress', completed: false, dueDate: '2025-11-09' },
    { id: '3', name: 'Task 03', status: 'complete', completed: true, dueDate: '2025-11-08' },
    { id: '4', name: 'Task 04', status: 'pending', completed: false, dueDate: '2025-11-15' },
    { id: '5', name: 'Task 05', status: 'in-progress', completed: false, dueDate: '2025-11-11' },
  ]);

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'complete'>('all');

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-300 text-gray-700';
      case 'in-progress':
        return 'bg-blue-200 text-blue-700';
      case 'complete':
        return 'bg-green-200 text-green-700';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'complete':
        return 'Complete';
      default:
        return 'Pending';
    }
  };

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 md:relative">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">All Tasks</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{tasks.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{tasks.filter(t => t.status === 'in-progress').length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-gray-600 mt-2">{tasks.filter(t => t.status === 'pending').length}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-medium">Overall Progress</span>
              <span className="text-gray-600 text-sm font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterStatus === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterStatus === 'pending'
                  ? 'bg-gray-300 text-gray-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterStatus === 'in-progress'
                  ? 'bg-blue-200 text-blue-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('complete')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterStatus === 'complete'
                  ? 'bg-green-200 text-green-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-200'
              }`}
            >
              Complete
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="w-6 h-6 accent-purple-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {task.name}
                      </p>
                      {task.dueDate && (
                        <p className="text-sm text-gray-500 mt-1">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(task.status)}`}>
                      {getStatusLabel(task.status)}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                      title="Delete task"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h16zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-500 text-lg">No tasks found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
