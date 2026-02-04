import { MapPin, Clock } from 'lucide-react';

const SCHEDULE = [
    { day: "April 1, 2026", event: "Inaugural Concert", time: "6:00 PM", artist: "Vidwan T.M. Krishna" },
    { day: "April 2, 2026", event: "Pancharatna Group Singing", time: "9:00 AM", artist: "Community Event" },
    { day: "April 3-5, 2026", event: "Music Competitions", time: "All Day", artist: "Various Venues" },
    { day: "April 6-9, 2026", event: "Dance Competitions", time: "All Day", artist: "Main Auditorium" },
    { day: "April 10, 2026", event: "Special Dance Drama", time: "7:00 PM", artist: "Kalakshetra Troupe" },
    { day: "April 11, 2026", event: "Grand Finale Concert", time: "5:00 PM", artist: "Ranjani & Gayathri" },
    { day: "April 12, 2026", event: "Prize Distribution", time: "4:00 PM", artist: "Chief Guest" },
];

export default function FestivalPage() {
    return (
        <div className="bg-background min-h-screen">
            <div className="bg-primary/10 py-16 text-center border-b border-white/10">
                <h1 className="text-4xl font-serif font-bold text-white">The Festival</h1>
                <p className="mt-4 text-gray-400">Join us for 12 days of divine music and dance.</p>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Venue Info */}
                <div className="mb-12 rounded-xl bg-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-full text-primary">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Main Venue</h3>
                            <p className="text-gray-400">Seattle Center, Fisher Pavilion</p>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary hover:text-white transition-colors">
                        Get Directions &rarr;
                    </a>
                </div>

                {/* Schedule List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white mb-6">2026 Schedule Highlights</h2>
                    {SCHEDULE.map((item, idx) => (
                        <div key={idx} className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-white/10 bg-black/50 p-6 hover:bg-white/5 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary ring-1 ring-inset ring-secondary/20">
                                        {item.day}
                                    </span>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="mr-1 h-3 w-3" />
                                        {item.time}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                                    {item.event}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">{item.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
