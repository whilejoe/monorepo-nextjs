import { Header } from "ui/components/Layout";
import { Box } from "ui/components/Box";
import { NavLink } from "components/NavLink";
import { SideNav } from "components/SideNav";
import { UserAvatar } from "components/UserAvatar";
import { ActingPatientBanner } from "components/ActingPatientBanner";
import { LogoDesktop } from "components/LogoDesktop/LogoDesktop";
import { useNavLinks } from "hooks/useNavLinks";
import { navLink } from "./AppHeader.css";

const AppHeader = () => {
  const links = useNavLinks();

  return (
    <Header>
      <Box
        display="flex"
        gap="3x"
        flex="1"
        alignItems="center"
        justifyContent={{ xs: "space-between", md: "flex-start" }}
      >
        <SideNav links={links} />
        <LogoDesktop mr={{ md: "2x" }} />
        <Box
          as="nav"
          display={{ xs: "none", md: "flex" }}
          gap="1x"
          role="navigation"
        >
          {links.map((link) => {
            return <NavLink className={navLink} {...link} key={link.id} />;
          })}
        </Box>

        <Box ml={{ md: "auto" }}>
          <UserAvatar />
        </Box>
      </Box>
      <ActingPatientBanner />
    </Header>
  );
};

const AppHeaderSkeleton = () => {
  return <Header />;
};

export { AppHeader, AppHeaderSkeleton };
