import TaskColumn from "../TaskColumn/TaskColumn";
import { useTasks } from "../../hooks/UseTask";
import { useState } from "react";
import Boardbar from "../BoardBar/Boardbar";
import { useLabels } from "../../hooks/useLabels";

const TaskBoard = ({ tasks: groupedTasks }) => {
  const { data: fetchedTasks, isLoading, error } = useTasks();
  const { data: labels = [], isLoading: labelsLoading } = useLabels();

  const [filteredLabel, setFilteredLabel] = useState("");

  const tasks = groupedTasks ?? fetchedTasks;

  if (isLoading && !groupedTasks) return <p>Loading tasks...</p>;
  if (error && !groupedTasks) return <p>Error loading tasks</p>;

  const states = ["todo", "in_progress", "ready_for_review", "done"];

  return (
    <div>
      {!labelsLoading && (
        <Boardbar
          labels={labels}
          onFilterChange={setFilteredLabel}
          onAddTask={() => console.log("Open Add Task Modal")}
        />
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        {states.map((state) => (
          <TaskColumn
            key={state}
            state={state}
            tasks={tasks
              ?.filter((task) => task.state === state)
              ?.filter((task) =>
                filteredLabel
                  ? task.labels?.some((label) => label.title === filteredLabel)
                  : true
              )}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
