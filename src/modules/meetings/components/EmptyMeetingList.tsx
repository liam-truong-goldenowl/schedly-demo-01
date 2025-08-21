import { Description } from '@/shared/components/layout/Description';

export function EmptyMeetingList() {
  return (
    <section className="bg-background grid h-100 place-content-center rounded-lg border border-dashed text-center">
      <header className="mb-5">
        <h2 className="text-heading-24 mb-2">No meetings found</h2>
        <Description className="max-w-[56ch]">
          There is no scheduled meeting at this time.
        </Description>
      </header>
    </section>
  );
}
