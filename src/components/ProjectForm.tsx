import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import type { Project } from '@/types';

const projectTypes = ['Portfolio', 'Blog', 'E-commerce', 'Startup'];
const featureOptions = ['Contact Form', 'Auth', 'Admin Panel'];

export default function ProjectForm() {
  const { addProject } = useProjects();

  const [name, setName] = useState('');
  const [type, setType] = useState(projectTypes[0]);
  const [features, setFeatures] = useState<string[]>([]);

  const handleFeatureToggle = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('Project name is required');
    addProject({
      id: Date.now().toString(),
      name: name.trim(),
      type,
      features,
      status: 'Queued',
      previewUrl: '',
    });
    setName('');
    setType(projectTypes[0]);
    setFeatures([]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-gray-100 dark:bg-gray-700 p-6 rounded shadow">
      <label className="block mb-3">
        Project Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          placeholder="Enter your project name"
          required
        />
      </label>

      <label className="block mb-3">
        Project Type
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full mt-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
        >
          {projectTypes.map((pt) => (
            <option key={pt} value={pt}>
              {pt}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="mb-3">
        <legend className="font-semibold mb-1">Features</legend>
        {featureOptions.map((feature) => (
          <label key={feature} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={features.includes(feature)}
              onChange={() => handleFeatureToggle(feature)}
              className="form-checkbox"
            />
            <span className="ml-2">{feature}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        className="bg-brand text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Project
      </button>
    </form>
  );
}
