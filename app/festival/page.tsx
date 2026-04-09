import { MapPin } from 'lucide-react';

export default function FestivalPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen">
            <div className="bg-[#3d230d] py-16 text-center border-b-4 border-[#5c3a1e]">
                <h1 className="text-4xl font-serif font-bold text-white">Aaroha Carnatic Music Festival</h1>
                <p className="mt-3 text-[#ffd700] text-lg font-serif italic">2026</p>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-[#5c3a1e]">

                {/* Description & Highlights */}
                <div className="mb-12">
                    <div className="bg-white rounded-2xl p-8 border border-[#d4c4a8] shadow-sm mb-12">
                        <p className="text-[#5c3a1e] font-serif text-lg leading-relaxed mb-6">
                            SaaMa, in partnership with <strong>Tapasya School of Music</strong> (led by Vid. Sriranjani Santhanagopalan), presents the Aaroha Carnatic Music Festival. Join us for a deeply immersive two-day celebration of Carnatic music honoring its rich heritage, timeless compositions, and intricate rhythms through inspiring performances and soulful renditions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 text-[#3d230d] font-bold border-t border-[#d4c4a8]/50 pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#faf5eb] rounded border border-[#d4c4a8]/50 shrink-0">
                                    <MapPin className="w-5 h-5 text-[#7a5c3a]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-[#7a5c3a]">Date & Time</span>
                                    <span>June 20–21, 2026 | 9 AM – 9 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-8 border-b border-[#d4c4a8] pb-4">Festival Highlights</h2>
                    <ul className="space-y-5 text-[#7a5c3a] font-medium leading-relaxed bg-[#faf5eb] p-8 rounded-2xl border border-[#d4c4a8]">
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>Curated thematic concerts by local talent and emerging young artists from across the United States</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>“Nadarnava” Ensemble, curated by Vid. Arun Prakash, conducted by Shri. Subramanian Janardanan, presented by Pacific Northwest talent</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>Carnatic music trivia conducted by Vid. Sriranjani Tapasya Santhanagopalan</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>Screening of the award-winning documentary "Colonial Interlude" on the Indo-colonial music of Muthuswami Dikshitar, directed by musicologist Dr. Kanniks Kannikeswaran</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>Live Zoom Q&A with musicologist Dr. Kanniks Kannikeswaran</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>“Timeless Gems of the Trinity” workshop, curated by Vid. Sriranjani Tapasya Santhanagopalan, presented by participants</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>Carnatic Music Competition Awards Ceremony</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-2 w-2 h-2 rounded-full bg-[#5c3a1e] shrink-0"></div>
                            <span>Grand finale concert by Vid. Sriranjani Tapasya Santhanagopalan, accompanied by Vid. Kamala Kiran on the Violin, Vid. Sumesh Narayanan on the Mridangam.</span>
                        </li>
                    </ul>
                </div>

                {/* Festival Stats */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {[
                        "20+ Hours of Music", 
                        "80+ Participants", 
                        "70+ Ragas", 
                        "60+ Compositions", 
                        "15+ Themes"
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-[#3d230d] text-[#faf5eb] px-5 py-2.5 rounded-full font-serif font-bold text-sm shadow-sm border border-[#5c3a1e] hover:bg-[#5c3a1e] transition-colors cursor-default whitespace-nowrap">
                            {stat}
                        </div>
                    ))}
                </div>

                {/* Venue Info */}
                <div className="mb-12 rounded-xl bg-white/80 p-6 flex items-center gap-4 border border-[#d4c4a8] shadow-sm">
                    <div className="p-3 bg-[#3d230d]/10 rounded-full text-[#3d230d] shrink-0">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[#5c3a1e]">Venue</h3>
                        <p className="text-[#7a5c3a]">Kane Hall, University of Washington, Seattle</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
