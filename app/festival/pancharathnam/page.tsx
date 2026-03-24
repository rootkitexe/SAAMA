export default function PancharathnamPage() {
    return (
        <div className="bg-background min-h-screen py-16 px-4">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-serif font-bold text-white mb-6">Pancharathna Seva</h1>
                <p className="text-xl text-primary font-medium mb-12">The Jewel in the Crown of the Festival</p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                        The <strong>Pancharathna Krithis</strong> (five gems) are a set of five compositions by Saint Thyagaraja in the Ghana Ragas:
                        Nata, Gowla, Arabhi, Varali, and Sri. It is a time-honored tradition for musicians to gather and render these masterpieces in unison as a tribute to the Saint.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 py-6">
                        <div className="bg-black/30 p-4 rounded-lg">
                            <span className="block text-xs font-medium text-gray-500 uppercase">When</span>
                            <span className="block text-lg font-bold text-white mt-1">Saturday, April 2, 2026</span>
                            <span className="block text-sm text-gray-400">9:00 AM - 11:00 AM</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg">
                            <span className="block text-xs font-medium text-gray-500 uppercase">Where</span>
                            <span className="block text-lg font-bold text-white mt-1">Main Auditorium</span>
                            <span className="block text-sm text-gray-400">Seattle Center</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">Participation Guidelines</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li><strong>Open to All:</strong> No prior registration is required.</li>
                            <li><strong>Attire:</strong> Traditional Indian attire is mandatory for those seated on stage.</li>
                            <li><strong>Pitch (Sruthi):</strong> The group rendering will be at <strong>G (5 kattai)</strong> for men and standard overlap for women.</li>
                            <li><strong>Arrival:</strong> Please be seated by 8:45 AM.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

