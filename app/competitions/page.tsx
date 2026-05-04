import Link from 'next/link';

export default function CompetitionsPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen">
            {/* Hero */}
            <div className="bg-[#3d230d] py-16 text-center border-b-4 border-[#5c3a1e]">
                <h1 className="text-4xl font-serif font-bold text-white">Sadhana Carnatic Music Competition</h1>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-[#5c3a1e]">

                <p className="text-[17px] leading-relaxed mb-8">
                    Sadhana Academy for Musical Arts will conduct an online Carnatic music competition via Zoom.
                </p>

                {/* Key Dates */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#d4c4a8] pb-2">Key Dates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <div className="text-xs uppercase tracking-wider text-[#3d230d] font-bold mb-1">Application Deadline</div>
                            <div className="text-xl font-bold">May 29, 2026</div>
                            <p className="text-sm text-[#7a5c3a] mt-1">All entries must be submitted and paid in full by this date. No changes allowed after the deadline.</p>
                        </div>
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <div className="text-xs uppercase tracking-wider text-[#3d230d] font-bold mb-1">Competition Dates</div>
                            <div className="text-xl font-bold">May 30 – June 13, 2026</div>
                            <p className="text-sm text-[#7a5c3a] mt-1">Weekends between these dates, conducted via Zoom.</p>
                        </div>
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <div className="text-xs uppercase tracking-wider text-[#3d230d] font-bold mb-1">Prize Distribution</div>
                            <div className="text-xl font-bold">June 21, 2026</div>
                            <p className="text-sm text-[#7a5c3a] mt-1">At the Aaroha Carnatic Music Festival.</p>
                        </div>
                    </div>
                </section>

                {/* Registering */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#d4c4a8] pb-2">Registering</h2>
                    <p className="text-[16px] leading-relaxed mb-4">
                        Create a profile for each participant, log in, select the categories they wish to enter, and submit
                        the application with payment online. Please review category rules and eligibility before proceeding.
                    </p>
                    <Link href="/portal/register" className="inline-block bg-[#3d230d] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#2a1809] transition-colors shadow-sm">
                        Proceed to Registration →
                    </Link>
                </section>

                {/* Competition Guidelines */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#d4c4a8] pb-2">Competition Guidelines</h2>
                    
                    <div className="space-y-6">

                        {/* 1. Eligibility */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Eligibility</h3>
                            <p className="text-[15px]">
                                This competition is open only to participants from <strong>Washington</strong> and <strong>Oregon</strong>. This competition is open to vocal performances only.
                            </p>
                        </div>

                        {/* 2. Mode of Competition */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Mode of Competition</h3>
                            <p className="text-[15px] text-[#5c3a1e]">
                                The competition will be conducted online via Zoom. Registered participants will receive the
                                meeting details prior to the event.
                            </p>
                        </div>

                        {/* 3. Categories */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Categories</h3>
                            <p className="text-[15px] text-[#5c3a1e] mb-3">
                                The competition will feature the following categories:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {['Geetham', 'Varṇam', 'Kriti', 'Thillana', 'Viruttham', 'Raga Alapana', 'Swarams'].map(cat => (
                                    <div key={cat} className="bg-white/80 border border-[#d4c4a8] rounded-lg px-4 py-3 text-center font-semibold shadow-sm">
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Age Categories */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Age Categories</h3>
                            <p className="text-[15px] mb-3">There will be three age groups:</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-[#3d230d]">5–9</div>
                                    <div className="font-semibold mt-1">Sub-Junior</div>
                                </div>
                                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-[#3d230d]">10–14</div>
                                    <div className="font-semibold mt-1">Junior</div>
                                </div>
                                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-[#3d230d]">15–18</div>
                                    <div className="font-semibold mt-1">Senior</div>
                                </div>
                            </div>
                            <p className="text-sm text-[#7a5c3a] mt-2 italic">(Age will be calculated as of May 1.)</p>
                            <div className="mt-4 bg-[#f5efe3] border border-[#d4c4a8] rounded-lg p-4 text-[15px] space-y-2">
                                <p>Sub-Junior category participants may compete only in <strong>Geetham</strong> and <strong>Varnam</strong> categories.</p>
                                <p>Junior and Senior category participants may compete in <strong>Kriti</strong>, <strong>Thillana</strong>, <strong>Viruttham</strong>, <strong>Alapana</strong>, and <strong>Swarams</strong>.</p>
                            </div>
                        </div>

                        {/* 5. Performance Selection, Duration and Shruti/Pitch */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Performance Selection, Duration and Shruti / Pitch</h3>
                            <div className="space-y-3 text-[15px]">
                                <p>The judges will select one of the submitted entries for performance.</p>
                                <p><strong>Performance Duration:</strong> Five to eight minutes, strictly enforced.</p>
                                <p><strong>Shruti / Pitch:</strong> Participants must bring their own shruti box or electronic shruti device.</p>
                            </div>
                        </div>

                        {/* 6. Awards */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Awards</h3>
                            <p className="text-[15px]">Three prize winners and three special mention recognitions.</p>
                        </div>

                        {/* 7. Entry Fee */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Entry Fee</h3>
                            <p className="text-[15px]"><strong className="text-[#3d230d] text-xl">US $35</strong> per entry per category.</p>
                        </div>

                        {/* 8. Judging */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Judging</h3>
                            <p className="text-[15px]">The decision of the judges will be final and binding.</p>
                        </div>
                    </div>
                </section>

                {/* Repertoire Submission Guidelines */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#d4c4a8] pb-2">Repertoire Submission Guidelines</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <h4 className="font-bold mb-2">Geetham, Varnam, Kriti, Thillana, and Swarams Categories</h4>
                            <p className="text-[15px] mb-3">The participants must indicate the compositions they have prepared in the application form.</p>
                            <ul className="list-disc pl-6 space-y-1 text-[15px]">
                                <li><strong>Senior Category:</strong> Submit (3) entries</li>
                                <li><strong>Junior Category:</strong> Submit (3) entries</li>
                                <li><strong>Sub-Junior Category:</strong> Submit (2) entries</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <h4 className="font-bold mb-2">Viruttham Category</h4>
                            <p className="text-[15px] mb-2">
                                Participants must submit one (1) viruttham that they have prepared.
                            </p>
                            <p className="text-[15px]">
                                The viruttham may include a minimum of two (2) ragas and a maximum of (4) ragas.
                            </p>
                        </div>

                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <h4 className="font-bold mb-2">Alapana Category</h4>
                            <p className="text-[15px]">
                                Participants must submit three (3) ragas in their application. The judging panel will select one
                                of the submitted ragas for the participant to present.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="rounded-xl bg-[#3d230d] p-8 text-center text-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 font-serif">Ready to Compete?</h2>
                    <p className="mb-6 text-white/80">
                        The completed registration application and the associated entry fee must be received by <strong>May 29, 2026</strong>.
                    </p>
                    <Link href="/portal/register" className="inline-block bg-white text-[#3d230d] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                        Register Now →
                    </Link>
                </div>
            </div>
        </div>
    );
}
