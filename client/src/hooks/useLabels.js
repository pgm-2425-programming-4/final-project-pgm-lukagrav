import { useQuery } from '@tanstack/react-query';
import { fetchLabels } from '../data/FetchLabels';

export const useLabels = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels,
  });
};
