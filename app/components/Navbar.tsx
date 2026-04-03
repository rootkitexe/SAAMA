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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const galleryImages = [
    '/gallery/saama-1.png',
    '/gallery/saama-2.jpg',
    '/gallery/saama-3.jpg',
    '/gallery/saama-4.jpg',
    '/gallery/saama-5.jpg',
    '/gallery/saama-6.jpg',
    '/gallery/saama-7.jpg',
    '/gallery/saama-9.jpg',
    '/gallery/saama-10.jpg',
    '/gallery/saama-11.jpg',
    '/gallery/saama-12.jpg',
    '/gallery/saama-13.jpg',
    '/gallery/saama-14.jpg',
    '/gallery/saama-15.jpg',
    '/gallery/saama-16.jpg',
    '/gallery/saama-17.jpg',
    '/gallery/saama-18.jpg',
    '/gallery/saama-19.jpg',
    '/gallery/saama-20.png',
    '/gallery/saama-21.jpg',
  ];

  // We add 5 images as buffer to the end for seamless looping
  const displayImages = [...galleryImages, ...galleryImages.slice(0, 5)];

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= galleryImages.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  // On server and first client render, show a static state (isMounted = false)
  // This ensures hydration matches perfectly
  const currentTransform = isMounted
    ? `translateX(-${currentIndex * (100 / displayImages.length)}%)`
    : 'translateX(0%)';

  return (
    <header className="flex flex-col w-full overflow-visible shrink-0 relative z-[100]">
      {/* Banner Section */}
      <div className="flex bg-[#e2be93] h-[450px] items-stretch">
        {/* Left: Info */}
        <div className="w-[35%] px-8 pt-2 flex flex-col justify-start text-black">
          <div className="mb-3 w-full flex justify-center h-[180px]">
            <Link href="/" className="h-full">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full object-contain mix-blend-multiply cursor-pointer hover:opacity-90 transition-opacity"
                style={{ filter: 'contrast(1.1) brightness(1.1)' }}
              />
            </Link>
          </div>

          <p className="text-[15px] text-center text-black/80 mb-2 font-sans font-bold tracking-tight uppercase">
            Sadhana Academy for Musical Arts
          </p>
          <p className="text-[13px] text-center text-[#5c3a1e] italic mb-2 font-serif">
            Celebrating Sādhana, Tradition, and the Next Generation.
          </p>
          <p className="text-[14px] leading-[1.7] text-justify text-black/80 font-serif">
            SaaMa — Sadhana Academy for Musical Arts is a 501(c)(3) non-profit organization
            dedicated to nurturing and sustaining the living tradition of Indian classical music.
            Through concerts, workshops, mentorship, and community initiatives, we seek to inspire
            young musicians and cultivate a vibrant cultural space.
          </p>
        </div>

        {/* Right: Images (Sliding Gallery) */}
        <div className="w-[65%] shrink-0 border-l-[4px] border-black overflow-hidden bg-[#e2be93] relative">
          <div
            className={`flex h-full p-2 gap-2 ${isMounted && isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: currentTransform,
              width: `${(displayImages.length / 5) * 100}%`
            }}
          >
            {displayImages.map((img, idx) => {
              // Custom object positions for specific images to keep faces in frame
              let objectPosition = 'center';
              if (img.includes('saama-9.jpg')) {
                objectPosition = '30% 30%'; // Focus on the left side for image 9
              } else if (img.includes('saama-10.jpg')) {
                objectPosition = '60% 30%'; // Less extreme focus on the right side for image 10
              } else if (img.includes('saama-21.jpg')) {
                objectPosition = '30% 30%'; // Focus on the left side for image 21
              }

              return (
                <div
                  key={idx}
                  className={`h-full rounded-lg overflow-hidden shadow-sm border flex-shrink-0 ${img.includes('saama-20.png') ? 'bg-black border-black/20' : 'bg-black/5 border-black/5'}`}
                  style={{ width: `calc(${100 / displayImages.length}% - 8px)` }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    style={{ objectPosition }}
                    alt={`SaaMa Gallery ${idx + 1}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nav Strip */}
      <nav className="bg-[#3d230d] text-[#faf5eb] flex justify-center text-[13px] font-bold border-y-2 border-black/40 relative z-50">

        <div>
          <Link href="/about" className="block px-6 py-[8px] hover:underline">About us</Link>
        </div>

        <div className="group relative">
          <Link href="/festival" className="block px-4 py-[8px] hover:underline text-[12px]">Aaroha Carnatic Music Festival</Link>
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
            <div className="w-48 bg-[#2a1809] border border-[#faf5eb]/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
              <Link href="/festival/2026" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors">2026 Festival</Link>
            </div>
          </div>
        </div>

        <div><Link href="/competitions" className="block px-6 py-[8px] hover:underline">Competitions</Link></div>
        <div><Link href="/gallery" className="block px-6 py-[8px] hover:underline">Gallery</Link></div>
        <div><Link href="/blog" className="block px-6 py-[8px] hover:underline">Blog</Link></div>
        <div><Link href="/support" className="block px-6 py-[8px] hover:underline">Support us</Link></div>
        <div><Link href="/contact" className="block px-6 py-[8px] hover:underline">Contact us</Link></div>

        {userEmail && ['saama.seattle@gmail.com', 'testuser@example.com'].includes(userEmail) && (
          <>
            <div className="w-[1px] h-4 bg-[#faf5eb]/30 self-center mx-2"></div>
            <div>
              <Link href="/admin" className="block px-4 py-[8px] text-yellow-400 hover:text-[#faf5eb] transition-colors">Admin Area</Link>
            </div>
          </>
        )}

        <div className="w-[1px] h-4 bg-[#faf5eb]/30 self-center mx-4"></div>
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

