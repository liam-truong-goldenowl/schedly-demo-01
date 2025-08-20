import { cn } from '@/shared/lib/utils';

export function Description({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-copy-13 text-pretty text-gray-600', className)}
      {...props}
    >
      {children}
    </p>
  );
}
