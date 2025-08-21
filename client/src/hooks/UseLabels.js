import { useQuery } from "@tanstack/react-query";
import { fetchLabels } from "../api/fetchLabels";

export function useLabels() {
  return useQuery(["labels"], fetchLabels);
}
