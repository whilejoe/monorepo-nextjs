import { AuthedLayout, AuthedLayoutProps } from "./AuthedLayout";
import { AdminAccessGuard } from "./AdminAccessGuard";

const AuthedAdminLayout = ({ children, ...props }: AuthedLayoutProps) => {
  return (
    <AuthedLayout {...props}>
      <AdminAccessGuard>{children}</AdminAccessGuard>
    </AuthedLayout>
  );
};

export { AuthedAdminLayout };
