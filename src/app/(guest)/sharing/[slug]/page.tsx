type Params = Promise<{ slug: string }>;

export default async function PublicSharingPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  return <div>Hello from PublicSharing {slug}</div>;
}
