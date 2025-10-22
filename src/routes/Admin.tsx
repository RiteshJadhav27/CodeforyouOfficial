import React from 'react';
import Sidebar from '@/components/Sidebar';
import { useProjects } from '@/context/ProjectsContext';

export default function Admin() {
  const { projects, updateProjectStatus, updateProjectPreview } = useProjects();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white dark:bg-gray-900 overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
        <div className="grid gap-4">
          {projects.map(({ id, name, status, previewUrl }) => (
            <div key={id} className="p-4 rounded shadow bg-gray-50 dark:bg-gray-800 grid grid-cols-[2fr_1fr_3fr_1fr] gap-4 items-center">
              <h4 className="text-lg font-semibold">{name}</h4>
              <select
                value={status}
                onChange={(e) => updateProjectStatus(id, e.target.value as any)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option>Queued</option>
                <option>In Progress</option>
                <option>Delivered</option>
              </select>
              <input
                type="text"
                placeholder="Preview URL..."
                value={previewUrl}
                onChange={(e) => updateProjectPreview(id, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              />
              <button
                onClick={() => updateProjectStatus(id, 'Delivered')}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Mark Delivered
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
