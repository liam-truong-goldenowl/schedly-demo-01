import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export function BackToEventsPage() {
  return (
    <Button asChild variant="ghost">
      <Link href={'/events'}>
        <ArrowLeftIcon />
        Back to Events
      </Link>
    </Button>
  );
}
