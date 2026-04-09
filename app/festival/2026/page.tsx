'use client';

import React, { useState } from 'react';
import { Calendar, Ticket, MapPin, Clock } from 'lucide-react';

const scheduleDay1 = [
    { time: "9.45 - 10 AM", name: "Welcome & Invocation", theme: "Invocation song", artists: ["Janani Iyer of WA (Vocal)"] },
    { time: "10 - 11 AM", name: "Ensemble", theme: "Nadarnava: a confluence in the carnatic. Curated by Vid. Arun Prakash, coordinated by Shri. Subramanian Janardanan and presented by the Northwest talent.", artists: ["Myan Sudarshanan of WA (Mridangam and Konnakol)", "Srikrishna Prasannan of OR (Ghatam & Morsing)", "Shreyas Muralidharan of CA (Nadaswaram)", "Surya Katari of WA (Kanjira)", "Manthan Satish of WA (Flute)", "Anjana Sriram of WA, Aparajitha Sethuraman of WA (Veena)", "Pramati Bharat of WA, Harini Ganesh of OR, Amatra Jagannathan of WA (Violin)", "Vibha Shivarajan of WA, Akshara Gundimeda of WA, Amogh Nimmagada of WA, Smera Subramanian of WA (Vocal)"] },
    { time: "11:10 - 12:10 PM", name: "Thematic group rendition by Vid. Dharini Kalyanaram and her students", theme: "Muthuswamy Dikshitar's Guruguha Vibhakthi Krithis", artists: ["Vid. Dharini Kalyanaram of WA (Vocal)", "Vibha Shivarajan of WA (Vocal)", "Diya Ramkumar of WA (Vocal)", "Lahari Katari of WA (Vocal)", "Guhan Kumar of WA (Vocal)", "Krishna Srikanth of OR and Sriram Ramanan of CA (Double Mridangam)", "Harini Ganesh of OR (Violin)"] },
    { time: "12.20 - 1:05 PM", name: "Thematic Concert", theme: "Thyagaraja's Immortal Pancharatnams", artists: ["Shashank Ganesan of WA (Vocal)", "Aakarsh Dhilip of WA (Violin)", "Anuraag Prakash of WA and Sriram Ramanan of CA (Double Mridangam)"] },
    { time: "1:15 - 2:15 PM", name: "Thematic Concert", theme: "Compositions of Papanasam Sivan", artists: ["Sinthu Sethuraman of CA (Vocal)", "Vishnu Shreehari of VA (Violin)", "Krishna Srikanth of OR (Mridangam)", "Srikrishna Prasannan of OR (Ghatam)"] },
    { time: "2.25 - 2.55 PM", name: "Thematic Concert", theme: "Vivadhi compositions of Thyagaraja", artists: ["Tejas Saikrishnan of WA (Vocal)", "Sahana Prakash of WA (Violin)", "Anirudh Parthasarathy of WA (Mridangam)"] },
    { time: "3:00 - 3:20 PM", name: "Thematic group rendition by students of Shri. Subramanian Janardanan", theme: "Bhairavi Swarajathi", artists: ["Smera Subramanian of WA (Vocal)", "Divya Sriram of WA (Vocal)", "Soumya Sriram of WA (Vocal)", "Deeksha Tangirala of WA (Vocal)", "Kriti Tangirala of WA (Vocal)", "Aditi Arunkumar of WA (Violin)", "Mayukh Nimmagada of WA (Mridangam)"] },
    { time: "3.30 - 4:15 PM", name: "Thematic Concert", theme: "RTP", artists: ["Aditi Marehalli of WA (Vocal)", "Nandini Viswanathan of WA (Violin)", "Srikrishna Prasannan of OR (Ghatam)", "Krishna Srikanth of OR (Ghatam)"] },
    { time: "4.20 - 5 PM", name: "Documentary screening", theme: "Colonial Interlude: The Nottuswara Sahityas of Dikshitar. An award-winning film by renowned musicologist Dr. Kanniks Kannikeswaran", artists: [] },
    { time: "5.10 PM - 6.10 PM", name: "Workshop presentation", theme: "Timeless Gems of the Trinity. Curated by Vid. Sriranjani Santhanagopalan and presented by the participants", artists: ["Arnav Sudarshan of OR and Tarun Ravi of OR (Double Mridangam)", "Vishnu Shreehari of VA (Violin)"] },
    { time: "6.15 PM - 7:00 PM", name: "Carnatic Trivia", theme: "Led by Vid. Sriranjani Tapasya Santhanagopalan", artists: [] },
    { time: "7.10 - 8.40 PM", name: "Grand Concert", theme: "Carnatic Crossover Concert", artists: ["Vid. Ravi Gopinath of WA (Vocal)", "Amatra Jagannathan of WA (Violin)", "Vid. Jagadeeswaran Jayaprakash of WA (Mridangam)", "Vid. Vignesh Lakshminarayanan of WA (Guitar)"] },
];

