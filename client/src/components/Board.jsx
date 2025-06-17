import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import { useTasks } from "../hooks/useTasks";
import { updateTask } from "../data/UpdateTask";
import "../css/styles.css";

const Board = ({ projectId }) => {
  const { data: tasks, isLoading, isError, refetch } = useTasks(projectId);
  const [selectedTask, setSelectedTask] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks</p>;
  if (!Array.isArray(tasks)) return <p>No tasks found</p>;

  const desiredOrder = ["To Do", "In Progress", "Ready for Review", "Done"];
  const normalizedOrder = desiredOrder.map((name) => name.toLowerCase());
  const columnsMap = new Map(normalizedOrder.map((name) => [name, []]));

  for (const task of tasks) {
    const rawState = task.state?.name ?? "Unassigned";
    const normalizedState = rawState.toLowerCase();

    if (normalizedState === "backlog") continue;

    const labels = Array.isArray(task.labels)
      ? task.labels.map((label) => ({
          id: label.id,
          name: label.name || label.attributes?.name || "Unnamed",
        }))
      : [];

    columnsMap.get(normalizedState)?.push({
      ...task,
      labels,
      description: task.description || "",
      onClick: () =>
        setSelectedTask({
          ...task,
          labels,
          state: task.state,
          description: task.description || "",
        }),
    });
  }

  const columns = desiredOrder.map((displayName, i) => ({
    title: displayName,
    tasks: columnsMap.get(normalizedOrder[i]) || [],
  }));

  const handleCloseModal = () => setSelectedTask(null);

  const handleSaveTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      handleCloseModal();
      refetch();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to update the task. Please try again.");
    }
  };

  return (
    <div className="board">
      {columns.map((col) => (
        <TaskColumn key={col.title} {...col} />
      ))}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default Board;
