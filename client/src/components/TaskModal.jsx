import React, { useState, useEffect } from 'react';
import '../css/modal.css';
import { fetchLabels } from '../data/FetchLabels';
import { useProjects } from '../hooks/useProjects';

const TaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [stateId, setStateId] = useState(task.state?.id || '');
  const [labels, setLabels] = useState(task.labels || []);
  const [projectId, setProjectId] = useState(task.project?.id || '');
  const [availableLabels, setAvailableLabels] = useState([]);

  const { data: projects = [] } = useProjects();

  useEffect(() => {
    fetchLabels()
      .then(setAvailableLabels)
      .catch(() => alert('Failed to load labels.'));
  }, []);

  const toggleLabel = (label) => {
    setLabels((prev) =>
      prev.some((l) => l.id === label.id)
        ? prev.filter((l) => l.id !== label.id)
        : [...prev, label]
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) return alert("Title cannot be empty.");

    onSave({
      title,
      description,
      state: stateId ? Number(stateId) : null,
      project: projectId ? Number(projectId) : null,
      labels: labels.map((l) => l.id),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{task.id ? 'Edit Task' : 'New Task'}</h3>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Status</label>
        <select value={stateId} onChange={(e) => setStateId(e.target.value)}>
          <option value="">Select status</option>
          <option value="4">To Do</option>
          <option value="6">In Progress</option>
          <option value="10">Ready for Review</option>
          <option value="8">Done</option>
        </select>

        <label>Project</label>
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.course || project.name || `Project ${project.id}`}
            </option>
          ))}
        </select>

        <label>Labels</label>
        <div className="label-list">
          {availableLabels.map((label) => (
            <button
              key={label.id}
              type="button"
              className={labels.some((l) => l.id === label.id) ? 'active' : ''}
              onClick={() => toggleLabel(label)}
            >
              {label.name}
            </button>
          ))}
        </div>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
