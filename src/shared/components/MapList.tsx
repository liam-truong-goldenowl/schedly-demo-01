type MapListProps<T> = {
  items: T[];
  itemKey: (props: { item: T }) => React.Key;
  render: (props: { item: T }) => React.ReactNode;
} & React.ComponentProps<'ul'>;

export function MapList<T>({
  items,
  itemKey,
  render,
  ...props
}: MapListProps<T>) {
  return (
    <ul {...props}>
      {items.map((item) => (
        <li key={itemKey({ item })}>{render({ item })}</li>
      ))}
    </ul>
  );
}
