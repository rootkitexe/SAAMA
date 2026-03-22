export default function Home() {
  return (
    <>
      <div className="bg-[#4a0418] pt-10 pb-24 px-10 w-full rounded-b-lg shadow-inner border-x border-b border-white/5">
        <div className="grid grid-cols-3 gap-14 text-white">
          
          {/* Announcements */}
          <div>
            <div className="float-left mr-4 mb-2 mt-1">
              <div className="w-[85px] h-[85px] rounded-[42px] overflow-hidden border-[3px] border-[#990033] shadow-lg">
                <img src="/hero-banner.png" alt="Announcement" className="w-full h-full object-cover" />
              </div>
            </div>
            <h3 className="font-bold text-[18px] mb-3 font-serif leading-none pt-1">Announcements</h3>
            <p className="text-[13px] leading-relaxed text-[#d4d4d4] clear-none font-sans">
              Results for the <span className="font-bold text-white">music</span> and <span className="font-bold text-white">dance</span> competitions are online. Congrats to all the participants and winners!
            </p>
          </div>

          {/* Accommodations */}
          <div>
            <div className="mb-4">
              <div className="w-full h-[110px] border border-white/20 overflow-hidden shadow-lg bg-black">
                <img src="/accommodation.png" alt="Accommodation" className="w-full h-full object-cover object-center" />
              </div>
            </div>
            <h3 className="font-bold text-[18px] mb-3 font-serif leading-none">Accommodations</h3>
            <p className="text-[13px] leading-relaxed text-[#d4d4d4] font-sans">
              Book soon with our <span className="font-bold text-white border-b border-dotted cursor-pointer">partner hotels</span> close to the venue, for a convenient festival experience.
            </p>
            <a href="/festival/accommodations" className="block mt-4 text-[12px] font-bold text-white hover:underline truncate">
              Accommodation Info »
            </a>
          </div>

          {/* Visitor Guide */}
          <div>
            <div className="float-left mr-4 mb-2 mt-1">
              <div className="w-[65px] h-[65px] rounded-full overflow-hidden border-[2px] border-[#990033] bg-[#e2be93] flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Guide icon" className="w-[80%] h-[80%] object-contain mix-blend-multiply drop-shadow-sm" />
              </div>
            </div>
            <h3 className="font-bold text-[18px] mb-3 font-serif leading-none pt-1">Visitor Guide</h3>
            <p className="text-[13px] leading-relaxed text-[#d4d4d4] clear-none font-sans">
              For first-time visitors to the Festival, we have put together a guide to help you find your way around, know what to expect, and to answer any questions.
            </p>
            <a href="#" className="block mt-4 text-[12px] font-bold text-white hover:underline truncate">
              Download Visitor's Guide »
            </a>
          </div>

        </div>
      </div>
      
      {/* Sponsors */}
      <div className="bg-black w-full py-8 text-left">
        <p className="text-[#555555] text-[13px] mb-4 font-sans">Thanks to our sponsors:</p>
        <div className="flex gap-4">
           {/* Sponsor logo mockup matching reference style */}
           <div className="text-[#00aadd] font-sans font-bold text-[22px] flex flex-col items-start leading-[1.1] tracking-tight">
             <div className="flex items-center gap-[6px] mb-2 ml-4">
                 {/* Little dots cluster */}
                 <div className="flex gap-1 relative bottom-[4px]">
                     <div className="w-[4px] h-[4px] rounded-full bg-[#00aadd] animate-pulse"></div>
                     <div className="w-[6px] h-[6px] rounded-full bg-[#00aadd]"></div>
                     <div className="w-[5px] h-[5px] rounded-full bg-[#00aadd]"></div>
                 </div>
                 <div className="flex flex-col gap-[2px]">
                   <div className="w-[4px] h-[4px] rounded-full bg-[#00aadd]"></div>
                   <div className="w-[3px] h-[3px] rounded-full bg-[#00aadd]"></div>
                 </div>
             </div>
             <div className="pl-2">
               <span className="text-[14px] tracking-normal font-normal mr-1 lowercase">seattle</span><br/>
               <span className="lowercase">arts & culture</span>
             </div>
             <div className="text-[9px] text-[#cca53f] font-normal tracking-wide mt-1 pl-2 lowercase">strengthening community</div>
           </div>
        </div>
      </div>
    </>
  );
}
