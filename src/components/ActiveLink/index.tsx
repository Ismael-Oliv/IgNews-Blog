import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeCalssName: string;
}

export function ActiveLink({
  children,
  activeCalssName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeCalssName : "";

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
}