const scheduleDay2 = [
    { time: "8.20 - 8.50 AM", name: "Thematic group rendition by Vid. RaginiSri's students", theme: "Nottuswarams", artists: [] },
    { time: "9 - 9:30 AM", name: "Thematic Concert", theme: "Compositions on Lord Muruga", artists: ["Janhavi Subramanian of WA (Vocal)", "Dhanya Srinivasan of WA (Vocal)", "Saanvi Karthik of WA (Vocal)", "Mayukh Nimmagada of WA (Mridangam)"] },
    { time: "9.40 - 10.25 AM", name: "Thematic Concert", theme: "Compositions on Lord Rama", artists: ["Amogh Nimmagada of WA (Vocal)", "Vishnu Shreehari of VA (Violin)", "Mayukh Nimmagada of WA (Mridangam)", "Srikrishna Prasannan of OR (Ghatam)"] },
    { time: "10.35 - 11.35 AM", name: "Thematic Concert", theme: "RTP", artists: ["Akshara Gundimeda of WA (Vocal)", "Arjun Gundimeda of WA (Violin)", "Anirudh Parthasarathy of WA (Mridangam)"] },
    { time: "11.45 - 12.30 PM", name: "Thematic Concert", theme: "Avatāra Vaibhavam – Selected Compositions on Vishnu’s Incarnations", artists: ["Shreyas Muralidharan of CA (Vocal)", "Vishnu Shreehari of VA (Violin)", "Arnav Sudarshan of OR (Mridangam)", "Srikrishna Prasannan of OR (Ghatam)"] },
    { time: "12.40 - 1.40 PM", name: "Thematic Concert", theme: "RTP", artists: ["Vijayanti Pappu of AZ (Veena)", "Tarun Ravi of OR (Mridangam)"] },
    { time: "1.50 - 2.50 PM", name: "Thematic Concert", theme: "", artists: ["Indiana Brothers of IN (Vocal)", "Tarun Ravi of OR (Mridangam)"] },
    { time: "2.55 - 3.25 PM", name: "Thematic Concert", theme: "Padams and Javalis", artists: ["Smera Subramanian of WA (Vocal)", "Pramati Bharat of WA (Violin)", "Myan Sudarshan of WA (Mridangam)"] },
    { time: "3.35 - 5.05 PM", name: "Thematic Concert", theme: "Tamil Compositions", artists: ["Bhargavi Chandrasekar of TX (Vocal)", "Pramati Bharat of WA (Violin)", "Myan Sudarshan of WA (Mridangam)", "Srikrishna Prasannan of OR (Ghatam)"] },
    { time: "5.15 - 5.45 PM", name: "Awards Ceremony", theme: "SaaMa Music competition prize distribution", artists: [] },
    { time: "6 - 8 PM", name: "Grand Concert", theme: "Grand Finale Concert", artists: ["Vid. Sriranjani Tapasya Santhagopalan", "Vid. Kamala Kiran Vinjamuri (Violin)", "Vid. Sumesh Narayanan (Mridangam)", "Vid. Ravi Balasubramanian (Ghatam)"] },
];

