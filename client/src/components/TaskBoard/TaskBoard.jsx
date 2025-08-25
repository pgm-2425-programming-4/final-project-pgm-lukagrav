import { useState } from "react";
import TaskColumn from "../TaskColumn/TaskColumn.jsx";
import { useTasks } from "../../hooks/UseTask";
import Boardbar from "../BoardBar/BoardBar";
import { useLabels } from "../../hooks/UseLabels.js";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

function formatState(str) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

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

      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} />}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      <div className="columns is-variable is-4 is-flex align-stretch">
        {states.map((state) => {
          const formattedState = formatState(state); // human-readable
          return (
            <TaskColumn
              key={state}
              title={formattedState} // <-- pass formatted title
              tasks={tasks
                .filter((task) => task.state === state)
                .filter((task) =>
                  filteredLabel
                    ? task.labels?.some(
                        (label) => label.title === filteredLabel
                      )
                    : true
                )}
              onTaskClick={(task) => setSelectedTask(task)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
