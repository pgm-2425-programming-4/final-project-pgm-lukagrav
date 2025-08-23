import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/addTask";

export function UseAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
