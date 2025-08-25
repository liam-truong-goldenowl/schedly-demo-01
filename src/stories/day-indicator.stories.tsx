import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DayIndicator } from '@/shared/components/DayIndicator';

const meta = {
  component: DayIndicator,
  title: 'Components/DayIndicator',
} satisfies Meta<typeof DayIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    day: 'Monday',
  },
};
