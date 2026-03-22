import { Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-[#faf5eb] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-[#5c3a1e] mb-6">Contact Us</h1>
            </div>

            <div className="mx-auto max-w-3xl text-[#5c3a1e]">
                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 shadow-sm space-y-6">

                    <p className="text-[17px] leading-relaxed">
                        If you would like to stay informed about festival announcements, registration updates,
                        competition details, and performance opportunities, we invite you to join our mailing list.
                    </p>

                    <p className="text-[17px] leading-relaxed">
                        We also welcome individuals who are interested in volunteering at the festival or who would like
                        to share feedback, suggestions, or inquiries related to our website and programs.
                    </p>

                    <p className="text-[17px] leading-relaxed">
                        Local businesses and sponsors who wish to promote their services through our festival
                        platforms — including poster features on our social media channels or sponsor videos played
                        during event intermissions — are encouraged to reach out as well.
                    </p>

                    <div className="pt-4 border-t border-[#d4c4a8] flex flex-col items-center text-center">
                        <Mail className="h-8 w-8 text-[#8b0a30] mb-3" />
                        <p className="text-lg font-semibold mb-1">For all inquiries, please contact us at:</p>
                        <a href="mailto:saama.seattle@gmail.com" className="text-[#8b0a30] font-bold text-xl hover:underline">
                            saama.seattle@gmail.com
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
