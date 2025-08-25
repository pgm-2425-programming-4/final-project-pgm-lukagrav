import { useState } from "react";
import { useAddTask } from "../../hooks/UseAddTask";
import { useLabels } from "../../hooks/useLabels";
import "./AddTaskModal.css"

export default function AddTaskModal({ onClose }) {
  const { mutate: addTask } = useAddTask();
  const { data: labels = [] } = useLabels();

  const [title, setTitle] = useState("");
  const [state, setState] = useState("backlog");
  const [group, setGroup] = useState("PGM3");
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(
      {
        title,
        state,
        group,
        labels: selectedLabels.map((id) => Number(id)),
        description: description,
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2>Add Task</h2>
  
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
  
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="modal-select"
          >
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="ready_for_review">Ready for Review</option>
            <option value="done">Done</option>
          </select>
  
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="modal-select"
          >
            <option value="PGM3">PGM3</option>
            <option value="PGM4">PGM4</option>
          </select>
  
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="modal-textarea"
          />
  
          <fieldset className="modal-fieldset">
            <legend>Labels</legend>
            {labels.map((label) => (
              <label key={label.id} className="modal-checkbox-label">
                <input
                  type="checkbox"
                  value={label.id}
                  checked={selectedLabels.includes(String(label.id))}
                  onChange={handleLabelChange}
                  className="modal-checkbox"
                />
                {label.title}
              </label>
            ))}
          </fieldset>
  
          <div className="actions">
            <button type="submit" className="add">Add Task</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
  
}
