import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/updateTask";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, data }) => updateTask({ documentId, data }),
    onSuccess: () => {
        
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
