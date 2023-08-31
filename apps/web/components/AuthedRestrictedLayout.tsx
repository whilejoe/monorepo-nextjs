import { AuthedLayout, AuthedLayoutProps } from "./AuthedLayout";
import { AccessGuard } from "components/AccessGuard";

const AuthedRestrictedLayout = ({ children, ...props }: AuthedLayoutProps) => {
  return (
    <AuthedLayout {...props}>
      <AccessGuard>{children}</AccessGuard>
    </AuthedLayout>
  );
};

export { AuthedRestrictedLayout };
