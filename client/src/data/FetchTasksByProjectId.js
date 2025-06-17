import { API_TOKEN, API_URL } from "../../constants/constants";

export const fetchTasksByProject = async (projectId) => {
  const res = await fetch(
    `${API_URL}/tasks?populate=*&filters[project][documentId][$eq]=${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch tasks by project");

  const data = await res.json();

  return data.data; // ← again, no need to map through attributes
};
