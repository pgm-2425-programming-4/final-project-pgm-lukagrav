import { API_URL, API_TOKEN } from "../../constants/constants";

export const updateTask = async (task) => {
  const body = {
    title: task.title,
    description: task.description,
    ...(task.state?.id && { state: task.state.id }),
    labels: task.labels?.map((label) => label.id) ?? [],
  };

  console.log("Sending update for task:", task.documentId, body);

  const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: body }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Update failed:", data);
    throw new Error("Failed to update task");
  }

  return data;
};
