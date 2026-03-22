import Link from 'next/link';

export default function CompetitionsPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen">
            {/* Hero */}
            <div className="bg-[#8b0a30] py-16 text-center border-b-4 border-[#5c3a1e]">
                <h1 className="text-4xl font-serif font-bold text-white">The Music Competition</h1>
                <p className="mt-3 text-[#ffd700] text-lg font-serif italic">2026 Season</p>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-[#5c3a1e]">

                <p className="text-[17px] leading-relaxed mb-8">
                    SaaMa will conduct an online Carnatic music competition via Zoom.
                </p>

                {/* Key Dates */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#d4c4a8] pb-2">Key Dates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <div className="text-xs uppercase tracking-wider text-[#8b0a30] font-bold mb-1">Application Deadline</div>
                            <div className="text-xl font-bold">May 14, 2026</div>
                            <p className="text-sm text-[#7a5c3a] mt-1">All entries must be submitted and paid in full by this date. No changes allowed after the deadline.</p>
                        </div>
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <div className="text-xs uppercase tracking-wider text-[#8b0a30] font-bold mb-1">Competition Dates</div>
                            <div className="text-xl font-bold">May 30 – June 13, 2026</div>
                            <p className="text-sm text-[#7a5c3a] mt-1">Weekends between these dates, conducted via Zoom.</p>
                        </div>
                        <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 shadow-sm">
                            <div className="text-xs uppercase tracking-wider text-[#8b0a30] font-bold mb-1">Prize Distribution</div>
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
                    <Link href="/portal/register" className="inline-block bg-[#8b0a30] text-white font-bold py-3 px-8 rounded-md hover:bg-[#6a0822] transition-colors shadow-sm">
                        Proceed to Registration →
                    </Link>
                </section>

                {/* Competition Guidelines */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#d4c4a8] pb-2">Competition Guidelines</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Mode of Competition</h3>
                            <p className="text-[15px] text-[#5c3a1e]">
                                The competition will be conducted online via Zoom. Registered participants will receive the
                                meeting details prior to the event.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">Categories</h3>
                            <p className="text-[15px] text-[#5c3a1e] mb-3">
                                The competition will feature the following categories:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {['Geetham', 'Varṇam', 'Krithi', 'Thillana', 'Viruttham', 'Raga Alapana'].map(cat => (
                                    <div key={cat} className="bg-white/80 border border-[#d4c4a8] rounded-lg px-4 py-3 text-center font-semibold shadow-sm">
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">Repertoire Submission Guidelines</h3>
                            
                            <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 mb-4 shadow-sm">
                                <h4 className="font-bold mb-2">Geetham, Varnam, Krithi, and Thillana Categories</h4>
                                <p className="text-[15px] mb-3">Participants must indicate the pieces they have prepared in the application form.</p>
                                <ul className="list-disc pl-6 space-y-1 text-[15px]">
                                    <li><strong>Senior Category:</strong> Submit four (4) krithis</li>
                                    <li><strong>Junior Category:</strong> Submit three (3) krithis</li>
                                    <li><strong>Sub-Junior Category:</strong> Submit one (1) krithi</li>
                                </ul>
                                <p className="text-sm text-[#7a5c3a] mt-3">
                                    These selections will be used by the judges to determine the piece to be presented during the competition.
                                </p>
                            </div>

                            <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-5 mb-4 shadow-sm">
                                <h4 className="font-bold mb-2">Viruttham Category</h4>
                                <p className="text-[15px]">
                                    Participants must submit one (1) viruttham that they have prepared. The viruttham may
                                    include a maximum of four (4) ragas.
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

                        <div>
                            <h3 className="font-bold text-lg mb-2">Eligibility</h3>
                            <p className="text-[15px]">
                                This competition is open only to participants from <strong>Washington</strong> and <strong>Oregon</strong>.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">Age Categories</h3>
                            <p className="text-[15px] mb-3">There will be three age groups:</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-[#8b0a30]">6–9</div>
                                    <div className="font-semibold mt-1">Sub-Junior</div>
                                </div>
                                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-[#8b0a30]">10–14</div>
                                    <div className="font-semibold mt-1">Junior</div>
                                </div>
                                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 text-center shadow-sm">
                                    <div className="text-2xl font-bold text-[#8b0a30]">15–18</div>
                                    <div className="font-semibold mt-1">Senior</div>
                                </div>
                            </div>
                            <p className="text-sm text-[#7a5c3a] mt-2 italic">(Age will be calculated as of May 1.)</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Awards</h3>
                                <p className="text-[15px]">Three prize winners and three special mention recognitions.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Entry Fee</h3>
                                <p className="text-[15px]"><strong className="text-[#8b0a30] text-xl">US $35</strong> per entry per category.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">Submission Requirements</h3>
                            <p className="text-[15px]">
                                All applicants must submit three (3) compositions for each category they are participating in,
                                along with the rāga, tāla, and composer for each composition.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">Performance Selection</h3>
                            <p className="text-[15px]">
                                The judges will select one of the submitted kṛtis for performance. Contestants must be
                                prepared to perform either piece. If the contestant is unable to perform the selected piece, he or
                                she may be disqualified.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Performance Duration</h3>
                                <p className="text-[15px]">Five to eight minutes, strictly enforced.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Shruti / Pitch</h3>
                                <p className="text-[15px]">Participants must bring their own shruti box or electronic shruti device.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">Judging</h3>
                            <p className="text-[15px]">The decision of the judges will be final and binding.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="rounded-xl bg-[#8b0a30] p-8 text-center text-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 font-serif">Ready to Compete?</h2>
                    <p className="mb-6 text-white/80">
                        The completed registration application and the associated entry fee must be received by <strong>May 14, 2026</strong>.
                    </p>
                    <Link href="/portal/register" className="inline-block bg-white text-[#8b0a30] font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors shadow-sm">
                        Register Now →
                    </Link>
                </div>
            </div>
        </div>
    );
}
