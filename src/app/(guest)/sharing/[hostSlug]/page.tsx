import { HostDetails } from '@/modules/sharing/components/HostDetails';
import { fetchHost, fetchEvents } from '@/modules/sharing/server/query';
import { PublicEventList } from '@/modules/sharing/components/PublicEventList';

export default async function PublicSharingPage({
  params,
}: {
  params: Promise<{ hostSlug: string }>;
}) {
  const { hostSlug } = await params;

  const [host, events] = await Promise.all([
    fetchHost(hostSlug),
    fetchEvents(hostSlug),
  ]);

  return (
    <main className="bg-muted grid min-h-dvh place-content-center">
      <h1 className="sr-only">Public Sharing Page</h1>
      <div className="bg-background min-h-[700px] w-[1060px] rounded-xl shadow-lg">
        <HostDetails host={host} />
        <PublicEventList events={events} hostSlug={hostSlug} />
      </div>
    </main>
  );
}
