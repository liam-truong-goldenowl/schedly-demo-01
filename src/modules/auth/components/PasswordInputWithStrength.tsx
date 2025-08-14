'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { XIcon, CheckIcon } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import { FormMessage } from '@/shared/components/ui/form';
import {
  AT_LEAST_ONE_NUMBER,
  AT_LEAST_ONE_LOWERCASE,
  AT_LEAST_ONE_UPPERCASE,
  AT_LEAST_EIGHT_CHARACTERS,
} from '@/shared/constants/regex';

import { PasswordInput } from './PasswordInput';

export function PasswordInputWithStrength(
  props: React.ComponentProps<typeof Input>,
) {
  const t = useTranslations('SignUpForm.password');

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: AT_LEAST_EIGHT_CHARACTERS, text: t('requirements.minLength') },
      { regex: AT_LEAST_ONE_LOWERCASE, text: t('requirements.lowercase') },
      { regex: AT_LEAST_ONE_UPPERCASE, text: t('requirements.uppercase') },
      { regex: AT_LEAST_ONE_NUMBER, text: t('requirements.number') },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const password = props.value?.toString() || '';
  const strength = checkStrength(password);
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength],
  );

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score === 3) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div>
      <PasswordInput {...props} />
      <FormMessage className="mt-2" />

      {/* Password strength indicator */}
      <div
        className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon
                size={16}
                className="text-green-500"
                aria-hidden="true"
              />
            ) : (
              <XIcon
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${req.met ? 'text-green-600' : 'text-muted-foreground'}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? ' - Requirement met' : ' - Requirement not met'}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
