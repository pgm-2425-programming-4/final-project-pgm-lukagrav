import React from 'react';
import '../css/styles.css';
import { useProjects } from '../hooks/useProjects';
import { Link } from '@tanstack/react-router'; // ✅ Import Link from TanStack Router

const Sidebar = ({ onProjectSelect, selectedProject }) => {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <div className="sidebar"><p>Loading projects...</p></div>;
  }

  if (isError) {
    return <div className="sidebar"><p>Failed to load projects.</p></div>;
  }

  return (
    <div className="sidebar">
      <h3>PROJECTS</h3>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`project ${selectedProject === project.id ? 'active' : ''}`}
          onClick={() => onProjectSelect(project.id)}
        >
          {project.name}
        </div>
      ))}

      <hr />

      <div className="sidebar-link">
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Sidebar;
