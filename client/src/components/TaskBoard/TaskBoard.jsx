import TaskColumn from "../TaskColumn/TaskColumn";
import { useTasks } from "../../hooks/UseTask";

const TaskBoard = ({ tasks: groupedTasks }) => {
  const { data: fetchedTasks, isLoading, error } = useTasks();

  const tasks = groupedTasks ?? fetchedTasks;

  if (isLoading && !groupedTasks) return <p>Loading tasks...</p>;
  if (error && !groupedTasks) return <p>Error loading tasks</p>;

  const states = ["todo", "in_progress", "ready_for_review", "done"];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {states.map((state) => (
        <TaskColumn
          key={state}
          state={state}
          tasks={tasks.filter((task) => task.state === state)}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
