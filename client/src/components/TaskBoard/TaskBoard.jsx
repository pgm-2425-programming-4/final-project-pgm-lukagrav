
import TaskColumn from "./TaskColumn";
import { useTasks } from "../hooks/useTasks";

const Board = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  const states = ["todo", "inProgress", "review", "done"];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {states.map(state => (
        <TaskColumn key={state} state={state} tasks={tasks} />
      ))}
    </div>
  );
};

export default Board;
