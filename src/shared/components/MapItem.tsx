type MapItemProps<T, K extends React.Key> = {
  items: T[];
  itemKey: (props: { item: T }) => K;
  render: (props: { item: T; key: K }) => React.ReactNode;
};

export function MapItem<T, K extends React.Key>({
  items,
  itemKey,
  render,
}: MapItemProps<T, K>) {
  return items.map((item) => render({ item, key: itemKey({ item }) }));
}
