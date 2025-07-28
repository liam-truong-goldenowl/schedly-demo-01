import { cn } from '@/shared/lib/utils';

export function Page({
  className,
  children,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'grid min-h-dvh grid-rows-[auto_1fr_auto] pb-10',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
