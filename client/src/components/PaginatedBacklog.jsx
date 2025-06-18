import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchBacklog } from "../data/FetchBacklog";
import Pagination from "./Pagination";
import "../css/styles.css"; // Ensure this imports your styling

export default function PaginatedBacklog() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", page],
    queryFn: () => fetchBacklog(page),
  });

  if (isLoading) return <div className="backlog-container"><p>Loading...</p></div>;
  if (isError) return <div className="backlog-container"><p>Something went wrong.</p></div>;

  const tasks = data.data;
  const pagination = data.meta.pagination;

  return (
    <div className="backlog-container">
      <h2 className="backlog-title">Backlog Tasks</h2>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-title">{task.title}</div>
            {task.description && <div className="task-desc">{task.description}</div>}

            {Array.isArray(task.labels) && task.labels.length > 0 && (
              <div className="task-labels">
                {task.labels.map((label) => (
                  <span key={label.id} className="task-label">{label.name}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <Pagination pagination={pagination} setPage={setPage} />
    </div>
  );
}

