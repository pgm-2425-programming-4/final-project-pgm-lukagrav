import { API_URL, API_TOKEN } from "../constants/constants";

export const addTask = async (taskData) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: taskData }),
  });

  if (!res.ok) {
    throw new Error("Failed to add task");
  }

  return res.json();
};
