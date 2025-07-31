import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const headingVariants = cva('font-semibold', {
  variants: {
    level: {
      h1: 'text-heading-24 mb-[0.67em]',
      h2: 'text-heading-20 mb-[0.83em]',
      h3: 'text-heading-16 mb-[1em]',
      h4: 'text-heading-16 mb-[1.33em]',
      h5: 'text-heading-14 mb-[1.67em]',
      h6: 'text-heading-12 mb-[2.33em]',
    },
  },
  defaultVariants: {},
  compoundVariants: [],
});

type HeadingProps = React.ComponentPropsWithoutRef<'h1'> &
  VariantProps<typeof headingVariants>;

export function Heading({
  level = 'h1',
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = level || 'h1';

  return (
    <Component className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Component>
  );
}
