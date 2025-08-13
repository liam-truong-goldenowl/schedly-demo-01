import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createBooking } from '../services/mutation';
import { EventLimitReachedException } from '../exceptions/event-limit-reached';

export function useBookingsMutation() {
  const queryClient = useQueryClient();
  const createBookingMutation = useMutation({
    mutationFn: createBooking,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['time-slots'] });
    },
    onError: (error) => {
      if (error instanceof EventLimitReachedException) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create booking');
      }
    },
    onSuccess: () => {
      toast.success('Booking created successfully');
    },
  });

  return {
    createBooking: createBookingMutation.mutateAsync,
    isCreatingBooking: createBookingMutation.isPending,
  };
}
