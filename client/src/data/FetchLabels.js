import { API_TOKEN, API_URL } from '../../constants/constants';

export const fetchLabels = async () => {
  const res = await fetch(`${API_URL}/labels`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch labels');
  }

  const data = await res.json();

  return data.data.map(item => ({
    id: item.id,
    name: item.name,
  }));
};
