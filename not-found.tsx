import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">
        404 Error
      </span>
      <h1 className="mt-3 text-5xl font-bold text-foreground">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-gray-500">
        The page you're looking for doesn't exist or may have been moved. Let's
        get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
