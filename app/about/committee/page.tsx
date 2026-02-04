export default function CommitteePage() {
    const members = [
        {
            name: "R. Balasubramaniam",
            role: "President",
            bio: "Affectionately known as 'Cleveland Balu', he has been the driving force behind the festival for over 30 years, building bridges across the globe."
        },
        {
            name: "Gomathy Balasubramaniam",
            role: "Vice President",
            bio: "Focuses on hospitality and volunteer coordination, ensuring every artist and attendee feels at home."
        },
        {
            name: "K. Venkataraman",
            role: "Founder",
            bio: "A pioneer who laid the foundation for the festival over 40 years ago."
        },
        {
            name: "Roger & Jaya Natarajan",
            role: "Treasurers",
            bio: "Managing finances, tax compliance, and corporate sponsorships to keep the festival sustainable."
        },
        {
            name: "Sunitha & Ashok Grandhee",
            role: "Education & Competitions",
            bio: "Spearheading the 'Sustaining Sampradaya' initiative and managing the massive music competition logistics."
        }
    ];

    return (
        <div className="bg-background min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl font-serif font-bold text-white text-center mb-12">The Committee</h1>

                <div className="prose prose-invert prose-lg mx-auto mb-16">
                    <p>
                        The SAAMA Seattle Festival is a labor of love, organized entirely by a dedicated group of volunteers.
                        Registered as a 501(c)(3) non-profit, our committee works year-round to bring the finest Indian classical arts to the Pacific Northwest.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                    {members.map((member, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors">
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 border-t border-white/10 pt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Logistics & Support Teams</h2>
                    <ul className="grid gap-4 sm:grid-cols-2 text-gray-300">
                        <li><strong>Shankar Sundaram:</strong> Competition Logistics</li>
                        <li><strong>Karthik Venkataraman:</strong> Stage & Audio Engineering</li>
                        <li><strong>Venkat Narayanaswamy:</strong> Venue Operations</li>
                        <li><strong>Arvind Balakrishnan:</strong> Volunteer Coordination</li>
                        <li><strong>Mony Iyer:</strong> Food & Catering</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
