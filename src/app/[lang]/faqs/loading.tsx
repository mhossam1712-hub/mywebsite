export default function Loading() {
  return (
    <div className="animate-pulse bg-white px-3 py-12 dark:bg-gray-900 sm:px-4 sm:py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col items-center gap-3 sm:mb-12">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-9 w-64 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-80 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg border border-cyan-100 bg-white/90 dark:border-cyan-900/60 dark:bg-gray-950/60" />
          ))}
        </div>
      </div>
    </div>
  );
}
