'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Check initial state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="flex flex-col w-full rounded-t-lg overflow-visible shrink-0 relative z-[100]">
      {/* Banner Section */}
      <div className="flex bg-[#e2be93] h-[340px] items-stretch">
        {/* Left: Info */}
        <div className="w-[35%] p-6 flex flex-col justify-start text-black">
          <div className="mb-2 w-full flex justify-center h-[130px]">
              <img src="/logo.png" alt="Logo" className="h-full object-contain mix-blend-multiply drop-shadow-sm" />
          </div>
          <h1 className="text-[26px] font-serif tracking-tight leading-none mb-1 text-center">
            SaaMa
          </h1>
          <p className="text-[11px] text-center text-black/70 mb-2 font-sans">
            Sadhana Academy for Musical Arts
          </p>
          <p className="text-[11px] text-center text-[#8b0000] italic mb-3 font-serif">
            Celebrating Sādhana, Tradition, and the Next Generation.
          </p>
          <p className="text-[11px] leading-[1.4] text-justify text-black/80 font-serif">
            SaaMa — Sadhana Academy for Musical Arts is a 501(c)(3) non-profit organization
            dedicated to nurturing and sustaining the living tradition of Indian classical music.
            Through concerts, workshops, mentorship, and community initiatives, we seek to inspire
            young musicians and cultivate a vibrant cultural space.
          </p>
        </div>
        
        {/* Right: Images (5 vertical slices using CSS object-position trick) */}
        <div className="w-[65%] shrink-0 border-l-[4px] border-black flex items-stretch">
          <div className="w-1/5 border-r border-black/30"><img src="/musicians.png" className="w-full h-full object-cover object-[10%]" /></div>
          <div className="w-1/5 border-r border-black/30"><img src="/musicians.png" className="w-full h-full object-cover object-[30%]" /></div>
          <div className="w-1/5 border-r border-black/30"><img src="/musicians.png" className="w-full h-full object-cover object-[50%]" /></div>
          <div className="w-1/5 border-r border-black/30"><img src="/musicians.png" className="w-full h-full object-cover object-[70%]" /></div>
          <div className="w-1/5"><img src="/musicians.png" className="w-full h-full object-cover object-[90%]" /></div>
        </div>
      </div>

      {/* Nav Strip */}
      <nav className="bg-[#8b0a30] text-white flex justify-center text-[13px] font-bold border-y-2 border-black/40 relative z-50">
          
          <div className="group relative">
            <Link href="/about" className="block px-6 py-[8px] hover:underline">About us</Link>
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
              <div className="w-48 bg-[#630018] border border-white/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
                <Link href="/about/committee" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors border-b border-white/10">The Committee</Link>
                <Link href="/about/awards" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors border-b border-white/10">Titles & Awards</Link>
                <Link href="/about/blog" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors border-b border-white/10">Blog</Link>
                <Link href="/about/code-of-conduct" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors">Code of Conduct</Link>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link href="/festival" className="block px-4 py-[8px] hover:underline text-[12px]">Aaroha Carnatic Music Festival</Link>
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
               <div className="w-48 bg-[#630018] border border-white/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
                <Link href="/festival" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors border-b border-white/10">2026 Festival</Link>
                <Link href="/festival/tickets" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors border-b border-white/10">Tickets</Link>
                <Link href="/festival/directions" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors border-b border-white/10">Directions</Link>
                <Link href="/festival/accommodations" className="block px-4 py-2 hover:bg-[#8b0a30] transition-colors">Accommodations</Link>
              </div>
            </div>
          </div>

          <div><Link href="/competitions" className="block px-6 py-[8px] hover:underline">Competitions</Link></div>
          <div><Link href="/support" className="block px-6 py-[8px] hover:underline">Support us</Link></div>
          <div><Link href="/contact" className="block px-6 py-[8px] hover:underline">Contact us</Link></div>
          
          {userEmail && ['saama.seattle@gmail.com', 'testuser@example.com'].includes(userEmail) && (
            <>
              <div className="w-[1px] h-4 bg-white/30 self-center mx-2"></div>
              <div>
                <Link href="/admin" className="block px-4 py-[8px] text-yellow-400 hover:text-white transition-colors">Admin Area</Link>
              </div>
            </>
          )}

          <div className="w-[1px] h-4 bg-white/30 self-center mx-4"></div>
          <div>
            <Link 
              href={isAuthenticated ? "/portal" : "/login"} 
              className="block px-6 py-[8px] hover:text-yellow-400 transition-colors"
            >
              {isAuthenticated ? "Dashboard" : "Portal Login"}
            </Link>
          </div>
      </nav>
    </header>
  );
}
