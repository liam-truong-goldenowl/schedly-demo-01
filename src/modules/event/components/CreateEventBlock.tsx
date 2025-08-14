'use client';

import { toTitleCase } from '@/shared/lib/utils';
import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';

import { useEventTypeParam } from '../hooks/useEventTypeParam';

import { CreateEventForm } from './CreateEventForm';

export function CreateEventBlock() {
  const { eventType } = useEventTypeParam();

  return (
    <section className="bg-background relative space-y-8 overflow-clip rounded-lg border p-6">
      <div className="text-copy-14 bg-primary text-primary-foreground absolute top-0 right-0 rounded-tr-lg rounded-bl-lg p-2 font-medium">
        {toTitleCase(eventType)}
      </div>

      <header>
        <Heading level={'h2'} className="mb-1.5">
          Event Details
        </Heading>
        <Description>
          Fill out the details of your event to get started.
        </Description>
      </header>

      <CreateEventForm />
    </section>
  );
}
