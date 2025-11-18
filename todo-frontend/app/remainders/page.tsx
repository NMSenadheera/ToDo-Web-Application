'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface Task {
  id: string;
  title: string;
  date: string;
  isVisible: boolean;
}

export default function RemindersPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Task 01',
      date: '2025-11-12', // Today
      isVisible: true,
    },
    {
      id: '2',
      title: 'Task 02',
      date: '2025-11-13', // Tomorrow
      isVisible: true,
    },
    {
      id: '3',
      title: 'Task 03',
      date: '2025-11-15', // Upcoming
      isVisible: true,
    },
    {
      id: '4',
      title: 'Task 04',
      date: '2025-11-16', // Upcoming
      isVisible: true,
    },
  ]);

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleVisibility = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isVisible: !task.isVisible } : task
    ));
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const groupTasksByCategory = () => {
    const todayStr = formatDate(today.toISOString());
    const tomorrowStr = formatDate(tomorrow.toISOString());

    const todayTasks = tasks.filter(t => formatDate(t.date) === todayStr);
    const tomorrowTasks = tasks.filter(t => formatDate(t.date) === tomorrowStr);
    const upcomingTasks = tasks.filter(t => {
      const taskDate = formatDate(t.date);
      return taskDate !== todayStr && taskDate !== tomorrowStr;
    });

    return { todayTasks, tomorrowTasks, upcomingTasks };
  };

  const { todayTasks, tomorrowTasks, upcomingTasks } = groupTasksByCategory();
  const totalReminders = tasks.length;

  const TaskGroup = ({ category, categoryTasks }: { category: string; categoryTasks: Task[] }) => {
    if (categoryTasks.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
            <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">
            {category} ({categoryTasks.length})
          </h3>
        </div>
        <div className="space-y-3">
          {categoryTasks.map(task => (
            <div
              key={task.id}
              className="bg-gray-400 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition hover:bg-gray-500"
            >
              <span className="text-white font-medium text-lg">{task.title}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-white hover:opacity-80 transition p-2"
                  title="Delete task"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h16zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <button className="text-gray-600 hover:text-gray-900 text-2xl">☰</button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Remainders</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-6xl">
          <TaskGroup category="Today" categoryTasks={todayTasks} />
          <TaskGroup category="Tomorrow" categoryTasks={tomorrowTasks} />
          <TaskGroup category="Upcoming" categoryTasks={upcomingTasks} />

          {tasks.length === 0 && (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <p className="text-gray-500 text-lg">No reminders yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
