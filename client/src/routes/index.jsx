import { createFileRoute } from '@tanstack/react-router';
import TaskBoard from '../components/TaskBoard/TaskBoard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Kanban Board</h3>
      <TaskBoard />
    </div>
  );
}
