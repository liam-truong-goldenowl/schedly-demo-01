'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import { RequiredInputIndicator } from '@/shared/components/RequiredInputIndicator';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';

import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { useDateQueryState } from '../hooks/useDateQueryState';
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
}

export function BookingForm({ eventSlug }: BookingFormProps) {
  const { slot, setSlot } = useSlotQueryState();
  const { date } = useDateQueryState();
  const guestEmails = [] as string[];
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { timezone } = useTimezoneQueryState(eventDetails.timezone);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', name: '', note: '' },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!slot || !date) {
      return;
    }

    const startTime = slot;
    const startDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    console.log('Booking details:', {
      startTime,
      startDate,
      timezone,
      guestEmails,
      eventId: eventDetails.id,
      ...data,
    });
  }

  function handleBack() {
    setSlot(null);
  }

  return (
    <div className="bg-background w-sm p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
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
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <StatefulButton>Confirm</StatefulButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
