import { Heart, CreditCard, Building, Mail } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="bg-background min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Support the Festival</h1>
                <p className="text-xl text-gray-400 mb-12">
                    Your generosity helps us keep the rich tradition of Indian Classical Arts alive in Seattle.
                </p>
            </div>

            <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
                {/* Online Donation */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors text-center">
                    <div className="mx-auto h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                        <Heart className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Make a Donation</h2>
                    <p className="text-gray-400 mb-8">
                        The simplest way to support us. We accept all major credit cards via our secure payment partner.
                    </p>
                    <a
                        href="https://square.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
                    >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Donate via Square
                    </a>
                </div>

                {/* Corporate Matching */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors text-center">
                    <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6">
                        <Building className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Employer Matching</h2>
                    <p className="text-gray-400 mb-8">
                        Many companies (Microsoft, Amazon, Google) match employee donations. Double your impact by submitting a match request.
                    </p>
                    <div className="text-sm text-gray-500 bg-black/30 p-4 rounded-lg inline-block">
                        <p>Search for: <strong>SAAMA Seattle Festival</strong></p>
                        <p>EIN: <strong>12-3456789</strong></p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-3xl mt-16 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Prefer to pay by Check?</h3>
                <div className="flex flex-col items-center justify-center p-6 bg-black/50 border border-white/10 rounded-xl">
                    <Mail className="h-6 w-6 text-gray-400 mb-2" />
                    <p className="text-gray-300">Make checks payable to <strong>"SAAMA Seattle"</strong></p>
                    <address className="not-italic text-gray-500 mt-2">
                        1234 Festival Way<br />
                        Seattle, WA 98000
                    </address>
                </div>
            </div>
        </div>
    );
}
