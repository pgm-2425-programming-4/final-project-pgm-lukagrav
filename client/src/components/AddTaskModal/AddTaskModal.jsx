import { useState } from "react";
import { UseAddTask } from "../../hooks/UseAddTask";
import { useLabels } from "../../hooks/useLabels";

export default function AddTaskModal({ onClose }) {
  const { mutate: addTask } = UseAddTask();
  const { data: labels = [] } = useLabels();

  const [title, setTitle] = useState("");
  const [state, setState] = useState("backlog");
  const [group, setGroup] = useState("PGM3");
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(
      {
        title,
        state,
        group,
        labels: selectedLabels.map((id) => Number(id)),
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleLabelChange = (e) => {
    const value = e.target.value;
    setSelectedLabels((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="ready_for_review">Ready for Review</option>
          <option value="done">Done</option>
        </select>

        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="PGM3">PGM3</option>
          <option value="PGM4">PGM4</option>
        </select>

        <fieldset>
          <legend>Labels</legend>
          {labels.map((label) => (
            <label key={label.id}>
              <input
                type="checkbox"
                value={label.id}
                checked={selectedLabels.includes(String(label.id))}
                onChange={handleLabelChange}
              />
              {label.title}
            </label>
          ))}
        </fieldset>

        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
