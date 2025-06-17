
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../data/FetchProjects';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
