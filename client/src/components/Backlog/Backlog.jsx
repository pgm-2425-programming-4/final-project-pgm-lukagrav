export default function Backlog({ tasks }) {
  return (
    <ul className="backlog">
      {tasks.map((task) => (
        <li key={task.documentId} className="box">
          {task.title}
        </li>
      ))}
    </ul>
  );
}
