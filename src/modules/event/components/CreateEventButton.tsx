import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

interface CreateEventButtonProps {
  showIcon?: boolean;
}

export function CreateEventButton({ showIcon = true }: CreateEventButtonProps) {
  return (
    <Button
      size={'lg'}
      className="group rounded-lg"
      aria-label="create new event type"
      asChild
    >
      <Link href="/events/create">
        {showIcon && <PlusIcon className="size-5" />}
        New
      </Link>
    </Button>
  );
}
