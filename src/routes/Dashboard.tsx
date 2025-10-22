'use client';
import React, { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Temporarily simulate login state

  const handleSearchToggle = () => setSearchOpen((open) => !open);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5-7 10-7 10s-7-5-7-10V6l7-4z" />
          </svg>
          <span>CodeForYou</span>
        </Link>

        {/* Search */}
        <div className="relative">
          <button
            onClick={handleSearchToggle}
            aria-label="Toggle search"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaSearch size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          {searchOpen && (
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search projects..."
              className="absolute right-0 mt-2 w-60 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          )}
        </div>

        {/* Nav Links & Auth/Profile */}
        <nav className="flex items-center gap-6 text-gray-700 dark:text-gray-300">
          <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Projects
          </Link>

          {loggedIn ? (
            <>
              {/* Profile Icon */}
              <button
                aria-label="User Profile"
                title="Profile"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                onClick={() => alert('Profile dropdown or page')}
              >
                <FaUserCircle size={24} />
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Sign Up
              </Link>
            </>
          )}

          <Link
            to="/hire"
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Hire Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
