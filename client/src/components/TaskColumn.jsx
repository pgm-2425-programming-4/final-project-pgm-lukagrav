import React from 'react';
import Task from './Task';
import '../css/styles.css';

const TaskColumn = ({ title, tasks }) => (
  <div className="column">
    <h3>{title}</h3>
    {tasks.map((task, i) => <Task key={i} {...task} />)}
  </div>
);

export default TaskColumn;
