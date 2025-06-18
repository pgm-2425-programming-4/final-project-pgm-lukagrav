import { createFileRoute } from '@tanstack/react-router';
import Sidebar from '../components/Sidebar';
import PaginatedBacklog from '../components/PaginatedBacklog';
import '../index.css';

export const Route = createFileRoute('/App')({
  component: AppPage,
});

function AppPage() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <PaginatedBacklog />
      </div>
    </div>
  );
}
