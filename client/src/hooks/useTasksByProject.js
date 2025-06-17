import { useQuery } from "@tanstack/react-query";
import { fetchTasksByProject } from "../data/FetchTasksByProjectId";

export const useTasksByProject = (projectId) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasksByProject(projectId),
    enabled: !!projectId,
  });
};
