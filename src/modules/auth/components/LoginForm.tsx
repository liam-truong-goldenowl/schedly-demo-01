'use client';

import z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/shared/components/ui/input';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';

import { login } from '../services/auth.api';

import { PasswordInput } from './PasswordInput';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('LoginForm');
  const [isSignUpPending, startTransition] = useTransition();
  const [apiError, setApiError] = useState<string | null>(null);

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email(t('email.error')),
        password: z.string().min(1, { message: t('password.error') }),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get('email') || '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error } = await login(values);

      if (error) {
        setApiError(t('apiError'));
        return;
      }

      setApiError(null);

      const promise = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            router.push('/');
            resolve(true);
          }, 2_000);
        });
      };
      toast.promise(promise, {
        loading: t('toast.loading'),
        description: t('toast.description'),
      });
    });
  }

  return (
    <Card className="mx-auto w-full max-w-110">
      <CardHeader>
        <CardTitle className="text-heading-24">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {apiError && (
              <p aria-live="polite" className="text-destructive mb-4 text-sm">
                {apiError}
              </p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('email.placeholder')}
                      disabled={isSignUpPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password.label')}</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isSignUpPending} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <StatefulButton loading={isSignUpPending}>
                {t('submitButton.text')}
              </StatefulButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
