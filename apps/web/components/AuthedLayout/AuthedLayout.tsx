import { Suspense } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Shell, Main } from "ui/components/Layout";
import { Loading } from "ui/components/Loading";
import { AppHeader, AppHeaderSkeleton } from "components/AppHeader";

export type AuthedLayoutProps = {
  children?: React.ReactNode;
  fullMain?: boolean;
};

const Layout = ({ children, fullMain }: AuthedLayoutProps) => {
  return (
    <Shell>
      <Suspense fallback={<AppHeaderSkeleton />}>
        <AppHeader />
      </Suspense>
      <Main fullMain={fullMain}>
        <Suspense fallback={<Loading show size="lg" />}>{children}</Suspense>
      </Main>
    </Shell>
  );
};

const AuthedLayout = withAuthenticationRequired(Layout, {
  onRedirecting: () => <Loading show size="lg" />,
});

export { AuthedLayout };
