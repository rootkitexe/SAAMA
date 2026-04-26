import { Heart, Building, Mail } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-serif font-bold text-[#5c3a1e] mb-6">Support Us</h1>
                <p className="text-xl text-[#7a5c3a] mb-12">
                    Your generosity helps us keep the rich tradition of Indian classical arts alive in the Pacific Northwest.
                </p>
            </div>

            {/* Donations Section */}
            <div className="mx-auto max-w-5xl mb-12">
                <div className="bg-white border border-[#d4c4a8] rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 border-b border-[#d4c4a8]/50 pb-6 mb-8">
                        <div className="h-14 w-14 bg-[#faf5eb] border border-[#d4c4a8] rounded-full flex items-center justify-center text-[#5c3a1e]">
                            <Heart className="h-6 w-6" fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#3d230d]">Ways to Donate</h2>
                            <p className="text-[#7a5c3a] mt-1 text-sm md:text-base">Support the Sadhana Academy for Musical Arts mission by making a tax-deductible donation. We are a registered 501(c)(3) non-profit organization.</p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Zeffy */}
                        <div className="p-6 bg-[#faf5eb] rounded-xl border border-[#d4c4a8]/60 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-[#5c3a1e] mb-2 text-lg">Direct Donation</h3>
                                <p className="text-sm text-[#7a5c3a] mb-6 leading-relaxed">Make a secure, direct financial contribution instantly through our Zeffy portal.</p>
                            </div>
                            <a 
                                href="https://www.zeffy.com/en-US/donation-form/supporting-the-next-generation" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block w-full text-center bg-[#3d230d] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#2a1809] transition-colors"
                            >
                                Donate via Zeffy
                            </a>
                        </div>
                        
                        {/* PayPal */}
                        <div className="p-6 bg-[#faf5eb] rounded-xl border border-[#d4c4a8]/60 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-[#5c3a1e] mb-2 text-lg">PayPal</h3>
                                <p className="text-sm text-[#7a5c3a] mb-5 leading-relaxed">Send your contribution securely to our official PayPal using the email or phone number below.</p>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div>
                                    <div className="text-[11px] font-bold text-[#7a5c3a] uppercase tracking-wider mb-1">Email ID</div>
                                    <div className="text-[13px] font-mono text-[#3d230d] bg-white border border-[#d4c4a8]/50 px-3 py-2 rounded-md select-all overflow-hidden text-ellipsis whitespace-nowrap" title="saama.seattle@gmail.com">
                                        saama.seattle@gmail.com
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[11px] font-bold text-[#7a5c3a] uppercase tracking-wider mb-1">Phone Number</div>
                                    <div className="text-[13px] font-mono text-[#3d230d] bg-white border border-[#d4c4a8]/50 px-3 py-2 rounded-md select-all">
                                        425-591-2391
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benevity */}
                        <div className="p-6 bg-[#faf5eb] rounded-xl border border-[#d4c4a8]/60 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-[#5c3a1e] mb-2 text-lg">Corporate Matching</h3>
                                <p className="text-sm text-[#7a5c3a] leading-relaxed">
                                    We are registered on <strong className="text-[#3d230d]">Benevity</strong>. Microsoft employees (and others) can amplify their impact through company matching.
                                </p>
                            </div>
                            <div className="mt-4 text-sm text-[#3d230d] font-medium bg-white p-3 rounded border border-[#d4c4a8]/40 text-center">
                                Search for <br/><span className="text-[#5c3a1e] font-serif italic text-base">“Sadhana Academy for Musical Arts”</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sponsorships */}
            <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
                {/* Prize Sponsorships */}
                <div className="bg-white border border-[#d4c4a8] rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="mx-auto h-16 w-16 bg-[#c8a03e]/10 rounded-full flex items-center justify-center text-[#c8a03e] mb-6">
                        <span className="text-3xl">🏆</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Prize Sponsorships</h2>
                    <p className="text-[#7a5c3a] leading-relaxed">
                        Sponsors will be recognized during the event and will have the opportunity to come on stage
                        and present the prize to the award recipient.
                    </p>
                </div>

                {/* Business Sponsorship */}
                <div className="bg-white border border-[#d4c4a8] rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="mx-auto h-16 w-16 bg-[#3d230d]/10 rounded-full flex items-center justify-center text-[#3d230d] mb-6">
                        <Building className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Business Sponsorship</h2>
                    <p className="text-[#7a5c3a] leading-relaxed">
                        Local businesses such as realtors, restaurants, and other community enterprises are invited to
                        support the festival through sponsorship. This is a wonderful opportunity to showcase your
                        business to a vibrant community. Sponsors will be recognized during the festival and provided visibility through our event materials.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl mt-16 text-center">
                <div className="flex flex-col items-center justify-center p-6 bg-white/80 border border-[#d4c4a8] rounded-xl shadow-sm">
                    <Mail className="h-6 w-6 text-[#3d230d] mb-2" />
                    <p className="text-[#5c3a1e] text-lg">
                        For more information about sponsorship opportunities, please email
                    </p>
                    <a href="mailto:saama.seattle@gmail.com" className="text-[#3d230d] font-bold text-lg mt-1 hover:underline">
                        saama.seattle@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
}

