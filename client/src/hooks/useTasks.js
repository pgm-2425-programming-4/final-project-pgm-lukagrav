import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../data/FetchTasks";
import { fetchTasksByProject } from "../data/FetchTasksByProjectId";

export const useTasks = (projectId) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () =>
      projectId ? fetchTasksByProject(projectId) : fetchAllTasks(),
    enabled: true,
  });
};
