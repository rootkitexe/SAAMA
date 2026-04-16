import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import UpcomingEventsGrid from './components/UpcomingEventsGrid';

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

  const events = (upcomingEvents || []).map(event => {
      if (event.title.includes('Aaroha Carnatic')) {
          return { ...event, image: '/aaroha-highlight.jpg' };
      }
      return event;
  });

  return (
    <div className="bg-[#faf5eb] py-20 px-4 sm:px-6 lg:px-8 w-full border-b border-[#d4c4a8]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center font-bold text-[#3d230d] mb-14 relative">
          <span className="bg-[#faf5eb] px-8 relative z-10 text-[#5c3a1e]">Upcoming Events</span>
          <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-[#d4c4a8] -z-0"></div>
        </h2>

        <UpcomingEventsGrid events={events} />
      </div>
    </div>
  );
}

