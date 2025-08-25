import { useState } from "react";
import { useTasks } from "../../hooks/UseTask";
import Backlog from "./Backlog";
import Pagination from "./Pagination";
import "./Backlog.css";

export default function PaginatedBacklog({ group }) {
  const { data: tasks = [], isLoading, error } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (isLoading) return <p>Loading backlog...</p>;
  if (error) return <p>Error loading backlog</p>;

  const backlogTasks = tasks.filter(
    (task) => task.state === "backlog" && (!group || task.group === group),
  );

  const pageCount = Math.ceil(backlogTasks.length / pageSize);
  const paginatedTasks = backlogTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div>
      <Backlog tasks={paginatedTasks} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
      />
    </div>
  );
}
