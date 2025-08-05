import Link from 'next/link';
import { PlusIcon, MoveRightIcon, ChevronDownIcon } from 'lucide-react';

import { EventType } from '@/shared/constants/event';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

const options = [
  {
    type: EventType.ONE_ON_ONE,
    label: 'One-on-One',
    description: 'Good for coffee chats, 1:1 meetings, etc.',
    hosts: '1 Host',
    invitees: '1 Invitee',
  },
  {
    type: EventType.GROUP,
    label: 'Group',
    description: 'Webinars, online classes, etc.',
    hosts: '1 Host',
    invitees: 'Multiple Invitees',
  },
];

export function CreateEvent() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="group rounded-full"
            size={'lg'}
            aria-label="Create Event"
          >
            <PlusIcon className="size-5" />
            Create
            <ChevronDownIcon className="size-5 group-aria-expanded:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-w-72 md:max-w-xs"
          side="bottom"
          sideOffset={4}
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-4">Event Type</DropdownMenuLabel>
            {options.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className="flex flex-col items-start gap-1 p-4"
                asChild
              >
                <Link href={`/events/create?type=${option.type}`}>
                  <span className="text-primary font-bold">{option.label}</span>
                  <span className="inline-flex items-center gap-1">
                    {option.hosts} <MoveRightIcon /> {option.invitees}
                  </span>
                  <span className="text-gray-600">{option.description}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
