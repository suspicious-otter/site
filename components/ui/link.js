import Link from "next/link";

import getPage from "utils/get-page";
import * as colors from "utils/colors";

export function InternalLink({
  children,
  href,
  as,
  prefetch = false,
  ...props
}) {
  return (
    <Link href={href} as={as} prefetch={prefetch}>
      <a {...props}>
        {children}
        <style jsx>{`
          a {
            color: ${colors.black};
            text-decoration: none;
          }
        `}</style>
      </a>
    </Link>
  );
}

export function ExternalLink({ children, href, ...props }) {
  return (
    <a target="_blank" rel="noopener nofollow" {...props}>
      {children}
      <style jsx>{`
        a {
          color: ${colors.black};
          text-decoration: none;
        }
      `}</style>
    </a>
  );
}

export function Anchor({ as, ...props }) {
  if (as) return <InternalLink as={as} {...props} />;
  return <ExternalLink {...props} />;
}
