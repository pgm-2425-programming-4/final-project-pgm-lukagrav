import { createFileRoute } from '@tanstack/react-router';
import TaskBoard from '../../components/TaskBoard/TaskBoard';
import { useTasks } from '../../hooks/UseTask';

export const Route = createFileRoute('/groups/$group')({
  component: GroupPage,
});

function GroupPage() {
    const { group } = Route.useParams();
    const { data: tasks = [], isLoading, error } = useTasks();
  
    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const filteredTasks = tasks.filter((task) => task.group === group);
  
    return <TaskBoard tasks={filteredTasks} />;
  }
  