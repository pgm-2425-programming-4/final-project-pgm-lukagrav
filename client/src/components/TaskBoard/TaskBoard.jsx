import { useState } from "react";
import TaskColumn from "../TaskColumn/TaskColumn";
import { useTasks } from "../../hooks/UseTask";
import Boardbar from "../BoardBar/Boardbar";
import { useLabels } from "../../hooks/useLabels";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

const TaskBoard = ({ tasks: groupedTasks }) => {
  const { data: fetchedTasks = [], isLoading, error } = useTasks();
  const { data: labels = [], isLoading: labelsLoading } = useLabels();

  const [filteredLabel, setFilteredLabel] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = groupedTasks ?? fetchedTasks;

  const states = ["todo", "in_progress", "ready_for_review", "done"];

  if (isLoading && !groupedTasks) return <p>Loading tasks...</p>;
  if (error && !groupedTasks) return <p>Error loading tasks</p>;

  return (
    <div>
      {!labelsLoading && (
        <Boardbar
          labels={labels}
          onFilterChange={setFilteredLabel}
          onAddTask={() => setShowAddModal(true)}
        />
      )}

      {showAddModal && (
        <AddTaskModal onClose={() => setShowAddModal(false)} />
      )}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        {states.map((state) => (
          <TaskColumn
            key={state}
            state={state}
            tasks={tasks
              .filter((task) => task.state === state)
              .filter((task) =>
                filteredLabel
                  ? task.labels?.some((label) => label.title === filteredLabel)
                  : true
              )}
            onTaskClick={(task) => setSelectedTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
