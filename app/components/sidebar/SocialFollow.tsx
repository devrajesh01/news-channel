import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

export default function SocialFollow() {
  return (
    <div className="border border-[var(--border)] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
        Follow Us
      </h3>
      <div className="mt-4 flex gap-2">
        {socials.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Icon className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}