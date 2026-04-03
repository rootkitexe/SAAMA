import Link from 'next/link';
import { Mail, Facebook, Instagram, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[#d4c4a8] py-16 px-6 sm:px-10 lg:px-12">
            <div className="mx-auto max-w-7xl">
                
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[#5c3a1e]">
                    
                    {/* Column 1: Logo & Description */}
                    <div className="flex flex-col items-start">
                        <img 
                            src="/logo.png" 
                            alt="SaaMa Logo" 
                            className="h-20 w-auto object-contain mb-4"
                        />
                        <p className="text-sm font-medium leading-relaxed text-[#7a5c3a]">
                            Celebrating and promoting Indian classical music, dance, and fine arts in the Pacific Northwest and beyond.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-serif font-bold text-[#3d230d] text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/festival/2026" className="hover:text-[#3d230d] transition-colors">Upcoming Festival</Link></li>
                            <li><Link href="/competitions" className="hover:text-[#3d230d] transition-colors">Competitions</Link></li>
                            <li><Link href="/gallery" className="hover:text-[#3d230d] transition-colors">Gallery</Link></li>
                            <li><Link href="/blog" className="hover:text-[#3d230d] transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-[#3d230d] transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-serif font-bold text-[#3d230d] text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li>
                                <a href="mailto:saama.seattle@gmail.com" className="flex items-center gap-3 hover:text-[#3d230d] transition-colors">
                                    <Mail className="w-5 h-5 text-[#d4c4a8]" />
                                    saama.seattle@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+14255912391" className="flex items-center gap-3 hover:text-[#3d230d] transition-colors">
                                    <Phone className="w-5 h-5 text-[#d4c4a8]" />
                                    (425) 591-2391
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Follow Us */}
                    <div>
                        <h4 className="font-serif font-bold text-[#3d230d] text-lg mb-6">Follow Us</h4>
                        <div className="flex items-center gap-4">
                            <a 
                                href="https://www.facebook.com/samaaseattle" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#faf5eb] border border-[#d4c4a8] flex items-center justify-center text-[#7a5c3a] hover:bg-[#d4c4a8] hover:text-[#3d230d] transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://www.instagram.com/saama.seattle/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#faf5eb] border border-[#d4c4a8] flex items-center justify-center text-[#7a5c3a] hover:bg-[#d4c4a8] hover:text-[#3d230d] transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-[#d4c4a8]/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#7a5c3a]">
                    <p>&copy; {new Date().getFullYear()} SAAMA Seattle Festival. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-[#3d230d] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#3d230d] transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

