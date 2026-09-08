import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

interface LinkButtonProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const LinkButton = ({
  href,
  children,
  className = "",
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-[16px] justify-center  bg-accent px-4 h-full text-sm font-medium !text-white transition-colors hover:text-accent ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;