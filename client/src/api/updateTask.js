import { API_URL, API_TOKEN } from "../constants/constants";

export const updateTask = async ({ id, data }) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json();
};
