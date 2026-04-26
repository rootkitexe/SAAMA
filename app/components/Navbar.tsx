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
    '/gallery/saama-16.jpg',
    '/gallery/saama-17.jpg',
    '/gallery/saama-18.jpg',
    '/gallery/saama-19.jpg',
    '/gallery/saama-20.png',
    '/gallery/saama-21.jpg',
    '/gallery/carousel-new-1.png',
    '/gallery/carousel-new-2.png',
    '/gallery/carousel-new-3.png',
    '/gallery/carousel-new-4.jpg',
    '/gallery/carousel-new-5.jpg',
  ];

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  // Get image index with wrapping
  const getWrappedIndex = (index: number) => {
    return ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
  };

  // 3D transform config for each position relative to center
  const getCardStyle = (offset: number) => {
    const rotateY = offset * -15;
    const translateZ = -Math.abs(offset) * 30;
    const opacity = 1 - Math.abs(offset) * 0.06;
    return {
      transform: `perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
      opacity: Math.max(opacity, 0.7),
      zIndex: 10 - Math.abs(offset),
    };
  };

  return (
    <header className="flex flex-col w-full overflow-visible shrink-0 relative z-[100]">
      {/* Nav Strip */}
      <nav className="bg-[#3d230d] text-[#faf5eb] flex justify-center items-center text-[14px] font-bold border-y-2 border-black/40 relative z-50">

        <div>
          <Link href="/" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Home</Link>
        </div>

        <div>
          <Link href="/about" className="block px-4 py-[14px] hover:underline whitespace-nowrap">About us</Link>
        </div>

        <div className="group relative">
          <span className="block px-4 py-[14px] hover:underline cursor-pointer text-[14px] whitespace-nowrap">Aaroha Carnatic Music Festival</span>
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
            <div className="w-48 bg-[#2a1809] border border-[#faf5eb]/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
              <Link href="/festival/2026" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors">2026 Festival</Link>
            </div>
          </div>
        </div>

        <div><Link href="/competitions" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Competitions</Link></div>
        <div><Link href="/gallery" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Gallery</Link></div>
        <div className="group relative">
          <span className="block px-4 py-[14px] hover:underline cursor-pointer whitespace-nowrap">Community</span>
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
            <div className="w-56 bg-[#2a1809] border border-[#faf5eb]/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
              <Link href="/blog" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors font-normal text-[12.5px]">Blogs</Link>
              <Link href="/teachers" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors font-normal text-[12.5px]">Teacher Directory</Link>
            </div>
          </div>
        </div>
        <div><Link href="/support" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Support us</Link></div>
        <div><Link href="/contact" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Contact us</Link></div>

        {userEmail && ['saama.seattle@gmail.com', 'testuser@example.com'].includes(userEmail) && (
          <>
            <div>
              <Link href="/admin" className="block px-4 py-[14px] text-yellow-400 hover:text-[#faf5eb] transition-colors whitespace-nowrap">Admin Area</Link>
            </div>
          </>
        )}

        <div>
          <Link
            href={isAuthenticated ? "/portal" : "/login"}
            className="block px-4 py-[14px] hover:text-yellow-400 transition-colors whitespace-nowrap"
          >
            {isAuthenticated ? "Dashboard" : "Portal Login"}
          </Link>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="flex bg-[#faf5eb] h-[450px] items-stretch">
        {/* Left: Info */}
        <div className="w-[35%] px-8 pt-2 flex flex-col justify-start bg-[#3d230d] text-[#faf5eb]">
          <div className="mb-2 w-full flex justify-center h-[210px]">
            <Link href="/" className="h-full">
              <img
                src="/logo_header-Photoroom.png"
                alt="Logo"
                className="h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                style={{ filter: 'drop-shadow(0 0 6px rgba(61,35,13,0.4))' }}
              />
            </Link>
          </div>

          <p className="text-[15px] text-center text-[#faf5eb]/90 mb-2 font-sans font-bold tracking-tight uppercase">
            Sadhana Academy for Musical Arts
          </p>
          <p className="text-[13px] text-center text-[#D4AF37] italic mb-2 font-serif">
            Celebrating Sādhana, Tradition, and the Next Generation.
          </p>
          <p className="text-[14px] leading-[1.7] text-justify text-[#faf5eb]/80 font-serif">
            Sadhana Academy for Musical Arts is a 501(c)(3) non-profit organization
            dedicated to nurturing and sustaining the living tradition of Indian classical music.
            Through concerts, workshops, mentorship, and community initiatives, we seek to inspire
            young musicians and cultivate a vibrant cultural space.
          </p>
        </div>

        {/* Right: Images (3D Perspective Gallery) */}
        <div className="w-[65%] shrink-0 border-l-[3px] border-black overflow-hidden bg-[#3d230d] relative">
          <div className="flex h-full items-center justify-center relative w-full overflow-hidden" style={{ perspective: '1200px' }}>
            {galleryImages.map((img, i) => {
              // Calculate shortest distance in ring buffer
              let offset = i - currentIndex;
              const half = galleryImages.length / 2;
              if (offset > half) offset -= galleryImages.length;
              if (offset < -half) offset += galleryImages.length;

              // Hide items far away to optimize rendering, but keep 1 extra for smooth slide-in/out
              const isVisible = Math.abs(offset) <= 4;
              const isCore = Math.abs(offset) <= 3;

              const rotateY = offset * -15;
              const translateZ = -Math.abs(offset) * 30;
              const translateX = offset * 105; // 105% of card width separation

              const opacity = isCore ? 1 - Math.abs(offset) * 0.06 : 0;

              // Custom object positions for specific images
              let objectPosition = 'center';
              if (img.includes('saama-9.jpg')) objectPosition = '30% 30%';
              else if (img.includes('saama-10.jpg')) objectPosition = '60% 30%';
              else if (img.includes('saama-21.jpg')) objectPosition = '30% 30%';

              return (
                <div
                  key={img} // Use unique image path as key
                  className={`absolute h-[94%] rounded-2xl overflow-hidden shadow-xl border-2 ${
                    offset === 0 ? 'border-white/40' : 'border-white/15'
                  } ${img.includes('saama-20.png') ? 'bg-black' : 'bg-black/5'}`}
                  style={{
                    width: '20%',
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex: 20 - Math.abs(offset),
                    visibility: (isVisible ? 'visible' : 'hidden') as any, // Cast string to any inside styled obj
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    style={{ objectPosition }}
                    alt={`SaaMa Gallery ${i + 1}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full h-[3px] bg-black"></div>

    </header>
  );
}

