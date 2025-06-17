import { API_TOKEN, API_URL } from "../../constants/constants";

export const fetchStatuses = async () => {
  const res = await fetch(
    `${API_URL}/statuses?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error("Fout bij ophalen");
  return res.json();
};
