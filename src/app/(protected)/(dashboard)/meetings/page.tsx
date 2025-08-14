import { Heading } from '@/shared/components/layout/Heading';
import { MeetingList } from '@/modules/meetings/components/MeetingList';
import { MeetingFilters } from '@/modules/meetings/components/MeetingFilters';

export default function MeetingsPage() {
  return (
    <main>
      <Heading>Meetings</Heading>

      <div className="bg-background divide-border divide-y-1 rounded border">
        <MeetingFilters />
        <MeetingList />
      </div>
    </main>
  );
}
