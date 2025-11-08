'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  reminder: boolean;
}

export default function CreateTaskPage() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: TaskData = { title: taskTitle, description, dueDate, reminder };
    console.log(task);
    alert('Task Created Successfully!');
    setTaskTitle('');
    setDescription('');
    setDueDate('');
    setReminder(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <button className="text-gray-600 hover:text-gray-900 text-2xl">☰</button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">ToDo.</span>
            </div>
          </div>
        </header>
        {/* Create Task Form */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Task</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your task"
              rows={3}
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-800">Set Reminder</h4>
              <p className="text-sm text-gray-500">Get notified about this task</p>
            </div>
            <button
              type="button"
              onClick={() => setReminder(!reminder)}
              className={`w-12 h-6 rounded-full p-1 transition-all ${
                reminder ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full transform transition ${
                  reminder ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Task
          </button>
        </form>
        </div>
      </main>
    </div>
  );
}


