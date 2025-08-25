import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/fetchTasks";
import "./Sidebar.css";

export default function Sidebar() {
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  const groups = [...new Set(tasks.map((task) => task.group))];

  return (
    <aside className="menu">

      <p className="menu-label">Main</p>
      <ul className="menu-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <p className="menu-label">Groups</p>
      <ul className="menu-list">
        {groups.map((group) => (
          <li key={group}>
            <Link to={`/groups/${group}`}>{group}</Link>
          </li>
        ))}
      </ul>

      <p className="menu-label">Backlog</p>
      <ul className="menu-list">
        {groups.map((group) => (
          <li key={group}>
            <Link to={`/backlog/${group}`}>Backlog {group}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
