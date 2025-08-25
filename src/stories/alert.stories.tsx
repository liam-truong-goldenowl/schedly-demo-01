import { TerminalIcon, AlertCircleIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/shared/components/ui/alert';

const meta = {
  component: Alert,
  title: 'Components/Alert',
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert variant="default">
      <TerminalIcon />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        Please verify your billing information and try again.
      </AlertDescription>
    </Alert>
  ),
};
