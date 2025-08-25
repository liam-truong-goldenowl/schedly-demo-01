import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Calendar } from '@/shared/components/ui/calendar';

const meta = {
  component: Calendar,
  title: 'Components/Calendar',
  args: {
    className: 'rounded-md border shadow-sm',
  },
  argTypes: {
    mode: {
      options: ['single', 'multiple', 'range'],
      control: { type: 'radio' },
    },
    className: {
      table: {
        disable: true,
      },
    },
    showOutsideDays: {
      control: { type: 'boolean' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
  },
};

export const Multiple: Story = {
  args: {
    mode: 'multiple',
  },
};

export const Range: Story = {
  args: {
    mode: 'range',
  },
};

export const Disabled: Story = {
  args: {
    mode: 'single',
    disabled: true,
  },
};

export const WithOutsideDays: Story = {
  args: {
    mode: 'single',
    showOutsideDays: false,
  },
};

export const Loading: Story = {
  args: {
    mode: 'single',
    loading: true,
    showOutsideDays: false,
  },
};
