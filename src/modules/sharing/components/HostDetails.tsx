import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';

import { Host } from '../schema/host';

type HostDetailsProps = {
  host: Host;
};
export function HostDetails({ host }: HostDetailsProps) {
  return (
    <section className="p-4 text-center">
      <Heading level={'h2'} className="mb-1">
        {host.name}
      </Heading>
      <Description>
        Welcome to my scheduling page. <br /> Please follow the instructions to
        add an event to my calendar.
      </Description>
    </section>
  );
}
