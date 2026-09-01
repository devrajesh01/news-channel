// app/news/[slug]/loading.tsx
function Loading() {
  return (
    <div className="site-container mx-auto py-10 animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded" /> {/* category badge */}
      <div className="mt-4 h-10 w-3/4 bg-gray-200 rounded" /> {/* title */}
      <div className="mt-6 aspect-[16/9] w-full bg-gray-200 rounded" />{" "}
      {/* featured image */}
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
export default Loading;
