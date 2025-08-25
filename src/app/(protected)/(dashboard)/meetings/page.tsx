import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';
import { MeetingList } from '@/modules/meetings/components/MeetingList';
import { MeetingFilters } from '@/modules/meetings/components/MeetingFilters';
import { RefreshMeetingsButton } from '@/modules/meetings/components/RefreshMeetingsButton';

export default function MeetingsPage() {
  return (
    <div>
      <header className="mb-8">
        <Heading className="mb-0">Meetings</Heading>
        <Description>
          See upcoming and past events booked through your event type links.
        </Description>
      </header>
      <main className="space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <MeetingFilters />
          <RefreshMeetingsButton />
        </div>
        <MeetingList />
      </main>
    </div>
  );
}
