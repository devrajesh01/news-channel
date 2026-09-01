export default function NewsletterWidget() {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
        Stay Updated
      </h3>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Get top stories delivered straight to your inbox.
      </p>
      <form className="mt-4 flex flex-col gap-2">
        <input
          type="email"
          required
          placeholder="Your email address"
          aria-label="Email address"
          className="h-10 rounded-full border border-[var(--border)] bg-transparent px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
        />
        <button
          type="submit"
          className="h-10 rounded-full bg-[var(--accent)] text-sm font-semibold text-white transition hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}