import { GitBranchIcon, ChevronRightIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/shared/components/ui/button';

const meta = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="outline">
        Small
      </Button>
      <Button size="default" variant="outline">
        Medium
      </Button>
      <Button size="lg" variant="outline">
        Large
      </Button>
    </div>
  ),
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
