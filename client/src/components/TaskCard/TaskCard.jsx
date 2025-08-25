import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onClick }) => {
  return (
    <div className="task-card box" onClick={onClick}>
      <h4 className="task-card-title">{task.title}</h4>

      {task.labels?.length > 0 && (
        <ul className="task-card-labels">
          {task.labels.map((label) => (
            <li key={label.id} className="task-card-label">
              {label.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskCard;
