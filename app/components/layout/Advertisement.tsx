import Image from "next/image";
import Link from "next/link";

const Advertisement = () => {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <Link href={"!#"} className="relative h-[90px] w-[728px] overflow-hidden">
        <Image
          src="/images/advertisemnt.png"
          alt="Advertisement"
          fill
          sizes="728px"
          className="object-cover"
        />
      </Link>
    </div>
  );
};

export default Advertisement;