type IfProps = {
  condition?: boolean;
  conditionFn?: () => boolean;
  show: () => React.ReactNode;
  otherwiseShow?: () => React.ReactNode;
} & (
  | { condition: boolean; conditionFn?: never }
  | { condition?: never; conditionFn: () => boolean }
);

export function If({ condition, conditionFn, show, otherwiseShow }: IfProps) {
  const resolvedCondition = condition ?? (conditionFn ? conditionFn() : false);
  return resolvedCondition ? show() : otherwiseShow ? otherwiseShow() : null;
}
