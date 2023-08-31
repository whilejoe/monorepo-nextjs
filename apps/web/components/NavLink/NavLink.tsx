import { forwardRef } from "react";
import { clsx } from "clsx";
import { ActiveLink, ActiveLinkProps } from "components/ActiveLink";
import { active, link } from "./NavLink.css";

export type NavLinkProps = ActiveLinkProps;

const NavLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ActiveLink
      {...rest}
      ref={ref}
      activeClassName={active}
      className={clsx(link, className)}
    />
  );
});

NavLink.displayName = "NavLink";

export { NavLink };
