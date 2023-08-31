import { forwardRef, useMemo } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import { parse } from "regexparam";

export interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  id: string;
  children?: React.ReactNode;
  className?: string;
  loose?: boolean;
}

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  (props, ref) => {
    const {
      activeClassName = "",
      as,
      children,
      className,
      loose = false,
      href,
      ...rest
    } = props;

    const { asPath } = useRouter();

    const isActive = useMemo(() => {
      const linkPathname = new URL((as || href) as string, location.href)
        .pathname;

      // Strip query from path
      const pathToMatch = asPath.split("?")[0];

      return parse(linkPathname, loose).pattern.test(pathToMatch);
    }, [as, asPath, loose, href]);

    return (
      <Link
        {...rest}
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        as={as}
        className={clsx(className, { [activeClassName]: isActive })}
        href={href}
      >
        {children}
      </Link>
    );
  }
);

ActiveLink.displayName = "ActiveLink";

export { ActiveLink };
