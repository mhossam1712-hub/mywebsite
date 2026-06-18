export default function Loading() {
  return (
    <div className="animate-pulse bg-gray-50 py-12 dark:bg-gray-900 md:py-24">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
            <div className="h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
