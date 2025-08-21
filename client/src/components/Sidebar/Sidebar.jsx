import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/fetchTasks";

export default function Sidebar() {
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  const groups = [...new Set(tasks.map((task) => task.group))];

  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <h3>Groups</h3>
        <ul>
          {groups.map((group) => (
            <li key={group}>
              <Link to={`/groups/${group}`}>{group}</Link>
            </li>
          ))}
        </ul>

        <h3>Backlog</h3>
        <Link to="/backlog">Go to Backlog</Link>
      </nav>
    </aside>
  );
}






