import Image from "next/image";
import Link from "next/link";
import React from "react";

const Adds = () => {
  return (
    <div className="flex h-[80px] w-full items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
          N
        </div>

        <span className="font-editorial text-2xl font-bold tracking-tight">
          NEWS<span className="text-accent">.</span>
        </span>
      </Link>

      {/* Advertisement */}
      <Link href="#" className="relative block h-[60px] w-[728px]">
        <Image
          src="/images/ad-banner.jpg"
          alt="Advertisement"
          fill
          className="object-cover"
        />
      </Link>
    </div>
  );
};

export default Adds;