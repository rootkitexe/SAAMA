export default function AwardsPage() {
    const awards = [
        {
            title: "Sangeetha Rathnakara",
            desc: "Our highest honor for lifetime achievement in the field of Carnatic Music."
        },
        {
            title: "Nrithya Rathnakara",
            desc: "Lifetime achievement award for excellence in Bharathanatyam and classical dance."
        },
        {
            title: "Sangeetha Kala Sagaram",
            desc: "Awarded to distinguished artists who have made significant contributions to the art form."
        },
        {
            title: "Acharya Rathnakara",
            desc: "Recognizing exemplary Gurus who have dedicated their lives to teaching and propogating the arts."
        },
        {
            title: "Kala Seva Mani",
            desc: "For dedicated service to the arts community and festival organization."
        }
    ];

    return (
        <div className="bg-background min-h-screen py-16 px-4">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl font-serif font-bold text-white text-center mb-6">Titles & Awards</h1>
                <p className="text-center text-gray-400 mb-16">
                    The SAAMA Seattle Festival honors legends and dedicated servants of the art form with the following titles.
                </p>

                <div className="space-y-6">
                    {awards.map((award, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                            <div className="md:w-1/3">
                                <h3 className="text-xl font-bold text-secondary font-serif">{award.title}</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-gray-300">{award.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

