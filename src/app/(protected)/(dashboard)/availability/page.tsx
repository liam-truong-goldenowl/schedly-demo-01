import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';
import { SwitchSchedule } from '@/modules/availability/components/SwitchSchedule';
import { WeeklyHoursBlock } from '@/modules/availability/components/WeeklyHoursBlock';
import { getSchedules } from '@/modules/availability/services/server/availability.api';
import { DateOverridesBlock } from '@/modules/availability/components/DateOverridesBlock';
import { AvailabilityProvider } from '@/modules/availability/contexts/AvailabilityContext';
import { CreateScheduleModal } from '@/modules/availability/components/CreateScheduleModal';

export default async function Page() {
  const data = await getSchedules();

  return (
    <div>
      <AvailabilityProvider initialSchedules={data}>
        <header className="mb-4 flex items-center justify-between">
          <div>
            <Heading className="mb-0">Availability</Heading>
            <Description>
              Configure times when you are available for bookings.
            </Description>
          </div>
          <CreateScheduleModal />
        </header>

        <main className="bg-background overflow-clip rounded-lg border">
          <header className="border-b">
            <SwitchSchedule />
          </header>
          <div className="grid grid-cols-1 gap-8 px-8 py-10 xl:grid-cols-2">
            <WeeklyHoursBlock />
            <DateOverridesBlock />
          </div>
        </main>
      </AvailabilityProvider>
    </div>
  );
}
