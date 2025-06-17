import React from "react";
import "../css/styles.css";

const Task = ({ title, description, labels, onClick }) => (
  <div className="task" onClick={onClick}>
    <h4>{title}</h4>

    {description && <p>{description}</p>}

    {labels?.length > 0 && (
      <ul>
        {labels.map((label) => (
          <li key={label.id}>{label.name}</li>
        ))}
      </ul>
    )}
  </div>
);

export default Task;
