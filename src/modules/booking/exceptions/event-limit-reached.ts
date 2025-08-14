export class EventLimitReachedException extends Error {
  constructor(message: string = 'Booking limit reached for this time slot') {
    super(message);
    this.name = 'EventLimitReachedException';
  }
}
