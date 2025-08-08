export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ hostSlug: string; eventSlug: string }>;
}) {
  const { eventSlug, hostSlug } = await params;

  return (
    <div>
      Hello from PublicEvent, {eventSlug} in {hostSlug}
    </div>
  );
}
