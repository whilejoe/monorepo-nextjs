import { Shell, Main } from "ui/components/Layout";
import { Loading } from "ui/components/Loading";
import { useAuth0User } from "hooks/useAuth0User";
import { AppHeaderPublic } from "components/AppHeaderPublic";
import { AuthedLayout } from "components/AuthedLayout";
import { AppHeaderSkeleton } from "components/AppHeader";

type PublicLayoutProps = {
  children?: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isLoading, isAuthenticated } = useAuth0User();

  if (!isAuthenticated) {
    return (
      <Shell>
        {isLoading ? <AppHeaderSkeleton /> : <AppHeaderPublic />}
        {isLoading ? <Loading show size="lg" /> : <Main>{children}</Main>}
      </Shell>
    );
  }

  return <AuthedLayout>{children}</AuthedLayout>;
};

export { PublicLayout };
