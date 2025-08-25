import z from 'zod';

import { HostSchema, EventSchema, EventListSchema } from './schemas';

export type Host = z.infer<typeof HostSchema>;
export type Event = z.infer<typeof EventSchema>;
export type EventList = z.infer<typeof EventListSchema>;
