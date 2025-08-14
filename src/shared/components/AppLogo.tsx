import Link from 'next/link';

export function AppLogo() {
  return (
    <Link
      href={'/'}
      className="text-heading-40 from-primary to-primary/20 bg-gradient-to-br bg-clip-text font-bold text-transparent"
    >
      Schedly
    </Link>
  );
}
