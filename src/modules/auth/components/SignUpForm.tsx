'use client';

import z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  AT_LEAST_ONE_NUMBER,
  AT_LEAST_ONE_LOWERCASE,
  AT_LEAST_ONE_UPPERCASE,
  AT_LEAST_EIGHT_CHARACTERS,
} from '@/shared/constants/regex';

import { signUp } from '../services/auth.api';

import { PasswordInput } from './PasswordInput';

export function SignUpForm() {
  const router = useRouter();
  const t = useTranslations('SignUpForm');
  const [isSignUpPending, startTransition] = useTransition();

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email(t('email.error')),
        name: z.string().min(1, t('name.error')),
        password: z
          .string()
          .refine(
            (val) =>
              [
                AT_LEAST_ONE_NUMBER,
                AT_LEAST_ONE_UPPERCASE,
                AT_LEAST_ONE_LOWERCASE,
                AT_LEAST_EIGHT_CHARACTERS,
              ].every((regex) => regex.test(val)),
            { message: t('password.error') },
          ),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { data, error } = await signUp(values);

      if (error) {
        form.setError('email', {
          type: 'manual',
          message: t('email.apiError'),
        });
        return;
      }

      const promise = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            router.push(`/login?email=${data.email}`);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('name.placeholder')}
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
        {/* <p>terms and privacy policy</p>
        <p>Login</p> */}
      </CardContent>
    </Card>
  );
}
