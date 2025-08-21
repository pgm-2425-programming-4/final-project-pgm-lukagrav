import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/fetchTasks";

export function useTasks() {
  return useQuery(["tasks"], fetchTasks);
}
