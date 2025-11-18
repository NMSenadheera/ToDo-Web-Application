'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface Task {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'complete';
  completed: boolean;
  date: number;
  month: string;
}

export default function TodayTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Task 01', status: 'pending', completed: false, date: 5, month: 'November' },
    { id: '2', name: 'Task 02', status: 'in-progress', completed: false, date: 6, month: 'November' },
    { id: '3', name: 'Task 03', status: 'complete', completed: true, date: 6, month: 'November' },
    { id: '4', name: 'Task 04', status: 'pending', completed: false, date: 7, month: 'November' },
    { id: '5', name: 'Task 05', status: 'in-progress', completed: false, date: 8, month: 'November' }
  ]);

  const [selectedDate, setSelectedDate] = useState<{ day: number; month: string; year: number }>({
    day: 6,
    month: 'November',
    year: 2025
  });
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1); // Start at week 1 (Nov 2-8)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // All weeks across October, November, and December 2025
  const allWeeks = [
    // October 2025
    { start: 26, end: 31, month: 'October', year: 2025, dayStart: 'Sun' }, // Week 0: Oct 26-31 (Sun-Fri)
    // November 2025
    { start: 2, end: 8, month: 'November', year: 2025, dayStart: 'Sun' },   // Week 1: Nov 2-8 (Sun-Sat)
    { start: 9, end: 15, month: 'November', year: 2025, dayStart: 'Sun' },  // Week 2: Nov 9-15 (Sun-Sat)
    { start: 16, end: 22, month: 'November', year: 2025, dayStart: 'Sun' }, // Week 3: Nov 16-22 (Sun-Sat)
    { start: 23, end: 29, month: 'November', year: 2025, dayStart: 'Sun' }, // Week 4: Nov 23-29 (Sun-Sat)
    // December 2025 (starts with Nov 30-Dec 6)
    { start: 30, end: 6, month: 'Nov-Dec', year: 2025, dayStart: 'Sat' },   // Week 5: Nov 30 - Dec 6 (Sat-Fri)
    { start: 7, end: 13, month: 'December', year: 2025, dayStart: 'Sun' },  // Week 6: Dec 7-13 (Sun-Sat)
    { start: 14, end: 20, month: 'December', year: 2025, dayStart: 'Sun' }, // Week 7: Dec 14-20 (Sun-Sat)
    { start: 21, end: 27, month: 'December', year: 2025, dayStart: 'Sun' }, // Week 8: Dec 21-27 (Sun-Sat)
    { start: 28, end: 31, month: 'December', year: 2025, dayStart: 'Sun' }  // Week 9: Dec 28-31 (Sun-Wed)
  ];

  const currentWeekData = allWeeks[currentWeekIndex];
  const weekStartDate = currentWeekData.start;
  const weekEndDate = currentWeekData.end;
  const monthName = currentWeekData.month;
  const year = currentWeekData.year;
  
  // Generate week dates with proper handling for cross-month weeks
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const isNovDecWeek = currentWeekIndex === 5; // Nov 30 - Dec 6 week
    
    if (isNovDecWeek) {
      // Nov 30 to Dec 6
      if (i === 0) return 30; // Nov 30 (Sat)
      return i; // Dec 1-6
    }
    
    const date = weekStartDate + i;
    return date <= weekEndDate ? date : null;
  }).filter(date => date !== null);

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      const previousWeek = allWeeks[currentWeekIndex - 1];
      setCurrentWeekIndex(currentWeekIndex - 1);
      
      // Handle month extraction for Nov-Dec week
      let month = previousWeek.month;
      if (previousWeek.month === 'Nov-Dec') {
        month = 'November'; // Start from November when going backwards
      }
      
      setSelectedDate({
        day: previousWeek.start,
        month: month,
        year: previousWeek.year
      });
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < allWeeks.length - 1) {
      const nextWeek = allWeeks[currentWeekIndex + 1];
      setCurrentWeekIndex(currentWeekIndex + 1);
      
      // Handle month extraction for Nov-Dec week
      let month = nextWeek.month;
      if (nextWeek.month === 'Nov-Dec') {
        month = 'November'; // Start from November when going forward
      }
      
      setSelectedDate({
        day: nextWeek.start,
        month: month,
        year: nextWeek.year
      });
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const isNowCompleted = !task.completed;
        return {
          ...task,
          completed: isNowCompleted,
          status: isNowCompleted ? 'complete' : 'pending'
        };
      }
      return task;
    }));
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
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">ToDo.</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* This Week Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week</h2>
            
            {/* Week Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={handlePreviousWeek}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &lt;
                </button>
                <span className="text-purple-600 font-semibold">{monthName} {weekStartDate} - {weekEndDate} {year}</span>
                <button 
                  onClick={handleNextWeek}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &gt;
                </button>
              </div>

              {/* Day Columns */}
              <div className="grid grid-cols-7 gap-3">
                {daysOfWeek.map((day, idx) => {
                  const date = weekDates[idx];
                  const isSelected = date === selectedDate.day && (
                    (currentWeekIndex === 5 && (
                      (date === 30 && selectedDate.month === 'November') ||
                      (date < 7 && selectedDate.month === 'December')
                    )) ||
                    (currentWeekIndex !== 5 && monthName === selectedDate.month && date === selectedDate.day)
                  );
                  return (
                    <div key={idx} className="text-center">
                      <p className="text-gray-500 text-sm font-medium mb-2">{day}</p>
                      {date ? (
                        <button
                          onClick={() => {
                            if (currentWeekIndex === 5) {
                              // Nov-Dec week special handling
                              setSelectedDate({
                                day: date,
                                month: date === 30 ? 'November' : 'December',
                                year: year
                              });
                            } else {
                              setSelectedDate({
                                day: date,
                                month: monthName,
                                year: year
                              });
                            }
                          }}
                          className={`w-full py-8 rounded-xl font-semibold transition ${
                            isSelected
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {date}
                        </button>
                      ) : (
                        <div className="w-full py-8 rounded-xl bg-gray-100"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Today Tasks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today : {selectedDate.day} {selectedDate.month} {selectedDate.year}</h2>
            
            <div className="space-y-3">
              {tasks.filter(task => task.date === selectedDate.day && task.month === selectedDate.month).map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="w-6 h-6 accent-purple-600 cursor-pointer"
                    />
                    <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.name}
                    </span>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              ))}
              {tasks.filter(task => task.date === selectedDate.day && task.month === selectedDate.month).length === 0 && (
                <p className="text-center text-gray-500 py-8">No tasks for this date</p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Progress</span>
                <span className="text-gray-600 text-sm font-semibold">
                  {tasks.filter(t => t.date === selectedDate.day && t.month === selectedDate.month).length === 0 
                    ? '0' 
                    : Math.round((tasks.filter(t => t.date === selectedDate.day && t.month === selectedDate.month && t.completed).length / tasks.filter(t => t.date === selectedDate.day && t.month === selectedDate.month).length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: tasks.filter(t => t.date === selectedDate.day && t.month === selectedDate.month).length === 0 
                      ? '0%' 
                      : `${(tasks.filter(t => t.date === selectedDate.day && t.month === selectedDate.month && t.completed).length / tasks.filter(t => t.date === selectedDate.day && t.month === selectedDate.month).length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
