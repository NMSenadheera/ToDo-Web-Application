'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.push('/login');
  };

  const navItems = [
    { label: 'All Tasks', path: '/AllTasks', icon: '≡' },
    { label: 'Today', path: '/today', icon: '📅' },
    { label: 'Reminders', path: '/remainders', icon: '🔔' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-purple-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-purple-500 to-purple-600 text-white p-6 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        {/* Logo */}
        <Link
          href="/today"
          className="flex items-center gap-3 mb-12 hover:opacity-80 transition"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#a855f7" strokeWidth="2" />
              <path
                d="M9 12l3 3 5-6"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold">ToDo.</span>
        </Link>

        {/* Add New Button */}
        <Link
          href="/createtask"
          className="w-full bg-white text-purple-600 font-semibold py-2.5 rounded-full mb-8 hover:bg-gray-100 transition flex items-center justify-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-lg">+</span>
          Add New
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                isActive(item.path) ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-lg hover:bg-black/30 transition w-full"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5m0 0l-5-5m5 5H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
