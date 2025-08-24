import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ state, tasks, onTaskClick }) => {
  const tasksForState = tasks.filter((task) => task.state === state);

  return (
    <div>
      <h3>{state}</h3>
      {tasksForState.length > 0 ? (
        tasksForState.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))
      ) : (
        <p>No tasks</p>
      )}
    </div>
  );
};

export default TaskColumn;