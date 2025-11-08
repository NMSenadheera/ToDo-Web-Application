'use client';

import React, { useState } from 'react';

// ---  Reminder Data Types ---
interface Reminder {
  id: string;
  name: string;
}

interface ReminderGroup {
  id: string;
  title: string;
  tasks: Reminder[];
}

// ---  Mock Data ---
const initialReminderGroups: ReminderGroup[] = [
  {
    id: 'group1',
    title: 'Today',
    tasks: [{ id: 'r1', name: 'Task 01' }],
  },
  {
    id: 'group2',
    title: 'Tomorrow', // Corrected spelling
    tasks: [{ id: 'r2', name: 'Task 02' }],
  },
  {
    id: 'group3',
    title: 'Upcoming',
    tasks: [
      { id: 'r3', name: 'Task 03' },
      { id: 'r4', name: 'Task 04' },
    ],
  },
];

// ---  The Main Page Component ---
export default function RemindersPage() {
  // ---  State Management ---
  const [reminderGroups, setReminderGroups] = useState(initialReminderGroups);

  // ---  Event Handler  ---
  const handleDeleteTask = (taskId: string, groupId: string) => {
    console.log(`Delete task ${taskId} from group ${groupId}`);
  };

  // ---  Calculate Total Reminders ---
  const totalReminders = reminderGroups.reduce(
    (total, group) => total + group.tasks.length,
    0
  );

  return (
    <div className="font-sans bg-gray-200 min-h-screen text-gray-900">
      {/* --- Header  --- */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button className="text-gray-00 text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              strokeWidth={2.0}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {/* Logo Icon SVG */}
           <div className="flex items-center gap-3 mb-12">
  <div className="w-15 h-11 bg-white rounded-lg flex items-center justify-center mt-2">
    <svg
      className="mt-9" 
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="20" height="20" rx="2" stroke="black" strokeWidth="2" />
      <path d="M9 12l3 3 5-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
</div>

            <span className="text-5xl font-bold">ToDo</span>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* --- Top Title Section --- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Bell Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <div>
              <h1 className="text-3xl font-bold">Reminders</h1>
              <p className="text-gray-700">Manage your tasks and reminders</p>
            </div>
          </div>
          <div className="bg-purple-300 text-black font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-3">
            <span className="bg-purple-300 text-black text-s font-bold rounded-md px-2 py-1">
              {totalReminders}
            </span>
            Total Reminders
          </div>
        </div>

        {/* --- Reminder Groups --- */}
        <div className="space-y-8">
         
          {reminderGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                {/* Calendar Icon SVG */}
                <svg
                  className="w-7 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <h2 className="font-bold text-lg">
                  {group.title} ({group.tasks.length})
                </h2>
              </div>

              {/* Task list for this group */}
              <div className="space-y-3">
                
                {group.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-400 p-4 rounded-lg flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-200">
                      {task.name}
                    </span>
                    <div className="flex items-center gap-3">
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteTask(task.id, group.id)}
                        className="text-gray-100 "
                      >
                        {/* Trash Icon SVG */}
                        <svg width="20" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.25 8.33333H41.6667V12.5H37.5V39.5833C37.5 40.734 36.5673 41.6667 35.4167 41.6667H6.25C5.09942 41.6667 4.16667 40.734 4.16667 39.5833V12.5H0V8.33333H10.4167V2.08333C10.4167 0.93275 11.3494 0 12.5 0H29.1667C30.3173 0 31.25 0.93275 31.25 2.08333V8.33333ZM33.3333 12.5H8.33333V37.5H33.3333V12.5ZM14.5833 18.75H18.75V31.25H14.5833V18.75ZM22.9167 18.75H27.0833V31.25H22.9167V18.75ZM14.5833 4.16667V8.33333H27.0833V4.16667H14.5833Z" fill="black"/>
</svg>
                      </button>
                      {/* Toggle/Eye Icon SVG */}
                      <button className="text-gray-100 hover:text-blue-600">
                        <svg width="30" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5833 4.16667C8.83038 4.16667 4.16667 8.83038 4.16667 14.5833C4.16667 20.3363 8.83038 25 14.5833 25H31.25C37.0029 25 41.6667 20.3363 41.6667 14.5833C41.6667 8.83038 37.0029 4.16667 31.25 4.16667H14.5833ZM14.5833 0H31.25C39.3042 0 45.8333 6.52919 45.8333 14.5833C45.8333 22.6375 39.3042 29.1667 31.25 29.1667H14.5833C6.52919 29.1667 0 22.6375 0 14.5833C0 6.52919 6.52919 0 14.5833 0ZM14.5833 20.8333C11.1316 20.8333 8.33333 18.0352 8.33333 14.5833C8.33333 11.1315 11.1316 8.33333 14.5833 8.33333C18.0351 8.33333 20.8333 11.1315 20.8333 14.5833C20.8333 18.0352 18.0351 20.8333 14.5833 20.8333Z" fill="black"/>
</svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


