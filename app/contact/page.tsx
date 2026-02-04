import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-16">
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Contact Us</h1>
                <p className="text-xl text-gray-400">
                    Have questions? Reach out to the specific team below.
                </p>
            </div>

            <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2">
                {/* Email Contacts */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Email Contacts</h2>

                    <div className="space-y-6">
                        {[
                            { role: "General Inquiries", email: "info@saamaseattle.org" },
                            { role: "Music Competitions", email: "music@saamaseattle.org" },
                            { role: "Dance Competitions", email: "dance@saamaseattle.org" },
                            { role: "Sponsorships", email: "sponsor@saamaseattle.org" },
                            { role: "Volunteering", email: "volunteer@saamaseattle.org" },
                        ].map((contact, idx) => (
                            <div key={idx} className="flex items-center justify-between group">
                                <span className="text-gray-300 font-medium">{contact.role}</span>
                                <a href={`mailto:${contact.email}`} className="text-primary hover:text-white transition-colors flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {contact.email}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mailing Address & Venue */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Locations</h2>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                            <MapPin className="h-5 w-5 text-primary mr-2" />
                            Mailing Address
                        </h3>
                        <address className="not-italic text-gray-400 pl-7">
                            SAAMA Seattle Committee<br />
                            1234 Festival Way<br />
                            Seattle, WA 98000
                        </address>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                            <MapPin className="h-5 w-5 text-secondary mr-2" />
                            Main Venue
                        </h3>
                        <address className="not-italic text-gray-400 pl-7">
                            Seattle Center<br />
                            305 Harrison St<br />
                            Seattle, WA 98109
                        </address>
                    </div>
                </div>
            </div>
        </div>
    );
}
