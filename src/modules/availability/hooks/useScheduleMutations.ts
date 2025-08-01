import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createSchedule } from '../services/client/availability.api';

export function useScheduleMutations() {
  const queryClient = useQueryClient();

  const createScheduleMutation = useMutation({
    mutationFn: createSchedule,
    // onMutate: async (newSchedule) => {
    //   await queryClient.cancelQueries({ queryKey: ['schedules'] });

    //   const previousSchedules = queryClient.getQueryData(['schedules']);

    //   queryClient.setQueryData(['schedules'], (old: Schedule[]) => [
    //     ...old,
    //     newSchedule,
    //   ]);

    //   return { previousSchedules };
    // },
    // onError: (err, variables, context) => {
    //   queryClient.setQueryData(['schedules'], context?.previousSchedules);
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  return {
    createSchedule: createScheduleMutation.mutateAsync,
    isCreating: createScheduleMutation.isPending,
  };
}
