export function EventList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>Host</div>
        <div>Visit Landing Page</div>
      </div>
      <section>
        <h2 className="sr-only">Event list</h2>
        <ul>
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
          <li>Event 4</li>
          <li>Event 5</li>
        </ul>
        <button>view more</button>
      </section>
    </div>
  );
}
