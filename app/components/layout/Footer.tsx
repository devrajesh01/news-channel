import { getCategories } from "@/app/lib/api/posts";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default async function Footer() {
  const year = new Date().getFullYear();
  const categories = await getCategories();

  return (
    <footer className="mt-20  border-t border-[var(--border)] bg-[var(--background)]">
      <div className="site-container py-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-[var(--font-newsreader)] text-2xl font-bold text-[var(--foreground)]">
              NEWS<span className="text-[var(--accent)]">.</span>
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--muted)]">
              Independent journalism, breaking news and stories that matter —
              delivered fast, reported fair.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaFacebookF className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaYoutube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Get the day's top stories delivered to your inbox.
            </p>
            <form className="mt-4 flex items-center gap-2 relative">
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email address"
                className="h-10 w-full rounded-full border border-[var(--border)] px-4 !pr-[50px] bg-transparent  text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                className="shrink-0 h-10  absolute right-0 rounded-full bg-[var(--accent)] px-8 cursor-pointer py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-sm text-[var(--muted)] sm:flex-row">
          <p>© {year} News Channel. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="transition hover:text-[var(--accent)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[var(--accent)]">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="transition hover:text-[var(--accent)]">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}