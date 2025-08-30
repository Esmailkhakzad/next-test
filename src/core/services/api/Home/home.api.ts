// hooks/useTasks.ts
import { useQuery } from '@tanstack/react-query';

export interface DescriptionItem {
  id: number;
  text: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  status: boolean;
  description: DescriptionItem[];
}

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('https://66ea869055ad32cda47940f5.mockapi.io/task');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

