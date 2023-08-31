import { Header } from "ui/components/Layout";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { NavLink } from "components/NavLink";
import { SideNav } from "components/SideNav";
import { LogoDesktop } from "components/LogoDesktop/LogoDesktop";
import { navLink } from "components/AppHeader";
import { usePublicNavLinks } from "hooks/usePublicNavLinks";
import { useAuth0 } from "@auth0/auth0-react";

const AppHeaderPublic = () => {
  const links = usePublicNavLinks();
  const { loginWithRedirect } = useAuth0();

  return (
    <Header>
      <Box
        display="flex"
        gap="3x"
        flex="1"
        alignItems="center"
        justifyContent={{ xs: "space-between", md: "flex-start" }}
      >
        <SideNav isPublic links={links} />
        <LogoDesktop mr={{ md: "2x" }} />
        <Box
          as="nav"
          display={{ xs: "none", md: "flex" }}
          gap="1x"
          role="navigation"
          justifyContent="space-between"
          flex="1"
        >
          {links.map((link) => {
            return <NavLink className={navLink} {...link} key={link.id} />;
          })}
          <Button onClick={() => loginWithRedirect()}>Login</Button>
        </Box>
      </Box>
    </Header>
  );
};

const AppHeaderPublicSkeleton = () => {
  return <Header />;
};

export { AppHeaderPublic, AppHeaderPublicSkeleton };
