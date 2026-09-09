import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`shrink-0 items-center gap-3 ${className}`}
      aria-label="News Channel home"
    >
      <Image
        src="/images/brand-logo.png"
        alt="NewsWala Logo"
        width={180}
        height={45}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </Link>
  );
};

export default Logo;