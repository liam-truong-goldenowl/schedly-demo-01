import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PhoneInput } from '@/shared/components/PhoneInput';

const meta = {
  component: PhoneInput,
  title: 'Components/PhoneInput',
} satisfies Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'max-w-[32ch]',
  },
};
