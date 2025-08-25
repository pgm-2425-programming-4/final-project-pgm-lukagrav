import TaskCard from "../TaskCard/TaskCard";
import "./TaskColumn.css";

const TaskColumn = ({ title, tasks, onTaskClick }) => {
  return (
    <div className="column is-one-quarter">
      <div className="box task-column-box">
        <h3 className="title is-5 has-text-centered mb-4">{title}</h3>

        {tasks.length > 0 ? (
          <div className="content">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </div>
        ) : (
          <p className="has-text-grey-light has-text-centered">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
