import { Ticket } from 'lucide-react';

export default function TicketsPage() {
    const passes = [
        {
            name: "Season Pass",
            price: "$300",
            features: ["Access to ALL concerts (April 1-12)", "Priority Seating", "Complimentary Program Guide"],
            recommended: true
        },
        {
            name: "Extended Weekend Pass",
            price: "$150",
            features: ["Valid for Fri-Sun (Opening or Finale)", "Access to major evening concerts", "General Seating"]
        },
        {
            name: "Single Day Ticket",
            price: "$40",
            features: ["Valid for any one day", "Includes morning & evening sessions", "First-come-first-serve seating"]
        }
    ];

    return (
        <div className="bg-background min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-4xl font-serif font-bold text-white text-center mb-6">Tickets & Passes</h1>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
                    While many morning programs are free, tickets are required for evening concerts and special dance dramas.
                    Support the arts by purchasing a Season Pass.
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                    {passes.map((pass, idx) => (
                        <div key={idx} className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${pass.recommended ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'bg-white/5 border-white/10'}`}>
                            {pass.recommended && (
                                <span className="absolute top-0 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Best Value
                                </span>
                            )}
                            <h3 className="text-lg font-semibold text-white">{pass.name}</h3>
                            <p className="mt-4 flex items-baseline text-white">
                                <span className="text-3xl font-bold tracking-tight">{pass.price}</span>
                            </p>
                            <ul className="mt-8 mb-8 space-y-4 flex-1">
                                {pass.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start">
                                        <Ticket className="h-5 w-5 text-primary shrink-0 mr-3" />
                                        <span className="text-sm text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${pass.recommended ? 'bg-primary text-white hover:bg-red-700' : 'bg-white text-black hover:bg-gray-200'}`}>
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white/5 border border-white/10 rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Ticket Policy</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Tickets are required for all attendees aged 5 and above.</li>
                        <li>Online purchases will receive a QR code via email.</li>
                        <li>Student discounts (50% off) available at the venue with valid ID.</li>
                        <li>All sales are final. No refunds.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
