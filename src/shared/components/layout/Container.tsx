import { cn } from '@/shared/lib/utils';

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto max-w-320 px-3 py-4 md:p-6 lg:p-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
