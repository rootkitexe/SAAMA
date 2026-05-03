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
      if (event.title.includes('Workshop by Vid. Sriranjani')) {
          return { ...event, image: '/may 9-10_2.jpeg' };
      }
      if (event.title.includes('Violin Concert by Vid. Charumathi')) {
          return { ...event, image: '/may 23_2.jpeg' };
      }
      return event;
  });

  return (
    <div className="bg-[#faf5eb] py-12 md:py-20 px-4 sm:px-6 lg:px-8 w-full border-b border-[#d4c4a8]/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-0 mb-8 md:mb-14">
          {/* Left ornament — hidden on mobile */}
          <div className="hidden md:flex flex-1 items-center justify-end">
            <img src="/ornament-flourish.png?v=2" alt="" className="h-44 w-auto object-contain" style={{ transform: 'scaleX(-1)' }} />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#5c3a1e] whitespace-nowrap px-2">
            Upcoming Events
          </h2>

          {/* Right ornament — hidden on mobile */}
          <div className="hidden md:flex flex-1 items-center justify-start">
            <img src="/ornament-flourish.png?v=2" alt="" className="h-44 w-auto object-contain" />
          </div>
        </div>

        <UpcomingEventsGrid events={events} />
      </div>
    </div>
  );
}

