import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="grid min-h-dvh place-content-center">
      <main className="mx-auto max-w-md rounded-lg border p-4 shadow-md">
        <div className="mt-4 flex items-center justify-end gap-2">
          <Link href="/login" className="text-blue-500 hover:underline">
            {t('login')}
          </Link>
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            {t('signUp')}
          </Link>
        </div>
      </main>
    </div>
  );
}
