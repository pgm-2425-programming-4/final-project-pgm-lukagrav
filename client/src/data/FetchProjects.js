
import { API_URL, API_TOKEN } from '../../constants/constants/';

export const fetchProjects = async () => {
  const res = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await res.json();


  return data.data.map((item) => ({
    id: item.documentId, 
    name: item.course.toUpperCase(),
  }));
};
