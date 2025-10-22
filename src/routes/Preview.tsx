import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Preview() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Project Preview (ID: {id})</h1>
      <div className="border border-gray-300 dark:border-gray-600 rounded p-6 bg-white dark:bg-gray-800 max-w-4xl mx-auto">
        <p>This is a dummy preview page for the generated project.</p>
        <p>Here you can add a static/dummy layout showcasing how the final product might look.</p>
      </div>
      <Link
        to="/dashboard"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
