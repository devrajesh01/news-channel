type AuthorCardProps = {
  author: string;
};

export default function AuthorCard({ author }: AuthorCardProps) {
  const initials = author
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="border border-[var(--border)] p-5 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">
        {initials}
      </div>
      <h3 className="mt-3 font-semibold text-[var(--foreground)]">{author}</h3>
      <p className="mt-1 text-xs text-[var(--muted)]">Contributing Writer</p>
    </div>
  );
}