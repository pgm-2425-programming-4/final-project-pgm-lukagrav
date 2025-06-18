import { API_TOKEN, API_URL } from "../../constants/constants";

export const fetchBacklog = async (page) => {
  const res = await fetch(
`${API_URL}/tasks?populate=state&filters[state][name][$eq]=Backlog&pagination[page]=${page}&pagination[pageSize]=5`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error("Fout bij ophalen");
  return res.json();
};
