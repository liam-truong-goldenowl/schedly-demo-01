import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardTitle,
  CardAction,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/components/ui/card';

const meta = {
  component: Card,
  title: 'Components/Card',
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Event</CardTitle>
          <CardDescription>Conference details for next week</CardDescription>
          <CardAction>Edit Event</CardAction>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Join us for the annual developer conference on June 15th, 2023.
          </p>
          <p className="mb-2">Location: Tech Center, 123 Main Street</p>
          <p>Time: 9:00 AM - 5:00 PM</p>
        </CardContent>
        <CardFooter className={'flex justify-between'}>
          <Button>RSVP Now</Button>
          <Button variant={'outline'}>Add to Calendar</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
