import Image from "next/image";
import Link from "next/link";

const Advertisement = () => {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <Link href={"!#"} className="relative h-[83px] w-[728px] overflow-hidden">
        <Image
          src="/images/advertisemnt.png"
          alt="Advertisement"
          fill
          sizes="728px"
          className="object-cover"
          loading="eager"          
        />
      </Link>
    </div>
  );
};

export default Advertisement;