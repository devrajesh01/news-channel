import React from 'react'

const loading = () => {
  return (
     <div className="site-container mx-auto animate-pulse py-10">
      {/* Featured post skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/2] w-full rounded-md bg-gray-200" />
          <div className="mt-5 space-y-3">
            <div className="h-5 w-20 rounded bg-gray-200" /> {/* category badge */}
            <div className="h-8 w-3/4 rounded bg-gray-200" /> {/* title */}
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>
        </div>

        {/* Small posts grid skeleton */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[16/9] w-full rounded-md bg-gray-200" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default loading