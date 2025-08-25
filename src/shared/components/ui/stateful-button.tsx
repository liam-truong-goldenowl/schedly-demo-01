import { LoaderCircleIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

type StatefulButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

export function StatefulButton({
  loading,
  children,
  ...props
}: StatefulButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <LoaderCircleIcon className="animate-spin" />} {children}
    </Button>
  );
}
