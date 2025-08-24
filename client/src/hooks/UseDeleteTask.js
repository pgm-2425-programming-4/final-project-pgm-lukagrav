import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/deleteTask";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (documentId) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.filter((task) => task.documentId !== documentId)
      );
    },
  });
}
