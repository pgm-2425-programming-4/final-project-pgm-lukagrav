import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Backlog from './Backlog';
import Pagination from './Pagination';
import { API_TOKEN, API_URL } from '../../constants/constants';

const fetchBacklog = async (page) => {
  const res = await fetch(
    `${API_URL}?populate=state&filters[state][name][$eq]=Backlog&pagination[page]=${page}&pagination[pageSize]=5`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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


