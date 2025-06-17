import { createFileRoute } from '@tanstack/react-router'
import "./App.css";
import PaginatedBacklog from "../components/PaginatedBacklog";

export const Route = createFileRoute('/App')({
  component: PaginatedBacklog
})

function App() {
  return (
    <main>
      <h1>backlog</h1>
      <PaginatedBacklog></PaginatedBacklog>
    </main>
  );
}

export default App;
