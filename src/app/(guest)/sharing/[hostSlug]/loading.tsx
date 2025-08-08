import { Skeleton } from '@/shared/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-muted flex min-h-dvh md:items-center md:justify-center md:px-4">
      <div className="bg-background relative min-h-[700px] w-full max-w-[1060px] rounded-xl px-7 py-6 shadow-lg">
        <div className="mx-auto max-w-[860px] space-y-8">
          <div className="flex h-28 flex-col items-center justify-center">
            <Skeleton className="text-heading-20 mb-2 h-[1lh] w-[16ch]" />
            <Skeleton className="text-copy-16 mb-0.5 h-[1lh] w-[40ch]" />
            <Skeleton className="text-copy-16 h-[1lh] w-[48ch]" />
          </div>
          <div className="auto-fit-[400px] grid gap-8">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
