import { GitBranchIcon, ChevronRightIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/shared/components/ui/button';

const meta = {
  component: Button,
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    variant: 'secondary',
    children: <ChevronRightIcon />,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    size: 'sm',
    variant: 'outline',
    children: (
      <>
        <GitBranchIcon />
        New Branch
      </>
    ),
  },
};
