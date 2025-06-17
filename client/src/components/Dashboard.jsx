import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Board from './Board';
import '../index.css';

const Dashboard = () => {
  const [projectId, setProjectId] = useState(null);

  return (
    <div className="app">
      <Sidebar
        onProjectSelect={setProjectId}
        selectedProject={projectId}
      />
      <div className="main">
        <Topbar />
        <Board projectId={projectId} />
      </div>
    </div>
  );
};

export default Dashboard;
