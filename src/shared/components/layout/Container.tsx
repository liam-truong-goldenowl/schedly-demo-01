import { cn } from '@/shared/lib/utils';

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto max-w-320 px-10', className)} {...props}>
      {children}
    </div>
  );
}
