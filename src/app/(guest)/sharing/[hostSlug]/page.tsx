import { HostDetails } from '@/modules/sharing/components/HostDetails';
import { fetchHost, fetchEvents } from '@/modules/sharing/server/query';
import { PublicEventList } from '@/modules/sharing/components/PublicEventList';
import { PoweredByRibbon } from '@/modules/sharing/components/PoweredByRibbon';

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
    <main className="bg-muted flex min-h-dvh md:items-center md:justify-center md:px-4">
      <h1 className="sr-only">Public Sharing Page</h1>
      <div className="bg-background min-h-[700px] w-full max-w-[1060px] space-y-8 rounded-xl px-7 py-6 shadow-lg">
        <div className="@container mx-auto max-w-[860px] space-y-8">
          <HostDetails host={host} />
          <PublicEventList events={events} hostSlug={hostSlug} />
        </div>
        <PoweredByRibbon />
      </div>
    </main>
  );
}
