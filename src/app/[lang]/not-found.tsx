const homepageUrl = 'https://abdallaeyeclinic.com';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-gray-50 px-4 py-16 transition-colors duration-200 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
          404
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-gray-950 dark:text-white sm:text-5xl">
          We could not find that page
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-700 dark:text-gray-300">
          Sorry, the page you are looking for may have moved or no longer exists. You can return to the Abdalla Eye Clinic homepage and continue from there.
        </p>
        <a
          href={homepageUrl}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-700 px-6 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-cyan-600 dark:hover:bg-cyan-500 dark:focus:ring-offset-gray-900"
        >
          Back to homepage
        </a>
      </div>
    </section>
  );
}
