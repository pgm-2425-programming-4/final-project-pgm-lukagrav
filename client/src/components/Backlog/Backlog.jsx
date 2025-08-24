// Backlog.jsx
export default function Backlog({ tasks }) {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.documentId}>{task.title}</li>
        ))}
      </ul>
    );
  }
  