import { MapPin } from 'lucide-react';

export default function FestivalPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen">
            <div className="bg-[#3d230d] py-16 text-center border-b-4 border-[#5c3a1e]">
                <h1 className="text-4xl font-serif font-bold text-white">Aaroha Carnatic Music Festival</h1>
                <p className="mt-3 text-[#ffd700] text-lg font-serif italic">2026</p>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-[#5c3a1e]">

                {/* Description */}
                <div className="mb-12">
                    <p className="text-[17px] leading-relaxed">
                        SaaMa presents the <strong>2026 Aaroha Carnatic Music Festival</strong>, to be held on 
                        <strong> June 20 and 21</strong> at <strong>Kane Hall, University of Washington, Seattle</strong>, 
                        featuring outstanding local artists and young, emerging talents from across the United States.
                        The full schedule will be announced soon.
                    </p>
                </div>

                {/* Venue Info */}
                <div className="mb-12 rounded-xl bg-white/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#d4c4a8] shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#3d230d]/10 rounded-full text-[#3d230d]">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#5c3a1e]">Venue</h3>
                            <p className="text-[#7a5c3a]">Kane Hall, University of Washington, Seattle</p>
                        </div>
                    </div>
                    <div className="text-right text-[#3d230d] font-bold">
                        <div className="text-2xl">June 20–21</div>
                        <div className="text-sm text-[#7a5c3a]">2026</div>
                    </div>
                </div>

                {/* Schedule Placeholder */}
                <div className="rounded-xl bg-white/80 border border-[#d4c4a8] p-8 text-center shadow-sm">
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Schedule</h2>
                    <p className="text-[#7a5c3a] text-lg">
                        The full schedule of events and performances will be announced soon. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    );
}

