"use client"
export default function Footer() {
  const year = new Date();
  return (
    <footer className="mt-20 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <h2 className="font-[var(--font-newsreader)] text-2xl font-bold">
              NEWS<span className="text-[var(--accent)]">.</span>
            </h2>

            <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
              Independent journalism, breaking news and stories that matter.
            </p>
          </div>

          <p className="text-sm text-[var(--muted)]">
            © {year.getFullYear()} News Channel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}