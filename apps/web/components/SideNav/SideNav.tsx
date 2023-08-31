import { useState, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Button } from "ui/components/Button";
import { Box } from "ui/components/Box";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Drawer, Close } from "ui/components/Drawer";
import { NavLink, NavLinkProps } from "components/NavLink";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { toggle, sideNavLink } from "./SideNav.css";
import { useAuth0 } from "@auth0/auth0-react";

type SideNavProps = {
  links: NavLinkProps[];
  isPublic?: boolean;
};

const SideNav = ({ isPublic, links }: SideNavProps) => {
  const [open, setOpen] = useState(false);
  const isMedium = useMediaQuery("md");
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isMedium && open) setOpen(false);
  }, [isMedium, open]);

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
      title="Menu"
      hideTitle
      trigger={
        <button
          className={toggle}
          data-automation-hook="app-drawer-open-button"
        >
          <AccessibleIcon
            label="Open navigation menu"
            icon={<MdOutlineMenu size={26} />}
          />
        </button>
      }
    >
      <Box
        as="nav"
        display="flex"
        flexDirection="column"
        gap="2x"
        role="navigation"
        mb="4x"
      >
        {links?.map((link) => {
          return (
            <Close key={link.id} asChild>
              <NavLink className={sideNavLink} {...link} />
            </Close>
          );
        })}
      </Box>
      {isPublic && <Button onClick={() => loginWithRedirect()}>Login</Button>}
    </Drawer>
  );
};

export { SideNav };
