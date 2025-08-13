'use client';

import z from 'zod';
import { DateTime } from 'luxon';
import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';

import { formatDate } from '@/shared/lib/time';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { RequiredInputIndicator } from '@/shared/components/RequiredInputIndicator';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { useBookingsMutation } from '../hooks/useBookingsMutation';
import { eventDetailsQuery } from '../queries/event-details-query';
import { useTimezoneQueryState } from '../hooks/useTimezoneQueryState';

const FormSchema = z.object({
  email: z.email('Invalid email address'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long'),
  note: z.string().max(500, 'Note must be at most 500 characters long'),
});

interface BookingFormProps {
  eventSlug: string;
  hostSlug: string;
}

export function BookingForm({ eventSlug, hostSlug }: BookingFormProps) {
  const router = useRouter();

  const { date } = useDateQueryState();
  const { timezone } = useTimezoneQueryState();
  const { slot, setSlot } = useSlotQueryState();
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { createBooking, isCreatingBooking } = useBookingsMutation();

  const [isBooked, setIsBooked] = useReducer(() => true, false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', name: '', note: '' },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const isTimeSlotSelected = slot && date;
    const guestEmails = [] as string[];

    if (!isTimeSlotSelected) {
      return;
    }

    const startTime = DateTime.fromFormat(slot, 'HH:mm').toFormat('HH:mm:ss');
    const startDate = formatDate(date);

    await createBooking({
      startTime,
      startDate,
      timezone,
      guestEmails,
      eventId: eventDetails.id,
      ...data,
    });
    setIsBooked();
  }

  function handleBack() {
    setSlot(null);
  }

  const isFormDisabled = isCreatingBooking || isBooked;

  return (
    <div className="bg-background w-sm p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            disabled={isFormDisabled}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Your name <RequiredInputIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isFormDisabled}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email address <RequiredInputIndicator />
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isFormDisabled}
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share anything that will help prepare for our meeting."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isCreatingBooking}
            >
              Back
            </Button>
            {isBooked ? (
              <Button
                type="button"
                onClick={() => {
                  router.replace(`/sharing/${hostSlug}`);
                }}
              >
                Return to host events
              </Button>
            ) : (
              <Button disabled={isFormDisabled}>Confirm</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
