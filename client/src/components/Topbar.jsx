import React from 'react';
import '../css/styles.css';

const Topbar = () => (
  <div className="topbar">
    <select>
      <option>Back-end</option>
    </select>
    <input type="text" placeholder="Search by description" />
    <div className="project-title">Active project: PGM3</div>
    <button className="add-task">Add new task</button>
    <button className="view-backlog">View backlog</button>
  </div>
);

export default Topbar;
