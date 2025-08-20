'use client';

import z from 'zod';
import { useState } from 'react';
import pluralize from 'pluralize';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClockIcon, MinusIcon, PersonStandingIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/input';
import { MapList } from '@/shared/components/MapList';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Separator } from '@/shared/components/ui/separator';
import { SelectNative } from '@/shared/components/ui/select-native';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import { RequiredInputIndicator } from '@/shared/components/RequiredInputIndicator';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/shared/components/ui/form';

import { useEventMutations } from '../hooks/useEventMutations';
import { useSchedulesQuery } from '../hooks/useSchedulesQuery';

import { DetailsDisclosure } from './DetailsDisclosure';

const formSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z
    .string()
    .max(255, 'Description must be 255 characters or less')
    .optional(),
  duration: z
    .number('Duration must be specified')
    .min(10, 'Duration must be at least 10 minutes')
    .max(480, 'Duration cannot exceed 480 minutes'),
  inviteeLimit: z
    .number('Invitee limit must be a number')
    .min(1, 'Invitee limit must be at least 1')
    .max(100, 'Invitee limit cannot exceed 100'),
});

const DURATION_OPTIONS = [15, 30, 45, 60, 90, 150];
const INVITEE_LIMIT_OPTIONS = [1, 2, 3, 4, 5, 10, 20];

export function CreateEventForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      description: '',
      duration: 30,
      inviteeLimit: 1,
    },
    resolver: zodResolver(formSchema),
  });

  const { isLoading, data: schedules = [] } = useSchedulesQuery();
  const { createEvent, isCreatingEvent } = useEventMutations();

  const [scheduleId, setScheduleId] = useState<number | undefined>();

  const selectedSchedule =
    schedules.find((s) => s.id === scheduleId) ?? schedules[0];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await createEvent({
      ...data,
      scheduleId: scheduleId || selectedSchedule!.id,
    });
    form.reset();
    router.push('/events');
  }

  function handleCancel() {
    router.push('/events');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          disabled={isCreatingEvent}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <RequiredInputIndicator />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Weekly Team Meeting" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <DetailsDisclosure
          title="Duration"
          isInvalid={!!form.formState.errors.duration}
          summary={
            <div className="text-copy-14 flex items-center">
              <ClockIcon size={14} className="me-1.5" />
              <span>{form.watch('duration')} min</span>
            </div>
          }
        >
          <FormField
            control={form.control}
            name="duration"
            disabled={isCreatingEvent}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Duration</FormLabel>
                <FormDescription className="mb-1 flex items-center gap-1">
                  <span>Minimum: 1 min</span>
                  <MinusIcon size={14} className="mx-1" />
                  <span>Maximum: 480 min</span>
                </FormDescription>
                <div className="flex items-center justify-between gap-2">
                  <FormControl className="relative">
                    <div>
                      <Input
                        {...field}
                        min={10}
                        max={480}
                        step={5}
                        type="number"
                        className="w-20 pe-8.5"
                      />
                      <span className="bg-background text-copy-14 text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2">
                        min
                      </span>
                    </div>
                  </FormControl>
                  <MapList
                    className="text-muted-foreground flex flex-wrap gap-2"
                    items={DURATION_OPTIONS}
                    itemKey={({ item }) => item}
                    render={({ item }) => (
                      <button
                        className={cn(
                          'text-copy-14 cursor-pointer',
                          'rounded-full border px-4 py-1',
                          'hover:bg-accent/50 hover:text-accent-foreground',
                          'active:text-accent-foreground active:bg-accent',
                          form.watch('duration') === item && 'bg-accent',
                        )}
                        type="button"
                        onClick={() => field.onChange(item)}
                      >
                        {item}
                      </button>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </DetailsDisclosure>
        <Separator />
        <DetailsDisclosure
          title="Availability"
          summary={
            isLoading ? (
              <p className="text-copy-14">Loading your schedules...</p>
            ) : (
              <p className="text-copy-14">
                {selectedSchedule?.name}{' '}
                {selectedSchedule?.isDefault ? '(Default)' : ''}
              </p>
            )
          }
        >
          {isLoading ? (
            <SelectNative>
              <option disabled>Loading...</option>
            </SelectNative>
          ) : (
            <SelectNative
              disabled={isCreatingEvent}
              onChange={(e) => setScheduleId(Number(e.target.value))}
              value={scheduleId}
            >
              {schedules?.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.name} {schedule.isDefault ? '(Default)' : ''}
                </option>
              ))}
            </SelectNative>
          )}
        </DetailsDisclosure>
        <Separator />
        <DetailsDisclosure
          title="Limits"
          summary={
            <p className="text-copy-14">
              Maximum {pluralize('invitee', form.watch('inviteeLimit'), true)}
            </p>
          }
        >
          <FormField
            control={form.control}
            name="inviteeLimit"
            disabled={isCreatingEvent}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Invitee Limit</FormLabel>
                  <FormDescription>Maximum number of invitees</FormDescription>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-20 pe-8.5"
                      />
                    </FormControl>
                    <span className="bg-background text-copy-14 text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 transform">
                      <PersonStandingIcon size={18} />
                    </span>
                  </div>
                  <MapList
                    className="text-muted-foreground flex flex-wrap gap-2"
                    items={INVITEE_LIMIT_OPTIONS}
                    itemKey={({ item }) => item}
                    render={({ item }) => (
                      <button
                        type="button"
                        disabled={isCreatingEvent}
                        onClick={() => field.onChange(item)}
                        className={cn(
                          'text-copy-14 cursor-pointer',
                          'rounded-full border px-4 py-1',
                          'hover:bg-accent/50 hover:text-accent-foreground',
                          'active:text-accent-foreground active:bg-accent',
                          form.watch('inviteeLimit') === item && 'bg-accent',
                        )}
                      >
                        {item}
                      </button>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </DetailsDisclosure>
        <Separator />
        <DetailsDisclosure
          isInvalid={!!form.formState.errors.description}
          title="Description"
          summary={
            <p className="text-copy-14 text-gray-600">
              {form.watch('description') || 'Add a description for your event'}
            </p>
          }
        >
          <FormField
            control={form.control}
            name="description"
            disabled={isCreatingEvent}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Discuss project updates and next steps"
                  />
                </FormControl>
                <FormDescription className="ms-auto">
                  255 characters max
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </DetailsDisclosure>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="me-2"
            size={'lg'}
            disabled={isCreatingEvent}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <StatefulButton
            loading={isCreatingEvent}
            type="submit"
            variant="default"
            size={'lg'}
          >
            Create
          </StatefulButton>
        </div>
      </form>
    </Form>
  );
}
