import React, { createContext, ReactNode, useContext, useState } from 'react';
import type { Project } from '@/types';

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  updateProjectPreview: (id: string, url: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Demo Portfolio',
      type: 'Portfolio',
      features: ['Contact Form', 'Auth'],
      status: 'In Progress',
      previewUrl: '',
    },
  ]);

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const updateProjectPreview = (id: string, url: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, previewUrl: url } : p))
    );
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProjectStatus, updateProjectPreview }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
