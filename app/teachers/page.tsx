import { Search, Mail, Phone, Globe, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

// Mock data to populate the directory initially
const directoryData = [
  {
    id: 1,
    name: "Sadhana Academy for Musical Arts",
    email: "saama.seattle@gmail.com",
    phone: "(425) 591-2391",
    services: ["Vocal Carnatic", "Workshops", "Mentorship"],
    location: "Bellevue, WA",
    links: { website: "https://saamaseattle.org", facebook: "#", instagram: "#" }
  },
  {
    id: 2,
    name: "Tapasya School of Music",
    email: "contact@tapasya.example.com",
    phone: "(206) 555-0192",
    services: ["Vocal Carnatic"],
    location: "Seattle, WA",
    links: { website: "#", facebook: "#" }
  },
  {
    id: 3,
    name: "Seattle Bharatanatyam Studio",
    email: "info@seattlenatyam.example.com",
    phone: "(425) 555-0188",
    services: ["Bharatanatyam Lessons"],
    location: "Redmond, WA",
    links: { instagram: "#" }
  },
  {
    id: 4,
    name: "Evergreen Veena Academy",
    email: "learn@evergreenveena.example.com",
    phone: "(425) 555-0177",
    services: ["Veena Lessons"],
    location: "Bothell, WA",
    links: { website: "#" }
  }
];

export default function TeachersDirectoryPage() {
    return (
        <div className="min-h-screen bg-[#faf5eb] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">
                        Seattle Classical Music and Dance <span className="text-[#a07d3c]">School Directory</span>
                    </h1>
                    <p className="text-[#7a5c3a] font-medium text-lg max-w-2xl mx-auto">
                        Engage with premier schools and centers dedicated to Indian classical arts in the Seattle area.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#a07d3c]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, service, or location..."
                            className="block w-full pl-11 pr-4 py-3 border border-[#d4c4a8] rounded-full bg-white text-[#3d230d] shadow-sm focus:ring-2 focus:ring-[#a07d3c] focus:border-transparent outline-none transition-all placeholder:text-[#a07d3c]/60"
                        />
                    </div>
                    <p className="text-center text-sm text-[#7a5c3a] mt-3">{directoryData.length} schools found</p>
                </div>

                {/* Directory Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#d4c4a8] overflow-hidden mb-20">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#faf5eb] border-b border-[#d4c4a8] text-[#5c3a1e] font-bold text-sm">
                                    <th className="px-6 py-4">Organization</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Services</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4 text-center">Links</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#d4c4a8]/50">
                                {directoryData.map((school) => (
                                    <tr key={school.id} className="hover:bg-[#faf5eb]/30 transition-colors">
                                        {/* Organization */}
                                        <td className="px-6 py-5 font-semibold text-[#3d230d]">
                                            {school.name}
                                        </td>

                                        {/* Contact */}
                                        <td className="px-6 py-5 text-sm text-[#5c3a1e] space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-[#a07d3c]" />
                                                <a href={`mailto:${school.email}`} className="hover:underline">{school.email}</a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-[#a07d3c]" />
                                                <a href={`tel:${school.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">{school.phone}</a>
                                            </div>
                                        </td>

                                        {/* Services */}
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-2">
                                                {school.services.map((service, idx) => (
                                                    <span key={idx} className="bg-[#5c3a1e] text-[#faf5eb] text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Location */}
                                        <td className="px-6 py-5 text-sm text-[#5c3a1e]">
                                            {school.location}
                                        </td>

                                        {/* Links */}
                                        <td className="px-6 py-5 text-[#a07d3c]">
                                            <div className="flex items-center justify-center gap-3">
                                                {school.links.website && (
                                                    <a href={school.links.website} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors">
                                                        <Globe className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {school.links.facebook && (
                                                    <a href={school.links.facebook} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors">
                                                        <Facebook className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {school.links.instagram && (
                                                    <a href={school.links.instagram} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors">
                                                        <Instagram className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Call to Action Footer */}
                <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-[#d4c4a8] max-w-3xl mx-auto">
                    <h3 className="text-2xl font-serif font-bold text-[#3d230d] mb-3">
                        Teachers and Schools – Get Listed!
                    </h3>
                    <p className="text-[#7a5c3a] mb-8">
                        Be part of our Seattle music directory and connect with students seeking Indian classical arts education.
                    </p>
                    <Link href="/contact" className="inline-block bg-[#3d230d] text-[#faf5eb] hover:bg-[#5c3a1e] font-bold px-8 py-3 rounded-full transition-all shadow-md">
                        Join the Directory
                    </Link>
                </div>

            </div>
        </div>
    );
}
