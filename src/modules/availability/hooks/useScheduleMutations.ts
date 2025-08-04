import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Schedule } from '../schemas';
import {
  createSchedule,
  deleteSchedule,
  updateTimezone,
  deleteWeeklyHour,
  createWeeklyHour,
  updateWeeklyHour,
  createDateOverride,
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
    onError: (err, variables, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      setActiveScheduleId(null);
    },
  });

  const updateTimezoneMutation = useMutation({
    mutationFn: updateTimezone,
    onMutate: async ({ scheduleId, timezone }) => {
      await queryClient.cancelQueries({ queryKey: ['schedules'] });

      const currentSchedules = queryClient.getQueryData(['schedules']);

      queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
        old.map((schedule) =>
          schedule.id === scheduleId ? { ...schedule, timezone } : schedule,
        ),
      );

      return { currentSchedules };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const deleteWeeklyHourMutation = useMutation({
    mutationFn: deleteWeeklyHour,
    onMutate: async ({ scheduleId, weeklyHourId }) => {
      await queryClient.cancelQueries({ queryKey: ['schedules'] });

      const currentSchedules = queryClient.getQueryData(['schedules']);

      queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
        old.map((schedule) =>
          schedule.id === scheduleId
            ? {
                ...schedule,
                weeklyHours: schedule.weeklyHours.filter(
                  (wh) => wh.id !== weeklyHourId,
                ),
              }
            : schedule,
        ),
      );

      return { currentSchedules };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const createWeeklyHourMutation = useMutation({
    mutationFn: createWeeklyHour,
    onMutate: async ({ scheduleId, body }) => {
      await queryClient.cancelQueries({ queryKey: ['schedules'] });

      const currentSchedules = queryClient.getQueryData(['schedules']);

      queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
        old.map((schedule) =>
          schedule.id === scheduleId
            ? {
                ...schedule,
                weeklyHours: [
                  ...schedule.weeklyHours,
                  { ...body, id: Date.now() }, // Temporary ID for optimistic update
                ],
              }
            : schedule,
        ),
      );

      return { currentSchedules };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const updateWeeklyHourMutation = useMutation({
    mutationFn: updateWeeklyHour,
    onMutate: async ({ scheduleId, body }) => {
      await queryClient.cancelQueries({ queryKey: ['schedules'] });

      const currentSchedules = queryClient.getQueryData(['schedules']);

      queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
        old.map((schedule) =>
          schedule.id === scheduleId
            ? {
                ...schedule,
                weeklyHours: [...schedule.weeklyHours, { ...body }],
              }
            : schedule,
        ),
      );

      return { currentSchedules };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const createDateOverrideMutation = useMutation({
    mutationFn: createDateOverride,
    onMutate: async ({ scheduleId, body }) => {
      await queryClient.cancelQueries({ queryKey: ['schedules'] });

      const currentSchedules = queryClient.getQueryData(['schedules']);

      queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
        old.map((schedule) =>
          schedule.id === scheduleId
            ? {
                ...schedule,
                dateOverrides: [
                  ...schedule.dateOverrides,
                  { ...body, id: Date.now() },
                ],
              }
            : schedule,
        ),
      );

      return { currentSchedules };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['schedules'], context?.currentSchedules);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  return {
    createSchedule: createScheduleMutation.mutateAsync,
    isCreating: createScheduleMutation.isPending,
    deleteSchedule: deleteScheduleMutation.mutateAsync,
    isDeleting: deleteScheduleMutation.isPending,
    updateTimezone: updateTimezoneMutation.mutateAsync,
    isUpdatingTimezone: updateTimezoneMutation.isPending,
    deleteWeeklyHour: deleteWeeklyHourMutation.mutateAsync,
    isDeletingWeeklyHour: deleteWeeklyHourMutation.isPending,
    createWeeklyHour: createWeeklyHourMutation.mutateAsync,
    isCreatingWeeklyHour: createWeeklyHourMutation.isPending,
    updateWeeklyHour: updateWeeklyHourMutation.mutateAsync,
    isUpdatingWeeklyHour: updateWeeklyHourMutation.isPending,
    createDateOverride: createDateOverrideMutation.mutateAsync,
    isCreatingDateOverride: createDateOverrideMutation.isPending,
  };
}
