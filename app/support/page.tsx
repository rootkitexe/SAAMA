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

            <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
                {/* Donations */}
                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="mx-auto h-16 w-16 bg-[#3d230d]/10 rounded-full flex items-center justify-center text-[#3d230d] mb-6">
                        <Heart className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Donations</h2>
                    <p className="text-[#7a5c3a] mb-6">
                        Support SaaMa's mission by making a tax-deductible donation. We are a 501(c)(3) non-profit organization.
                    </p>
                    <a
                        href="mailto:saama.seattle@gmail.com"
                        className="inline-flex items-center rounded-md bg-[#3d230d] px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-[#2a1809] transition-colors"
                    >
                        <Heart className="mr-2 h-5 w-5" />
                        Donate
                    </a>
                </div>

                {/* Prize Sponsorships */}
                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="mx-auto h-16 w-16 bg-[#c8a03e]/10 rounded-full flex items-center justify-center text-[#c8a03e] mb-6">
                        <span className="text-3xl">🏆</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Prize Sponsorships</h2>
                    <p className="text-[#7a5c3a]">
                        Sponsors will be recognized during the event and will have the opportunity to come on stage
                        and present the prize to the award recipient.
                    </p>
                </div>

                {/* Business Sponsorship */}
                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="mx-auto h-16 w-16 bg-[#3d230d]/10 rounded-full flex items-center justify-center text-[#3d230d] mb-6">
                        <Building className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Business Sponsorship</h2>
                    <p className="text-[#7a5c3a]">
                        Local businesses such as realtors, restaurants, and other community enterprises are invited to
                        support the festival through sponsorship. This is a wonderful opportunity to showcase your
                        business to a vibrant community of artists, families, and rasikas who attend the event.
                        Sponsors will be recognized during the festival and provided visibility through our event materials.
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

