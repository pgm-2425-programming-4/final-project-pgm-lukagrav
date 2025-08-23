import { API_URL, API_TOKEN } from "../constants/constants";

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return res.json();
};
