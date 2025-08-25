import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TimeIntervalInput } from '@/shared/components/TimeIntervalInput';

const meta = {
  component: TimeIntervalInput,
  title: 'Components/TimeIntervalInput',
} satisfies Meta<typeof TimeIntervalInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
