import { API_TOKEN, API_URL } from "../../constants/constants";

export const createTask = async (taskData) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title: taskData.title,
        description: taskData.description,
        state: taskData.state,      // single relation (id)
        project: taskData.project,  // single relation (id)
        labels: taskData.labels     // array of label ids
      }
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("Create task error:", result);
    throw new Error("Failed to create task");
  }

  return result;
};
