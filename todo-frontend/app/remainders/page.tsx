'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  type: 'email' | 'notification' | 'sms';
  isRead: boolean;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Complete Project Report',
      description: 'Finish the quarterly project report',
      time: '10:00 AM',
      date: '2025-11-10',
      type: 'notification',
      isRead: false,
    },
    {
      id: '2',
      title: 'Team Meeting',
      description: 'Sprint planning meeting with the team',
      time: '2:00 PM',
      date: '2025-11-10',
      type: 'email',
      isRead: false,
    },
    {
      id: '3',
      title: 'Review Code Changes',
      description: 'Review pull requests from teammates',
      time: '3:30 PM',
      date: '2025-11-10',
      type: 'notification',
      isRead: true,
    },
    {
      id: '4',
      title: 'Database Backup',
      description: 'Schedule maintenance for database backup',
      time: '11:00 PM',
      date: '2025-11-10',
      type: 'sms',
      isRead: false,
    },
    {
      id: '5',
      title: 'Client Call',
      description: 'Discuss new requirements with client',
      time: '9:00 AM',
      date: '2025-11-11',
      type: 'email',
      isRead: true,
    },
  ]);

  const [filterType, setFilterType] = useState<'all' | 'email' | 'notification' | 'sms'>('all');

  const markAsRead = (reminderId: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === reminderId ? { ...reminder, isRead: true } : reminder
    ));
  };

  const markAsUnread = (reminderId: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === reminderId ? { ...reminder, isRead: false } : reminder
    ));
  };

  const deleteReminder = (reminderId: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8l9 6 9-6M3 8v12a2 2 0 002 2h14a2 2 0 002-2V8m0 0H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'notification':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'sms':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4v-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-700';
      case 'notification':
        return 'bg-purple-100 text-purple-700';
      case 'sms':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const filteredReminders = filterType === 'all'
    ? reminders
    : reminders.filter(reminder => reminder.type === filterType);

  const unreadCount = reminders.filter(r => !r.isRead).length;
  const totalReminders = reminders.length;

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
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Reminders</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {unreadCount} New
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Total Reminders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalReminders}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Unread</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{unreadCount}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 text-sm font-medium">Read</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalReminders - unreadCount}</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filterType === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('email')}
              className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-2 ${
                filterType === 'email'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8l9 6 9-6M3 8v12a2 2 0 002 2h14a2 2 0 002-2V8m0 0H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email
            </button>
            <button
              onClick={() => setFilterType('notification')}
              className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-2 ${
                filterType === 'notification'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-200'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Notification
            </button>
            <button
              onClick={() => setFilterType('sms')}
              className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-2 ${
                filterType === 'sms'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-200'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4v-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              SMS
            </button>
          </div>

          {/* Reminders List */}
          <div className="space-y-3">
            {filteredReminders.length > 0 ? (
              filteredReminders.map(reminder => (
                <div
                  key={reminder.id}
                  className={`bg-white rounded-lg p-5 flex items-start justify-between shadow-sm hover:shadow-md transition ${
                    !reminder.isRead ? 'border-l-4 border-l-purple-600' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg mt-1 ${getTypeColor(reminder.type)}`}>
                      {getTypeIcon(reminder.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{reminder.title}</h3>
                        {!reminder.isRead && (
                          <span className="inline-block w-3 h-3 bg-purple-600 rounded-full flex-shrink-0 mt-1"></span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{reminder.description}</p>
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(reminder.type)}`}>
                          {getTypeLabel(reminder.type)}
                        </span>
                        <span className="text-gray-500 text-sm">
                          📅 {new Date(reminder.date).toLocaleDateString()}
                        </span>
                        <span className="text-gray-500 text-sm">
                          🕐 {reminder.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!reminder.isRead && (
                      <button
                        onClick={() => markAsRead(reminder.id)}
                        className="text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded transition"
                        title="Mark as read"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                    {reminder.isRead && (
                      <button
                        onClick={() => markAsUnread(reminder.id)}
                        className="text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded transition"
                        title="Mark as unread"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-400 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                      title="Delete reminder"
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
                <p className="text-gray-500 text-lg">No reminders found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
