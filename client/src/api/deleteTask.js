import { API_URL, API_TOKEN } from "../constants/constants";

export const deleteTask = async (documentId) => {
  const res = await fetch(`${API_URL}/tasks/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error("Delete failed:", res.status, await res.text());
    throw new Error("Failed to delete task");
  }

  return documentId;
};
