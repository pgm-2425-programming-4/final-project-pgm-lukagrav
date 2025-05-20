import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Backlog from './Backlog';
import Pagination from './Pagination';

const API_URL = "http://localhost:1337/api/tasks";
const TOKEN = "387264970d8f2dd42fcf204e92d2e85efa72cf8e84e792c7d642357801cda95d6721af82efdf76b78eda6dd8b1aea5106793727a68fdd8d4df1f238ad39aebb89b9137e4284b86368f4fd49d568a1ecb36ff1702dcf0e2099198fe03ddacbd722516b9eed80b0d7e0586cdeae0061a0d56d06dd61bb469e3c3bbe2dfb4b623e5"; // Voeg hier je echte token in

const fetchBacklog = async (page) => {
  const res = await fetch(
    `${API_URL}?populate=state&filters[state][name][$eq]=Backlog&pagination[page]=${page}&pagination[pageSize]=5`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    }
  );
  if (!res.ok) throw new Error("Fout bij ophalen");
  return res.json();
};

export default function PaginatedBacklog() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['backlog', page],
    queryFn: () => fetchBacklog(page)
  });

  if (isLoading) return <p>Laden...</p>;
  if (isError) return <p>Er ging iets mis.</p>;

  const tasks = data.data;
  const pagination = data.meta.pagination;

  // ✅ Console log toevoegen om de structuur van de taken te zien
  console.log("Fetched tasks:", tasks);

  return (
    <div>
      <Backlog tasks={tasks} />
      <Pagination pagination={pagination} setPage={setPage} />
    </div>
  );
}


