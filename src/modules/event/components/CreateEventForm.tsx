'use client';

import z from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClockIcon, MinusIcon, PersonStandingIcon } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import { cn, toTitleCase } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { PhoneInput } from '@/shared/components/PhoneInput';
import { Separator } from '@/shared/components/ui/separator';
import { EventType, LocationType } from '@/shared/constants/event';
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

import { useSchedulesData } from '../hooks/useSchedulesData';
import { useEventTypeParam } from '../hooks/useEventTypeParam';
import { useEventMutations } from '../hooks/useEventMutations';

import { DetailsDisclosure } from './DetailsDisclosure';

const formSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z
    .string()
    .max(255, 'Description must be 255 characters or less')
    .optional(),
  duration: z
    .number('Duration must be specified')
    .min(1, 'Duration must be at least 1 minute'),
  locationDetails: z
    .string("Location details can't be empty")
    .min(1, 'Location details are required')
    .max(255, 'Location details must be 255 characters or less'),
  inviteeLimit: z
    .number('Invitee limit must be a number')
    .min(1, 'Invitee limit must be at least 1')
    .max(100, 'Invitee limit cannot exceed 100'),
});

export function CreateEventForm() {
  const { isLoading, data: schedules } = useSchedulesData();
  const { eventType } = useEventTypeParam();
  const { createEvent, isCreatingEvent } = useEventMutations();
  const router = useRouter();
  const [locationType, setLocationType] = useState<string>(
    LocationType.IN_PERSON,
  );
  const [scheduleId, setScheduleId] = useState<number | undefined>();
  const selectedSchedule =
    schedules?.find((schedule) => schedule.id === scheduleId) || schedules?.[0];

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      description: '',
      duration: 30,
      inviteeLimit: 1,
      locationDetails: '',
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await createEvent({
        ...data,
        locationType,
        scheduleId: scheduleId || selectedSchedule!.id,
        type: eventType,
      });
      form.reset();
      router.push('/events');
    } catch {
      toast.error('Failed to create event. Please try again.');
    }
  }

  function handleCancel() {
    router.push('/events');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
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
              {form.watch('duration')} min
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
                <FormDescription className="flex items-center gap-1">
                  <span>In minutes</span>
                  <MinusIcon size={14} className="mx-1" />
                  <span>Minimum: 1 min</span>
                  <MinusIcon size={14} className="mx-1" />
                  <span>Maximum: 480 min</span>
                </FormDescription>
                <div className="flex items-center justify-between gap-2">
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        min={1}
                        max={480}
                        type="number"
                        className="w-20 pe-8.5"
                      />
                    </FormControl>
                    <span className="bg-background text-copy-14 text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 transform">
                      min
                    </span>
                  </div>
                  <ul className="text-muted-foreground flex flex-wrap gap-2">
                    {[15, 30, 45, 60, 90, 150].map((duration) => (
                      <li key={duration}>
                        <button
                          className="text-copy-14 hover:bg-accent hover:text-accent-foreground active:text-accent-foreground active:bg-accent cursor-pointer rounded-full border px-4 py-1"
                          type="button"
                          onClick={() => field.onChange(duration)}
                        >
                          {duration}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </DetailsDisclosure>
        <Separator />
        <DetailsDisclosure
          title="Location"
          isInvalid={!!form.formState.errors.locationDetails}
          summary={
            <p className="text-copy-14 flex items-center gap-1">
              {form.watch('locationDetails') && (
                <>
                  <span className="font-medium">
                    {toTitleCase(locationType)}{' '}
                  </span>
                  <MinusIcon size={14} />
                </>
              )}
              <span className="text-gray-600">
                {form.watch('locationDetails') ||
                  'e.g. Phone number, Zoom link, Meeting ID, or physical address'}
              </span>
            </p>
          }
        >
          <div className="space-y-5">
            <ul className="flex gap-2">
              {Object.entries(LocationType).map(([key, value]) => (
                <li key={key}>
                  <button
                    type="button"
                    className={cn(
                      'hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground cursor-pointer rounded-full border px-4 py-1 text-sm',
                      locationType === value &&
                        'bg-accent/50 text-accent-foreground border-primary',
                    )}
                    disabled={isCreatingEvent}
                    onClick={() => {
                      form.setValue('locationDetails', '');
                      setLocationType(value as keyof typeof LocationType);
                    }}
                  >
                    {toTitleCase(value)}
                  </button>
                </li>
              ))}
            </ul>

            {locationType === LocationType.IN_PERSON && (
              <FormField
                control={form.control}
                name="locationDetails"
                disabled={isCreatingEvent}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Address <RequiredInputIndicator />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g. Physical address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {locationType === LocationType.PHONE && (
              <FormField
                control={form.control}
                name="locationDetails"
                disabled={isCreatingEvent}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <RequiredInputIndicator />
                    </FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {locationType === LocationType.ONLINE && (
              <FormField
                control={form.control}
                name="locationDetails"
                disabled={isCreatingEvent}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Online room details <RequiredInputIndicator />
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="e.g. Zoom link " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </DetailsDisclosure>
        <Separator />
        <DetailsDisclosure
          title="Availability"
          summary={
            isLoading ? (
              <p className="text-copy-14">Loading schedules...</p>
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
        <Separator
          className={eventType == EventType.ONE_ON_ONE ? 'hidden' : ''}
        />
        <DetailsDisclosure
          title="Limits and Buffers"
          summary={<p className="text-copy-14">Buffer times, max limits</p>}
          className={eventType == EventType.ONE_ON_ONE ? 'hidden' : ''}
        >
          <FormField
            control={form.control}
            name="inviteeLimit"
            disabled={isCreatingEvent}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>
                    Invitee Limit <RequiredInputIndicator />
                  </FormLabel>
                  <FormDescription>Maximum number of invitees</FormDescription>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="relative">
                    <FormControl>
                      <Input type="number" {...field} className="w-20 pe-8.5" />
                    </FormControl>
                    <span className="bg-background text-copy-14 text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 transform">
                      <PersonStandingIcon size={18} />
                    </span>
                  </div>
                  <ul className="text-muted-foreground flex flex-wrap gap-2">
                    {[2, 4, 5, 6, 10, 20].map((inviteeCount) => (
                      <li key={inviteeCount}>
                        <button
                          type="button"
                          disabled={isCreatingEvent}
                          onClick={() => field.onChange(inviteeCount)}
                          className="text-copy-14 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full border px-4 py-1"
                        >
                          {inviteeCount}
                        </button>
                      </li>
                    ))}
                  </ul>
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
