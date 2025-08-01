import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Schedule } from '../schemas';
import {
  createSchedule,
  deleteSchedule,
} from '../services/client/availability.api';

import { useActiveSchedule } from './useActiveSchedule';

export function useScheduleMutations() {
  const queryClient = useQueryClient();
  const { setActiveScheduleId } = useActiveSchedule();

  const createScheduleMutation = useMutation({
    mutationFn: createSchedule,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: deleteSchedule,
    onMutate: async (scheduleId) => {
      await queryClient.cancelQueries({ queryKey: ['schedules'] });

      const currentSchedules = queryClient.getQueryData(['schedules']);

      queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
        old.filter((schedule) => schedule.id !== scheduleId),
      );

      return { currentSchedules };
    },
    onError: (err, teamId, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      setActiveScheduleId(null);
    },
  });

  return {
    createSchedule: createScheduleMutation.mutateAsync,
    isCreating: createScheduleMutation.isPending,
    deleteSchedule: deleteScheduleMutation.mutateAsync,
    isDeleting: deleteScheduleMutation.isPending,
  };
}
