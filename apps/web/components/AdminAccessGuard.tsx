import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Loading } from "ui/components/Loading";
import { useUser } from "hooks/useUser";

type Props = {
  children?: React.ReactNode;
};

const AdminAccessGuard = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState(false);
  const { data: user } = useUser();
  const { replace } = useRouter();

  useEffect(() => {
    // User is an admin
    if (user?.isAdmin) {
      setAuthorized(true);
      return;
    }

    // User does not have admin access - return to home page and let access checks there kick-in
    setAuthorized(false);
    replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return authorized ? <>{children}</> : <Loading show size="lg" />;
};

export { AdminAccessGuard };
