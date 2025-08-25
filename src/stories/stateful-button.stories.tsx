import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StatefulButton } from '@/shared/components/ui/stateful-button';

const meta = {
  component: StatefulButton,
  title: 'Components/StatefulButton',
} satisfies Meta<typeof StatefulButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    return (
      <StatefulButton loading={loading} onClick={handleClick}>
        Click Me
      </StatefulButton>
    );
  },
};
