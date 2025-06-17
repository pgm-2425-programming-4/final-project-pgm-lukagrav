import React from "react";
import "../css/styles.css";

const Task = ({ title, tags, onClick }) => (
  <div className="task" onClick={onClick}>
    <h4>{title}</h4>
    {tags?.length > 0 && (
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    )}
  </div>
);

export default Task;
