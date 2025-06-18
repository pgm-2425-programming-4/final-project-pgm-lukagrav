import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import TaskModal from './TaskModal';
import '../css/styles.css';

const Topbar = ({ onTaskCreated }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveTask = async (task) => {
    if (onTaskCreated) {
      await onTaskCreated(task);
    }
    handleCloseModal();
  };

  return (
    <div className="topbar">
      <button className="add-task" onClick={handleOpenModal}>
        Add new task
      </button>

      <Link to="/app">
        <button className="view-backlog">View backlog</button>
      </Link>

      {isModalOpen && (
        <TaskModal
          task={{
            title: '',
            description: '',
            labels: [],
            state: null,
            dueDate: '',
          }}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default Topbar;
