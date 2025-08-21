import { API_TOKEN, API_URL } from "../../constants/constants";

export const fetchTaskByDocumentId = async (documentId) => {
  const res = await fetch(
    `${API_URL}/tasks?filters[documentId][$eq]=${documentId}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch task");

  const data = await res.json();

  return data.data
};

