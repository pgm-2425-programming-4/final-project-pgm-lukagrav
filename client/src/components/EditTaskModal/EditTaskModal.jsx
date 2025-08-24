import { useState, useEffect } from "react";
import { useUpdateTask } from "../../hooks/UseUpdateTask";
import { useDeleteTask } from "../../hooks/UseDeleteTask";
import { useLabels } from "../../hooks/useLabels";

export default function EditTaskModal({ task, onClose }) {
  const { mutate: updateTask } = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const { data: labels = [] } = useLabels();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [state, setState] = useState(task?.state || "todo");
  const [selectedLabels, setSelectedLabels] = useState(
    task?.labels?.map((l) => l.id) || []
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
      { documentId: task.documentId, data: { title, description, state, labels: selectedLabels, group } },
      {
        onSuccess: () => onClose(),
      }
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
      }
    });
  };

  if (!task) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>

        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>State</label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="ready_for_review">Ready for Review</option>
          <option value="done">Done</option>
        </select>

        <label>Labels</label>
        <select multiple value={selectedLabels} onChange={(e) =>
          setSelectedLabels(Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value)))
        }>
          {labels.map((label) => (
            <option key={label.id} value={label.id}>{label.title}</option>
          ))}
        </select>

        <label>Group</label>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="PGM3">PGM3</option>
          <option value="PGM4">PGM4</option>
        </select>

        <div className="actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete "{task.title}"?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