export default function Festival2026Page() {
    const [activeTab, setActiveTab] = useState<'schedule' | 'tickets' | 'venue'>('schedule');

    return (
        <div className="min-h-screen bg-[#faf5eb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">Aaroha Carnatic Music Festival 2026</h1>
                    <p className="text-lg text-[#7a5c3a] font-medium max-w-2xl mx-auto">
                        Join us for an immersive two-day celebration of Carnatic music featuring world-renowned artists, interactive workshops, and inspiring performances.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Left Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-[#d4c4a8] overflow-hidden sticky top-8">
                        <nav className="flex flex-col">
                            <button 
                                onClick={() => setActiveTab('schedule')}
                                className={`flex items-center gap-3 px-6 py-4 text-left font-bold transition-colors border-b border-[#d4c4a8]/50 ${activeTab === 'schedule' ? 'bg-[#3d230d] text-white' : 'text-[#5c3a1e] hover:bg-[#faf5eb]'}`}
                            >
                                <Calendar className="w-5 h-5" /> Schedule
                            </button>
                            <button 
                                onClick={() => setActiveTab('tickets')}
                                className={`flex items-center gap-3 px-6 py-4 text-left font-bold transition-colors border-b border-[#d4c4a8]/50 ${activeTab === 'tickets' ? 'bg-[#3d230d] text-white' : 'text-[#5c3a1e] hover:bg-[#faf5eb]'}`}
                            >
                                <Ticket className="w-5 h-5" /> Tickets
                            </button>
                            <button 
                                onClick={() => setActiveTab('venue')}
                                className={`flex items-center gap-3 px-6 py-4 text-left font-bold transition-colors ${activeTab === 'venue' ? 'bg-[#3d230d] text-white' : 'text-[#5c3a1e] hover:bg-[#faf5eb]'}`}
                            >
                                <MapPin className="w-5 h-5" /> Venue & Parking
                            </button>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-grow bg-white rounded-2xl shadow-sm border border-[#d4c4a8] p-6 sm:p-10 min-h-[500px]">
                        
                        {activeTab === 'schedule' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-6 border-b border-[#d4c4a8] pb-4">Festival Schedule</h2>
                                
                                <div className="space-y-12">
                                    {/* Day 1 */}
                                    <div>
                                        <h3 className="text-xl font-bold text-[#5c3a1e] mb-6 bg-[#faf5eb] inline-block px-4 py-2 rounded-md">Day 1: Saturday, June 20, 2026</h3>
                                        <div className="space-y-6">
                                            {scheduleDay1.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-xl p-6 border border-[#d4c4a8] shadow-sm flex flex-col md:flex-row gap-6">
                                                    <div className="md:w-1/4 shrink-0 border-b md:border-b-0 md:border-r border-[#d4c4a8]/50 pb-4 md:pb-0 md:pr-4">
                                                        <div className="flex items-center gap-2 text-[#7a5c3a] font-bold mb-2">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{item.time}</span>
                                                        </div>
                                                        <h4 className="text-lg font-serif font-bold text-[#3d230d] leading-tight">{item.name}</h4>
                                                    </div>
                                                    <div className="md:w-3/4 flex flex-col justify-center">
                                                        {item.theme && (
                                                            <p className="text-[#5c3a1e] font-medium mb-3 italic">
                                                                "{item.theme}"
                                                            </p>
                                                        )}
                                                        {item.artists.length > 0 && (
                                                            <ul className="space-y-2">
                                                                {item.artists.map((artist, artistIdx) => (
                                                                    <li key={artistIdx} className="text-[#7a5c3a] text-sm flex items-start gap-2">
                                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#a07d3c] shrink-0"></span>
                                                                        <span>{artist}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Day 2 */}
                                    <div>
                                        <h3 className="text-xl font-bold text-[#5c3a1e] mb-6 bg-[#faf5eb] inline-block px-4 py-2 rounded-md">Day 2: Sunday, June 21, 2026</h3>
                                        <div className="space-y-6">
                                            {scheduleDay2.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-xl p-6 border border-[#d4c4a8] shadow-sm flex flex-col md:flex-row gap-6">
                                                    <div className="md:w-1/4 shrink-0 border-b md:border-b-0 md:border-r border-[#d4c4a8]/50 pb-4 md:pb-0 md:pr-4">
                                                        <div className="flex items-center gap-2 text-[#7a5c3a] font-bold mb-2">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{item.time}</span>
                                                        </div>
                                                        <h4 className="text-lg font-serif font-bold text-[#3d230d] leading-tight">{item.name}</h4>
                                                    </div>
                                                    <div className="md:w-3/4 flex flex-col justify-center">
                                                        {item.theme && (
                                                            <p className="text-[#5c3a1e] font-medium mb-3 italic">
                                                                "{item.theme}"
                                                            </p>
                                                        )}
                                                        {item.artists.length > 0 && (
                                                            <ul className="space-y-2">
                                                                {item.artists.map((artist, artistIdx) => (
                                                                    <li key={artistIdx} className="text-[#7a5c3a] text-sm flex items-start gap-2">
                                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#a07d3c] shrink-0"></span>
                                                                        <span>{artist}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tickets' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-6 border-b border-[#d4c4a8] pb-4">Tickets</h2>
                                <div className="py-12 text-center bg-[#faf5eb] rounded-xl border border-[#d4c4a8] border-dashed">
                                    <Ticket className="w-12 h-12 text-[#d4c4a8] mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-[#5c3a1e] mb-2">Ticket Details Coming Soon!</h3>
                                    <p className="text-[#7a5c3a] max-w-md mx-auto">
                                        We are finalizing the ticketing tiers and packages for the 2026 festival. Please check back shortly for full details and purchasing links.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'venue' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-6 border-b border-[#d4c4a8] pb-4">Venue & Parking</h2>
                                
                                <div className="space-y-8">
                                    {/* Venue */}
                                    <div className="bg-[#faf5eb] p-6 rounded-xl border border-[#d4c4a8] shadow-sm flex flex-col md:flex-row gap-6 items-start">
                                        <div className="bg-white p-4 rounded-full shadow-sm shrink-0">
                                            <MapPin className="w-8 h-8 text-[#5c3a1e]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#5c3a1e] mb-2">Kane Hall</h3>
                                            <p className="text-[#3d230d] font-medium leading-relaxed">
                                                Room 130 – Roethke Auditorium<br/>
                                                University of Washington<br/>
                                                Seattle, WA 98105, USA
                                            </p>
                                        </div>
                                    </div>

                                    {/* Directions for Kane Hall */}
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">Directions for Kane Hall</h3>
                                        <div className="bg-white p-6 rounded-xl border border-[#d4c4a8] shadow-sm text-[#7a5c3a] space-y-6 leading-relaxed">
                                            <div>
                                                <h4 className="text-[#5c3a1e] font-bold mb-2">From I-5</h4>
                                                <p>
                                                    Exit east onto N.E. 45th Street. Travel east on N.E. 45th Street to 15th Avenue N.E. Turn right onto 15th Avenue N.E. The UW Central Plaza Parking Garage is located at N.E. 41st Street and 15th Avenue N.E. Current parking information and rates are available from Transportation Services. Please note that a special event parking fee may be charged for evening events. Above-ground parking is also available. Enter campus at the north entrance, N.E. 45th Street and 17th Avenue N.E. Stop at the gatehouse and ask the attendant for additional information.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[#5c3a1e] font-bold mb-2">From 520</h4>
                                                <p>
                                                    Exit north onto Montlake Boulevard N.E. Turn left onto N.E. Pacific Street. Turn right and head north on 15th Avenue N.E. The UW Central Plaza Parking Garage is located at N.E. 41st street and 15th Avenue N.E. Current parking information and rates are available from Transportation Services. Please note that a special event parking fee may be charged for evening events. Above-ground parking is also available. Enter campus at the north entrance (N.E. 45th Street and 17th Avenue N.E.). Stop at the gatehouse and ask the attendant for additional information.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parking Details */}
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">Parking Details</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#7a5c3a]">
                                            <div className="bg-white p-6 rounded-xl border border-[#d4c4a8] shadow-sm">
                                                <h4 className="text-[#5c3a1e] font-bold mb-3 flex items-center gap-2">
                                                    Central Plaza Parking Garage (CPG)
                                                </h4>
                                                <p className="mb-3">The most convenient place to park for events in Kane Hall. Enter via the east entrance at 41st Street and 15th Avenue NE.</p>
                                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                                    <li><strong>Gatehouse:</strong> Stop, pay the attendant, and park where directed.</li>
                                                    <li><strong>Self-Service:</strong> Levels C02, C03, or C04. Pay via the PayByPhone app [Code #123211].</li>
                                                </ul>
                                            </div>

                                            <div className="bg-white p-6 rounded-xl border border-[#d4c4a8] shadow-sm">
                                                <h4 className="text-[#5c3a1e] font-bold mb-3 flex items-center gap-2">
                                                    Kane Hall Access from CPG
                                                </h4>
                                                <p className="mb-3">Access from the C1, C3, and C5 garages. Look for Kane Hall signage in the northeast corner.</p>
                                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                                    <li><strong>1st floor:</strong> Rooms 110, 120, 130</li>
                                                    <li><strong>2nd floor:</strong> Rooms 210, 220, Walker-Ames</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alternate Parking */}
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">Alternate Parking Locations</h3>
                                        <div className="bg-white p-6 rounded-xl border border-[#d4c4a8] shadow-sm text-[#7a5c3a]">
                                            <ul className="space-y-4">
                                                <li className="flex gap-4">
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#d4c4a8] shrink-0"></div>
                                                    <div>
                                                        <strong className="text-[#5c3a1e]">North Gatehouse:</strong> via 45th Street and Memorial Way. Pay at the gatehouse.
                                                    </div>
                                                </li>
                                                <li className="flex gap-4">
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#d4c4a8] shrink-0"></div>
                                                    <div>
                                                        <strong className="text-[#5c3a1e]">Self-service parking:</strong> The N01 parking lot by the Burke Museum is closest to central campus, followed by N06, N20, N21, or N22.
                                                    </div>
                                                </li>
                                                <li className="flex gap-4">
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#d4c4a8] shrink-0"></div>
                                                    <div>
                                                        <strong className="text-[#5c3a1e]">East Campus Parking:</strong> Lots E01 and E18 close to Husky Stadium. Offers cheapest rates (15-min uphill walk).
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* General Notes */}
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-[#3d230d] mb-4">Important Notes</h3>
                                        <div className="bg-[#faf5eb] p-6 rounded-xl border border-[#d4c4a8] text-[#7a5c3a] text-sm leading-relaxed space-y-2">
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>No parking fees required on <strong>Sundays</strong>.</li>
                                                <li><strong>Event Parking Codes:</strong> Present provided codes to the gatehouse attendant to waive the fee.</li>
                                                <li><strong>Load & Unload:</strong> Stop at West Gatehouse (15th Ave NE & Stevens Way) for a permit. Drive under Odegaard library for loading dock. (Height limit: 11'9").</li>
                                                <li>Prorated refunds available for Visa, MasterCard, or cash payments. Special event rates may apply.</li>
                                                <li>For detailed info or questions: <a href="mailto:ucommute@uw.edu" className="text-[#5c3a1e] underline">ucommute@uw.edu</a> or call 206-221-3701 (Mon-Fri, 8 AM - 4 PM).</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
