export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-black to-black py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            SAAMA <span className="text-primary font-serif italic text-gold-400">Seattle</span> Festival
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Celebrating the rich tradition of Indian Classical Music & Dance.
            Join us for the 2026 Season from <strong>April 1st to April 12th</strong>.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/competitions"
              className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              View Competitions
            </a>
            <a href="#about" className="text-sm font-semibold leading-6 text-white group">
              Learn more <span aria-hidden="true" className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Announcements */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
            <h3 className="text-xl font-bold text-white">Announcements</h3>
            <p className="mt-4 text-gray-400">
              Music and Dance competition results from 2025 are now available.
            </p>
            <a href="#" className="mt-4 inline-block text-sm font-medium text-primary hover:text-red-400">
              View Results &rarr;
            </a>
          </div>

          {/* Accommodations */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
            <h3 className="text-xl font-bold text-white">Accommodations</h3>
            <p className="mt-4 text-gray-400">
              Special rates available at partner hotels for festival attendees.
            </p>
            <a href="#" className="mt-4 inline-block text-sm font-medium text-primary hover:text-red-400">
              Book Hotel &rarr;
            </a>
          </div>

          {/* Visitor Guide */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
            <h3 className="text-xl font-bold text-white">Visitor Guide</h3>
            <p className="mt-4 text-gray-400">
              First time? Download our comprehensive guide to navigating the festival.
            </p>
            <a href="#" className="mt-4 inline-block text-sm font-medium text-primary hover:text-red-400">
              Download PDF &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
