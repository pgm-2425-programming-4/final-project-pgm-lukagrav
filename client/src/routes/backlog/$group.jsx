import { createFileRoute } from '@tanstack/react-router';
import PaginatedBacklog from '../../components/Backlog/PaginatedBacklog';

export const Route = createFileRoute('/backlog/$group')({
  component: BacklogGroupPage,
});

function BacklogGroupPage() {
  const { group } = Route.useParams(); 

  return (
    <div>
      <h1>Backlog for {group}</h1>
      <PaginatedBacklog group={group} />
    </div>
  );
}
