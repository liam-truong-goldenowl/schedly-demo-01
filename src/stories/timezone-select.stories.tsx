import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TimezoneSelect } from '@/shared/components/TimezoneSelect';

const meta = {
  component: TimezoneSelect,
  title: 'Components/TimezoneSelect',
} satisfies Meta<typeof TimezoneSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
