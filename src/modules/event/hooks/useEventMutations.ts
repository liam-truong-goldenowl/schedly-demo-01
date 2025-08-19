import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEvent, deleteEvent } from '../services/event.api';

export function useEventMutations() {
  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: () => {
      toast.error('Failed to create event. Please try again.');
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    createEvent: createEventMutation.mutateAsync,
    isCreatingEvent: createEventMutation.isPending,
    deleteEvent: deleteEventMutation.mutateAsync,
    isDeletingEvent: deleteEventMutation.isPending,
  };
}
