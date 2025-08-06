import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

type DetailsDisclosureProps = React.ComponentProps<'details'> & {
  title: React.ReactNode;
  summary: React.ReactNode;
  children: React.ReactNode;
  isInvalid?: boolean;
};

export function DetailsDisclosure({
  children,
  summary,
  title,
  isInvalid = false,
  ...props
}: DetailsDisclosureProps) {
  return (
    <details className="group" {...props}>
      <summary
        className={cn(
          'cursor-pointer list-none',
          isInvalid && 'text-destructive',
        )}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-medium">{title}</span>
          <ChevronDownIcon size={18} className="group-open:rotate-180" />
        </div>
        <div className="group-open:hidden">{summary}</div>
      </summary>
      <div className="py-2">{children}</div>
    </details>
  );
}
