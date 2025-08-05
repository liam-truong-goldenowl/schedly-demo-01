'use client';

import { useForm } from 'react-hook-form';
import { ClockIcon, PersonStandingIcon } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import { cn, toTitleCase } from '@/shared/lib/utils';
import { Textarea } from '@/shared/components/ui/textarea';
import { Separator } from '@/shared/components/ui/separator';
import { EventType, LocationType } from '@/shared/constants/event';
import { SelectNative } from '@/shared/components/ui/select-native';
import { useEventTypeParam } from '@/modules/event/hooks/useEventTypeParam';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
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

import { DetailsDisclosure } from './DetailsDisclosure';

export function CreateEventForm() {
  const { eventType } = useEventTypeParam();
  const { isLoading, data: schedules } = useSchedulesData();

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      duration: 30,
      locationType: LocationType.IN_PERSON,
      locationDetails: '',
      inviteeLimit: 1,
      scheduleId: undefined,
    },
  });

  function onSubmit() {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-copy-14 text-primary font-medium">
          {toTitleCase(eventType)} Event
        </div>
        <FormField
          control={form.control}
          name="name"
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
          title="Description"
          summary={
            <p className="text-copy-14">
              {form.watch('description') || 'Add a description for your event'}
            </p>
          }
        >
          <FormField
            control={form.control}
            name="description"
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

        <Separator />
        <DetailsDisclosure
          title="Duration"
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
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="sr-only">
                    Duration <RequiredInputIndicator />
                  </FormLabel>
                  <FormDescription className="sr-only">
                    in minutes (e.g. 30)
                  </FormDescription>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="relative">
                    <FormControl>
                      <Input type="number" {...field} className="w-20 pe-8.5" />
                    </FormControl>
                    <span className="bg-background text-copy-14 text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 transform">
                      min
                    </span>
                  </div>
                  <ul className="text-muted-foreground flex flex-wrap gap-2">
                    {[15, 30, 45, 60, 90, 150].map((duration) => (
                      <li
                        key={duration}
                        className="text-copy-14 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full border px-4 py-1"
                      >
                        {duration}
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
          summary={<p className="text-copy-14">In Person, Phone, or Online</p>}
        >
          <div className="space-y-4 py-1">
            <FormField
              control={form.control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Type</FormLabel>
                  <FormControl>
                    <RadioGroup className="grid grid-cols-3 gap-2" {...field}>
                      {Object.values(LocationType).map((type) => (
                        <label
                          key={type}
                          className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
                        >
                          <RadioGroupItem
                            id={`${type}`}
                            value={type}
                            className="sr-only after:absolute after:inset-0"
                          />
                          <p className="text-foreground text-sm leading-none font-medium">
                            {toTitleCase(type)}
                          </p>
                        </label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="locationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location Details <RequiredInputIndicator />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g. Zoom link or physical address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </DetailsDisclosure>

        <Separator />

        <DetailsDisclosure
          title="Availability"
          summary={<p className="text-copy-14">Select a schedule</p>}
        >
          <FormField
            control={form.control}
            name="scheduleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule:</FormLabel>
                <FormControl>
                  {isLoading ? (
                    <SelectNative {...field}>
                      <option disabled>Loading...</option>
                    </SelectNative>
                  ) : (
                    <SelectNative {...field}>
                      {schedules?.map((schedule) => (
                        <option key={schedule.id} value={schedule.id}>
                          {schedule.name}
                        </option>
                      ))}
                    </SelectNative>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </DetailsDisclosure>

        <Separator />

        <DetailsDisclosure
          title="Limits and Buffers"
          summary={<p className="text-copy-14">Buffer times, max limits</p>}
        >
          <FormField
            control={form.control}
            name="inviteeLimit"
            render={({ field }) => (
              <FormItem
                className={cn(eventType === EventType.ONE_ON_ONE && 'hidden')}
              >
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
                    {[2, 4, 5, 6, 10, 20].map((duration) => (
                      <li
                        key={duration}
                        className="text-copy-14 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full border px-4 py-1"
                      >
                        {duration}
                      </li>
                    ))}
                  </ul>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </DetailsDisclosure>
      </form>
    </Form>
  );
}
