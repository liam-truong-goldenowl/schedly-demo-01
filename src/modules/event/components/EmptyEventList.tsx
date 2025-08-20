import { Description } from '@/shared/components/layout/Description';

export function EmptyEventList() {
  return (
    <section className="bg-background grid h-100 place-content-center rounded-lg border border-dashed text-center">
      <header className="mb-5">
        <h2 className="text-heading-24 mb-2">No events found</h2>
        <Description className="max-w-[56ch]">
          It is probably your first time here or your search did not return
        </Description>
      </header>
    </section>
  );
}
