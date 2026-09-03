// app/news/[slug]/loading.tsx
function Loading() {
  return (
    <div className="site-container mx-auto grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_320px]">
      {/* Main Content */}
      <div className="animate-pulse">
        <div className="h-6 w-24 rounded bg-gray-200" />
        <div className="mt-4 h-10 w-3/4 rounded bg-gray-200" />
        <div className="mt-6 aspect-[16/9] w-full rounded bg-gray-200" />

        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="animate-pulse">
        <div className="h-7 w-40 rounded bg-gray-200" />
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="mt-6 flex gap-4">
            <div className="h-20 w-24 shrink-0 rounded bg-gray-200" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
export default Loading;
