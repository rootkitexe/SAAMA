import { Calendar, Music, ArrowRight, BookOpen } from 'lucide-react';

export default function CompetitionsPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-black py-20 text-center text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
                    <div className="absolute top-20 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl"></div>
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-4">
                    <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl text-white">
                        2026 Competitions
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Showcasing excellence in Carnatic Music and Bharathanatyam.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar Navigation (Sticky) */}
                    <aside className="hidden lg:col-span-3 lg:block">
                        <nav className="sticky top-24 space-y-1">
                            <a href="#dates" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-white bg-white/10 border-l-4 border-primary">
                                <Calendar className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                                <span className="truncate">Important Dates</span>
                            </a>
                            <a href="#music" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                <Music className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300" />
                                <span className="truncate">Music Categories</span>
                            </a>
                            <a href="#dance" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                <span className="mr-3 h-5 w-5 flex items-center justify-center text-lg">💃</span>
                                <span className="truncate">Dance Categories</span>
                            </a>
                            <a href="#rules" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                <BookOpen className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300" />
                                <span className="truncate">Rules & Guidelines</span>
                            </a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-16">

                        {/* Important Dates (Modernized List) */}
                        <section id="dates" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Important Dates</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[
                                    { label: "Application Deadline", date: "February 20, 2026", desc: "Last day to submit entries." },
                                    { label: "Competition Dates", date: "April 1 - 12, 2026", desc: "Held at SAAMA Seattle center." },
                                    { label: "Prize Distribution", date: "April 12, 2026", desc: "4:00 PM - Main Auditorium" },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 hover:border-primary/50 transition-colors">
                                        <dt className="text-sm font-medium text-primary uppercase tracking-wider">{item.label}</dt>
                                        <dd className="mt-2 text-xl font-bold text-white">{item.date}</dd>
                                        <dd className="mt-1 text-sm text-gray-400">{item.desc}</dd>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Music Categories (Grid Layout) */}
                        <section id="music" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Music Competitions</h2>
                            <p className="text-gray-300 mb-6">
                                Our music competitions adhere to strict traditional standards. Categories are split by age and complexity.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {['Geetham', 'Varnam', 'Krithi', 'Manodharma', 'Pallavi', 'Group Krithi'].map((cat) => (
                                    <div key={cat} className="group relative rounded-lg border border-white/10 bg-black p-6 hover:bg-white/5 transition-all">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-secondary">{cat}</h3>
                                        <p className="mt-2 text-sm text-gray-400">
                                            View syllabus and age groups for {cat} category.
                                        </p>
                                        <div className="mt-4 flex items-center text-sm font-medium text-primary">
                                            View Details <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CTA Section */}
                        <div className="rounded-2xl bg-gradient-to-r from-primary to-[#500000] p-8 text-center sm:p-12 relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Compete?</h2>
                                <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/90">
                                    Create your profile on our new portal to manage registrations, view schedules, and check results.
                                </p>
                                <a
                                    href="/portal"
                                    className="mt-8 inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-bold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Register Now
                                </a>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
