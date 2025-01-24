import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen flex items-center dotted-lg justify-center bg-muted dark:bg-muted/90 w-full px-6 md:px-12 text-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col items-center justify-center space-y-6 bg-card px-4 py-8 rounded-[2.5rem] border-primary/25 border-2 shadow-xl -rotate-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            It seems you've taken a wrong turn. The page you're looking for
            doesn't exist or might have been moved. Let's get you back on track!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-accent text-accent-foreground rounded-lg shadow hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
        <div className="flex justify-center">
          <img
            src="https://i.giphy.com/xRvMWkuZt2ChfdtdUv.webp"
            alt="Lost and Searching"
            className="object-contain max-h-96"
          />
        </div>
      </div>
    </section>
  );
}
