'use client';

import { RotateCwIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/shared/components/ui/tooltip';

import { useMeetingsInfiniteQuery } from '../hooks/useMeetingsInfiniteQuery';

export function RefreshMeetingsButton() {
  const { refetch, isRefetching } = useMeetingsInfiniteQuery();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          aria-label={'Refresh meetings'}
          disabled={isRefetching}
          onClick={() => refetch()}
        >
          <RotateCwIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Refresh meetings</TooltipContent>
    </Tooltip>
  );
}
