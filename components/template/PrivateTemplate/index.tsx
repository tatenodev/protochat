import { useSession } from "hooks/useSession";

type PrivateBlockProps = {
  children: React.ReactNode;
};

export default function PrivateBlock({ children }: PrivateBlockProps) {
  const { isLoadingSession } = useSession();

  if (isLoadingSession) return <div>Page Loading...</div>;

  return <>{children}</>;
}
