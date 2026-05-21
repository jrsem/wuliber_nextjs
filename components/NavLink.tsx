import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}

const NavLink = ({ className, href, children, ...props }: NavLinkProps) => (
  <Link href={href} className={cn(className)} {...props}>
    {children}
  </Link>
);

export { NavLink };
