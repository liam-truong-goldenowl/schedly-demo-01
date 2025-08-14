import { Heading } from '@/shared/components/layout/Heading';
import { SwitchSchedule } from '@/modules/availability/components/SwitchSchedule';
import { ScheduleActions } from '@/modules/availability/components/ScheduleActions';
import { WeeklyHoursBlock } from '@/modules/availability/components/WeeklyHoursBlock';
import { getSchedules } from '@/modules/availability/services/server/availability.api';
import { DateOverridesBlock } from '@/modules/availability/components/DateOverridesBlock';
import { AvailabilityProvider } from '@/modules/availability/contexts/AvailabilityContext';

export default async function Page() {
  const { data, error } = await getSchedules();

  if (error) {
    return <div>Error loading schedules</div>;
  }

  return (
    <main>
      <Heading>Availability</Heading>

      <AvailabilityProvider initialSchedules={data}>
        <section className="bg-background rounded-lg border">
          <header className="items flex items-center justify-between border-b px-8 py-10">
            <SwitchSchedule />
            <ScheduleActions />
          </header>
          <div className="grid grid-cols-2 gap-4 px-8 py-10">
            <WeeklyHoursBlock />
            <DateOverridesBlock />
          </div>
        </section>
      </AvailabilityProvider>
    </main>
  );
}
