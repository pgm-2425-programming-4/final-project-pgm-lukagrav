import { useState, useEffect } from "react";
import { useUpdateTask } from "../../hooks/UseUpdateTask";
import { useDeleteTask } from "../../hooks/UseDeleteTask";
import { useLabels } from "../../hooks/useLabels";
import "./EditTaskModal.css";

export default function EditTaskModal({ task, onClose }) {
  const { mutate: updateTask } = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const { data: labels = [] } = useLabels();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [state, setState] = useState(task?.state || "todo");
  const [selectedLabels, setSelectedLabels] = useState(
    task?.labels?.map((l) => l.id) || [],
  );
  const [group, setGroup] = useState(task?.group || "PGM3");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setState(task.state);
      setSelectedLabels(task.labels?.map((l) => l.id) || []);
      setGroup(task.group || "PGM3");
    }
  }, [task]);

  const handleSave = () => {
    updateTask(
      {
        documentId: task.documentId,
        data: { title, description, state, labels: selectedLabels, group },
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  const handleDelete = () => setShowDeleteConfirm(true);

  const confirmDelete = () => {
    deleteTaskMutation.mutate(task.documentId, {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        onClose();
      },
      onError: (err) => {
        console.error("Failed to delete task:", err);
      },
    });
  };

  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="title is-4">Edit Task</h2>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">State</label>
          <div className="control">
            <div className="select">
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="ready_for_review">Ready for Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Labels</label>
          <div className="control">
            {labels.map((label) => (
              <label
                key={label.id}
                className="checkbox"
                style={{ display: "block", marginBottom: "0.25rem" }}
              >
                <input
                  type="checkbox"
                  value={label.id}
                  checked={selectedLabels.includes(label.id)}
                  onChange={() => {
                    const value = label.id;
                    setSelectedLabels((prev) =>
                      prev.includes(value)
                        ? prev.filter((id) => id !== value)
                        : [...prev, value],
                    );
                  }}
                />{" "}
                {label.title}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">Group</label>
          <div className="control">
            <div className="select">
              <select value={group} onChange={(e) => setGroup(e.target.value)}>
                <option value="PGM3">PGM3</option>
                <option value="PGM4">PGM4</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="control">
            <button className="button is-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className="control">
            <button className="button is-light" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

        {showDeleteConfirm && (
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <p>Are you sure you want to delete "{task.title}"?</p>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-danger" onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button is-light"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
