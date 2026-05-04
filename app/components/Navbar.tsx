'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalOpen, setFestivalOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setFestivalOpen(false);
    setCommunityOpen(false);
  };

  const isAdmin = userEmail && ['saama.seattle@gmail.com', 'testuser@example.com'].includes(userEmail);

  return (
    <header className="flex flex-col w-full overflow-visible shrink-0 relative z-[100]">
      {/* Nav Strip */}
      <nav className="bg-[#3d230d] text-[#faf5eb] border-y-2 border-black/40 relative z-50">
        
        {/* Desktop Nav — hidden on mobile */}
        <div className="hidden md:flex justify-center items-center text-[14px] font-bold">
          <div>
            <Link href="/" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Home</Link>
          </div>

          <div>
            <Link href="/about#content" className="block px-4 py-[14px] hover:underline whitespace-nowrap">About us</Link>
          </div>

          <div className="group relative">
            <span className="block px-4 py-[14px] hover:underline cursor-pointer text-[14px] whitespace-nowrap">Aaroha Carnatic Music Festival</span>
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
              <div className="w-48 bg-[#2a1809] border border-[#faf5eb]/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
                <Link href="/festival/2026#content" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors">2026 Festival</Link>
              </div>
            </div>
          </div>

          <div><Link href="/competitions#content" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Competitions</Link></div>
          <div><Link href="/gallery#content" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Gallery</Link></div>
          <div className="group relative">
            <span className="block px-4 py-[14px] hover:underline cursor-pointer whitespace-nowrap">Community</span>
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60]">
              <div className="w-56 bg-[#2a1809] border border-[#faf5eb]/20 shadow-2xl rounded-b-md overflow-hidden flex flex-col pt-1">
                <Link href="/blog#content" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors font-normal text-[12.5px]">Blogs</Link>
                <Link href="/teachers#content" className="block px-4 py-2 hover:bg-[#3d230d] transition-colors font-normal text-[12.5px]">Teacher Directory</Link>
              </div>
            </div>
          </div>
          <div><Link href="/support#content" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Support us</Link></div>
          <div><Link href="/contact#content" className="block px-4 py-[14px] hover:underline whitespace-nowrap">Contact us</Link></div>

          {isAdmin && (
            <div>
              <Link href="/admin" className="block px-4 py-[14px] text-yellow-400 hover:text-[#faf5eb] transition-colors whitespace-nowrap">Admin Area</Link>
            </div>
          )}

          <div>
            <Link
              href={isAuthenticated ? "/portal" : "/login"}
              className="block px-4 py-[14px] hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              {isAuthenticated ? "Dashboard" : "Portal Login"}
            </Link>
          </div>
        </div>

        {/* Mobile Nav Bar — visible on mobile only */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <Link href="/" className="font-serif font-bold text-lg text-[#faf5eb]">
            Sadhana Academy
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#faf5eb] hover:bg-[#5c3a1e] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2a1809] border-t border-[#faf5eb]/10 absolute top-full left-0 right-0 z-[200] shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col text-[15px] font-medium">
              <Link href="/" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 hover:bg-[#3d230d] transition-colors">Home</Link>
              <Link href="/about#content" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 hover:bg-[#3d230d] transition-colors">About us</Link>
              
              {/* Festival Accordion */}
              <div className="border-b border-[#faf5eb]/10">
                <button 
                  onClick={() => setFestivalOpen(!festivalOpen)}
                  className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-[#3d230d] transition-colors"
                >
                  <span>Aaroha Carnatic Music Festival</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${festivalOpen ? 'rotate-180' : ''}`} />
                </button>
                {festivalOpen && (
                  <div className="bg-[#1a0f05]">
                    <Link href="/festival/2026#content" onClick={closeMobileMenu} className="block px-10 py-3 text-sm text-[#faf5eb]/80 hover:bg-[#3d230d] transition-colors">2026 Festival</Link>
                  </div>
                )}
              </div>

              <Link href="/competitions#content" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 hover:bg-[#3d230d] transition-colors">Competitions</Link>
              <Link href="/gallery#content" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 hover:bg-[#3d230d] transition-colors">Gallery</Link>
              
              {/* Community Accordion */}
              <div className="border-b border-[#faf5eb]/10">
                <button 
                  onClick={() => setCommunityOpen(!communityOpen)}
                  className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-[#3d230d] transition-colors"
                >
                  <span>Community</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${communityOpen ? 'rotate-180' : ''}`} />
                </button>
                {communityOpen && (
                  <div className="bg-[#1a0f05]">
                    <Link href="/blog#content" onClick={closeMobileMenu} className="block px-10 py-3 text-sm text-[#faf5eb]/80 hover:bg-[#3d230d] transition-colors">Blogs</Link>
                    <Link href="/teachers#content" onClick={closeMobileMenu} className="block px-10 py-3 text-sm text-[#faf5eb]/80 hover:bg-[#3d230d] transition-colors">Teacher Directory</Link>
                  </div>
                )}
              </div>

              <Link href="/support#content" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 hover:bg-[#3d230d] transition-colors">Support us</Link>
              <Link href="/contact#content" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 hover:bg-[#3d230d] transition-colors">Contact us</Link>
              
              {isAdmin && (
                <Link href="/admin" onClick={closeMobileMenu} className="px-6 py-3.5 border-b border-[#faf5eb]/10 text-yellow-400 hover:bg-[#3d230d] transition-colors">Admin Area</Link>
              )}

              <Link 
                href={isAuthenticated ? "/portal" : "/login"} 
                onClick={closeMobileMenu}
                className="px-6 py-3.5 border-b border-[#faf5eb]/10 text-yellow-400 hover:bg-[#3d230d] transition-colors"
              >
                {isAuthenticated ? "Dashboard" : "Portal Login"}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Banner Section */}
      {/* Desktop: side-by-side | Mobile: stacked */}
      <div className="flex flex-col md:flex-row bg-[#faf5eb] md:h-[450px] items-stretch">
        {/* Left: Info */}
        <div className="w-full md:w-[35%] px-6 md:px-8 py-6 md:pt-2 md:py-0 flex flex-col justify-start items-center md:items-start bg-[#3d230d] text-[#faf5eb] overflow-hidden">
          <div className="mb-2 w-full flex justify-center h-[120px] md:h-[190px] shrink-0">
            <Link href="/" className="h-full">
              <img
                src="/logo_header-Photoroom.png"
                alt="Logo"
                className="h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                style={{ filter: 'drop-shadow(0 0 6px rgba(61,35,13,0.4))' }}
              />
            </Link>
          </div>

          <p className="text-[14px] md:text-[15px] text-center text-[#faf5eb]/90 mb-2 font-sans font-bold tracking-tight uppercase">
            Sadhana Academy for Musical Arts
          </p>
          <p className="text-[12px] md:text-[13px] text-center text-[#D4AF37] italic mb-2 font-serif">
            Celebrating Sādhana, Tradition, and the Next Generation.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[1.7] text-center md:text-justify text-[#faf5eb]/80 font-serif">
            Sadhana Academy for Musical Arts is a 501(c)(3) non-profit organization
            dedicated to nurturing and sustaining the living tradition of Indian classical music.
            Through concerts, workshops, mentorship, and community initiatives, we seek to inspire
            young musicians and cultivate a vibrant cultural space.
          </p>
        </div>

        {/* Right: Images — Desktop: 3D Gallery | Mobile: Simple Carousel */}
        <div className="w-full md:w-[65%] shrink-0 border-t-[3px] md:border-t-0 md:border-l-[3px] border-black overflow-hidden bg-[#3d230d] relative h-[400px] md:h-auto">
          {/* Desktop 3D Gallery */}
          <div className="hidden md:flex h-full items-center justify-center relative w-full overflow-hidden" style={{ perspective: '1200px' }}>
            {galleryImages.map((img, i) => {
              let offset = i - currentIndex;
              const half = galleryImages.length / 2;
              if (offset > half) offset -= galleryImages.length;
              if (offset < -half) offset += galleryImages.length;

              const isVisible = Math.abs(offset) <= 4;
              const isCore = Math.abs(offset) <= 3;

              const rotateY = offset * -15;
              const translateZ = -Math.abs(offset) * 30;
              const translateX = offset * 105;

              const opacity = isCore ? 1 - Math.abs(offset) * 0.06 : 0;

              let objectPosition = 'center';
              if (img.includes('saama-9.jpg')) objectPosition = '30% 30%';
              else if (img.includes('saama-10.jpg')) objectPosition = '60% 30%';
              else if (img.includes('saama-21.jpg')) objectPosition = '30% 30%';

              return (
                <div
                  key={img}
                  className={`absolute h-[94%] rounded-2xl overflow-hidden shadow-xl border-2 ${
                    offset === 0 ? 'border-white/40' : 'border-white/15'
                  } ${img.includes('saama-20.png') ? 'bg-black' : 'bg-black/5'}`}
                  style={{
                    width: '20%',
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex: 20 - Math.abs(offset),
                    visibility: (isVisible ? 'visible' : 'hidden') as any,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    style={{ objectPosition }}
                    alt={`Gallery ${i + 1}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile Simple Carousel */}
          <div className="flex md:hidden h-full items-center justify-center relative w-full overflow-hidden">
            {galleryImages.map((img, i) => (
              <img
                key={img}
                src={img}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === currentIndex ? 1 : 0 }}
                alt={`Gallery ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full h-[3px] bg-black"></div>

    </header>
  );
}
