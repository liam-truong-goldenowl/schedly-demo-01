import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AppLogo } from '@/shared/components/AppLogo';

const meta = {
  component: AppLogo,
  title: 'Components/AppLogo',
} satisfies Meta<typeof AppLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
