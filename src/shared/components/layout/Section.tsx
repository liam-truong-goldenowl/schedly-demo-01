import { cn } from '@/shared/lib/utils';

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('py-16', className)} {...props}>
      {children}
    </section>
  );
}
