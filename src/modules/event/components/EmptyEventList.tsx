import { Description } from '@/shared/components/layout/Description';

import { CreateEventButton } from './CreateEventButton';

export function EmptyEventList() {
  return (
    <section className="bg-background grid h-100 place-content-center rounded-lg border border-dashed text-center">
      <header className="mb-5">
        <h2 className="text-heading-24 mb-2">Create your first event type</h2>
        <Description className="max-w-[56ch]">
          Event types enable you to share links that show available times on
          your calendar and allow people to make bookings with you.
        </Description>
      </header>
      <div>
        <CreateEventButton />
      </div>
    </section>
  );
}
