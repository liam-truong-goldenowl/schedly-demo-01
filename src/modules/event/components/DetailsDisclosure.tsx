import { ChevronDownIcon } from 'lucide-react';

interface DetailsDisclosureProps {
  title: string;
  summary: React.ReactNode;
  children: React.ReactNode;
}

export function DetailsDisclosure({
  children,
  summary,
  title,
}: DetailsDisclosureProps) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none">
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
