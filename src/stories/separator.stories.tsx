import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from '@/shared/components/ui/separator';

const meta = {
  component: Separator,
  title: 'Components/Separator',
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Account Settings</h4>
        <p className="text-muted-foreground text-sm">
          Manage your account preferences and settings
        </p>
      </div>
      <Separator />
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Profile</h4>
        <p className="text-muted-foreground text-sm">
          Update your personal information
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-2 space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};
