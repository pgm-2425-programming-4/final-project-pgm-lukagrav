const TaskCard = ({ task }) => {
    return (
      <div>
        <h4>{task.title}</h4>
        {task.labels?.length > 0 && (
          <ul>
            {task.labels.map(label => (
              <li key={label.id}>{label.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TaskCard;