import React, { useState, useEffect } from 'react';
import '../css/modal.css';
import { fetchLabels } from '../data/FetchLabels';

const TaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [state, setState] = useState(task.state || { name: 'To Do', id: null });
  const [labels, setLabels] = useState(task.labels || []);
  const [availableLabels, setAvailableLabels] = useState([]);

  useEffect(() => {
    fetchLabels()
      .then(setAvailableLabels)
      .catch(() => alert('Failed to load labels.'));
  }, []);

  const toggleLabel = (label) => {
    const exists = labels.find(l => l.id === label.id);
    if (exists) {
      setLabels(labels.filter(l => l.id !== label.id));
    } else {
      setLabels([...labels, label]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return alert('Title cannot be empty.');

    onSave({
      ...task,
      title,
      description,
      state,
      labels,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Task</h3>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label>Status</label>
        <select
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Ready for Review">Ready for Review</option>
          <option value="Done">Done</option>
        </select>

        <label>Labels</label>
        <div className="label-list">
          {availableLabels.map(label => (
            <button
              key={label.id}
              className={labels.some(l => l.id === label.id) ? 'active' : ''}
              onClick={() => toggleLabel(label)}
              type="button"
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
