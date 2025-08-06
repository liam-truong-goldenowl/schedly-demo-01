import { useMutation } from '@tanstack/react-query';

import { createEvent } from '../services/event.api';

export function useEventMutations() {
  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onMutate: () => {},
    onError: () => {},
    onSettled: () => {},
  });

  return {
    createEvent: createEventMutation.mutateAsync,
    isCreatingEvent: createEventMutation.isPending,
  };
}
