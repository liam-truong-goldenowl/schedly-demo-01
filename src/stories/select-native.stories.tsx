import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SelectNative } from '@/shared/components/ui/select-native';

const meta = {
  component: SelectNative,
  title: 'Components/SelectNative',
} satisfies Meta<typeof SelectNative>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xs">
      <SelectNative defaultValue="california">
        <option value="" disabled>
          Select a state...
        </option>
        <option value="california">California</option>
        <option value="texas">Texas</option>
        <option value="new-york">New York</option>
        <option value="florida">Florida</option>
        <option value="illinois">Illinois</option>
      </SelectNative>
    </div>
  ),
};
