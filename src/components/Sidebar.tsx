import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Admin Panel', to: '/admin' },
];

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-50 dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 flex flex-col gap-6">
      <h2 className="text-lg font-bold text-brand">CodeForYou</h2>
      {links.map(({ name, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand ${
              isActive ? 'font-bold text-brand' : ''
            }`
          }
        >
          {name}
        </NavLink>
      ))}
    </nav>
  );
}
