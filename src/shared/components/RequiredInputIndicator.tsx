import { AsteriskIcon } from 'lucide-react';

export function RequiredInputIndicator() {
  return (
    <AsteriskIcon
      size={10}
      className="text-destructive -ms-1 -mt-1"
      aria-label="Required field"
    />
  );
}
