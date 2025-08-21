'use client';

import z from 'zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { XIcon, PlusIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { getDefaultTimezone } from '@/shared/lib/utils';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/shared/components/ui/form';
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/shared/components/ui/dialog';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

const formSchema = z.object({
  name: z.string().min(1, 'Name your schedule'),
});

export function CreateScheduleModal() {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const { setActiveScheduleId } = useActiveSchedule();
  const { isCreating, createSchedule } = useScheduleMutations();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name } = values;
    const timezone = getDefaultTimezone();

    const createdSchedule = await createSchedule({ name, timezone });

    setTimeout(() => {
      setActiveScheduleId(createdSchedule.id);
    }, 200);

    form.reset();
    closeBtnRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'lg'}>
          <PlusIcon size={16} />
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle>Create Schedule</DialogTitle>
          <DialogClose asChild onClick={() => form.reset()}>
            <Button type="button" size="icon" variant="ghost">
              <XIcon className="!size-5" />
            </Button>
          </DialogClose>
          <DialogDescription className="sr-only">
            Create a new schedule to manage your availability.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
              disabled={isCreating}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule name</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Working hours, Exclusive Hours, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="sr-only">
                    This name will be used to identify the schedule.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <DialogClose asChild onClick={() => form.reset()}>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="w-full"
                  ref={closeBtnRef}
                >
                  Close
                </Button>
              </DialogClose>
              <StatefulButton
                loading={isCreating}
                type="submit"
                size="lg"
                className="ml-2 w-full"
              >
                Create
              </StatefulButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
