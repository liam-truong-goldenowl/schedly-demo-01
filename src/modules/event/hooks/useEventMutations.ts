import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEvent } from '../services/event.api';

export function useEventMutations() {
  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    createEvent: createEventMutation.mutateAsync,
    isCreatingEvent: createEventMutation.isPending,
  };
}
