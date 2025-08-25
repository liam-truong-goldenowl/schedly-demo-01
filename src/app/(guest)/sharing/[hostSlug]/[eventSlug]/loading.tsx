import { Skeleton } from '@/shared/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Skeleton className="min-h-[400px] w-[400px]" />
    </div>
  );
}
