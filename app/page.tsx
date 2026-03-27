import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 0; // Ensures the homepage shows fresh events

export default async function Home() {
  const supabase = await createClient();
  
  const { data: upcomingEvents, error } = await supabase
      .from('upcoming_events')
      .select('*')
      .order('id', { ascending: false });

  if (error) {
      console.error("Error fetching homepage events:", error);
  }

  const events = upcomingEvents || [];

  return (
    <div className="bg-[#faf5eb] py-20 px-4 sm:px-6 lg:px-8 w-full border-b border-[#d4c4a8]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center font-bold text-[#3d230d] mb-14 relative">
          <span className="bg-[#faf5eb] px-8 relative z-10 text-[#5c3a1e]">Upcoming Events</span>
          <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-[#d4c4a8] -z-0"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d4c4a8] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative border-b border-[#d4c4a8]/50">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="font-serif font-bold text-xl text-[#3d230d] mb-4 leading-snug line-clamp-3" title={event.title}>
                  {event.title}
                </h3>
                <div className="mt-auto space-y-3">
                  <p className="text-[14px] text-[#7a5c3a] font-medium flex items-start gap-2.5">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {event.date}
                  </p>
                  <p className="text-[14px] text-[#7a5c3a] flex items-start gap-2.5">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event.venue}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

