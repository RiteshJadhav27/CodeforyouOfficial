import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types';

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  const handlePreviewClick = () => {
    if (project.previewUrl) {
      window.open(project.previewUrl, '_blank');
    } else {
      // Navigate to dummy preview page with project id param
      navigate(`/preview/${project.id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h4>
        <p className="text-gray-600 dark:text-gray-300">{project.type}</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Features: {project.features.join(', ') || 'None'}</p>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">Status: {project.status}</div>
      <div>
        <button
          onClick={handlePreviewClick}
          className="bg-brand text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Preview Project
        </button>
      </div>
    </div>
  );
}
