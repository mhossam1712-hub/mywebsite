export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-medical-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
