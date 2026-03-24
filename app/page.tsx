import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="bg-[#3d230d] pt-10 pb-24 px-10 w-full shadow-inner border-x border-b border-[#faf5eb]/5">
        <div className="grid grid-cols-3 gap-14 text-[#faf5eb]">
          
          {/* Announcements */}
          <div>
            <div className="float-left mr-4 mb-2 mt-1">
              <div className="w-[85px] h-[85px] rounded-[42px] overflow-hidden border-[3px] border-[#2a1809] shadow-lg">
                <img src="/hero-banner.png" alt="Announcement" className="w-full h-full object-cover" />
              </div>
            </div>
            <h3 className="font-bold text-[18px] mb-3 font-serif leading-none pt-1">Announcements</h3>
            <p className="text-[13px] leading-relaxed text-[#faf5eb]/80 clear-none font-sans">
              Results for the <span className="font-bold text-[#faf5eb]">music</span> and <span className="font-bold text-[#faf5eb]">dance</span> competitions are online. Congrats to all the participants and winners!
            </p>
          </div>

          {/* Accommodations */}
          <div>
            <div className="mb-4">
              <div className="w-full h-[110px] border border-[#faf5eb]/20 overflow-hidden shadow-lg bg-black rounded-xl">
                <img src="/accommodation.png" alt="Accommodation" className="w-full h-full object-cover object-center" />
              </div>
            </div>
            <h3 className="font-bold text-[18px] mb-3 font-serif leading-none">Accommodations</h3>
            <p className="text-[13px] leading-relaxed text-[#faf5eb]/80 font-sans">
              Book soon with our <span className="font-bold text-[#faf5eb] border-b border-dotted cursor-pointer">partner hotels</span> close to the venue, for a convenient festival experience.
            </p>
            <a href="/festival/accommodations" className="block mt-4 text-[12px] font-bold text-[#faf5eb] hover:underline truncate">
              Accommodation Info »
            </a>
          </div>

          {/* Visitor Guide */}
          <div>
            <div className="float-left mr-4 mb-2 mt-1">
              <Link href="/">
                <div className="w-[65px] h-[65px] rounded-full overflow-hidden border-[2px] border-[#2a1809] bg-[#e2be93] flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
                  <img 
                    src="/logo.png" 
                    alt="Guide icon" 
                    className="w-[80%] h-[80%] object-contain mix-blend-multiply" 
                    style={{ filter: 'contrast(1.1) brightness(1.1)' }}
                  />
                </div>
              </Link>
            </div>
            <h3 className="font-bold text-[18px] mb-3 font-serif leading-none pt-1">Visitor Guide</h3>
            <p className="text-[13px] leading-relaxed text-[#faf5eb]/80 clear-none font-sans">
              For first-time visitors to the Festival, we have put together a guide to help you find your way around, know what to expect, and to answer any questions.
            </p>
            <a href="#" className="block mt-4 text-[12px] font-bold text-[#faf5eb] hover:underline truncate">
              Download Visitor's Guide »
            </a>
          </div>

        </div>
      </div>
      
    </>
  );
}

