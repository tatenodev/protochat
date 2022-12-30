import { useSession } from "hooks/useSession";
import { useAppSelector } from "store/hooks";

type PrivateBlockProps = {
  children: React.ReactNode;
};

export default function PrivateBlock({ children }: PrivateBlockProps) {
  const { isLoadingSession } = useAppSelector((state) => state.session);
  useSession();

  if (isLoadingSession) return <div>Page Loading...</div>;

  return <>{children}</>;
}
