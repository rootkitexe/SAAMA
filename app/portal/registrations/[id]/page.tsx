import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, User, Music, Mic2, ArrowLeft, Clock, CreditCard } from 'lucide-react'

export default async function RegistrationDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { data: registration, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single()

    if (error || !registration) {
        console.error("Error fetching registration:", error)
        return notFound()
    }

    // Parse songs if strictly needed, though Supabase returns JSONB as object/array usually
    const songData: any = registration.songs || {}

    return (
        <div className="min-h-screen bg-[#faf5eb] text-[#3d230d] p-4 sm:p-8">
            <div className="mx-auto max-w-4xl">
                <Link href="/portal" className="inline-flex items-center text-[#7a5c3a] hover:text-[#3d230d] mb-6 transition-colors font-bold">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Portal
                </Link>

                {/* Header Section */}
                <div className="bg-white border border-[#d4c4a8] rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-bold bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20">
                                    {registration.status === 'pending_payment' ? 'Registered' : registration.status}
                                </span>
                                <span className="text-sm text-[#7a5c3a] font-bold border border-[#d4c4a8] px-2 py-0.5 rounded uppercase tracking-wider bg-[#faf5eb]">
                                    {registration.category}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3d230d] mb-2">
                                {registration.competition_item}
                            </h1>
                            <p className="text-[#7a5c3a] flex items-center gap-2 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3d230d]/50" />
                                Registration ID: <span className="font-mono text-[#3d230d]/70">#{registration.id}</span>
                            </p>
                        </div>

                        {/* Payment Action (Placeholder for now) */}
                        {registration.status === 'pending_payment' && (
                            <button className="whitespace-nowrap rounded-md bg-[#3d230d] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2a1809] shadow-lg transition-all">
                                Proceed to Payment
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">

                    {/* Left Column: Details */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Songs Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-[#d4c4a8] pb-2 text-[#3d230d]">
                                <Mic2 className="h-5 w-5 text-[#3d230d]" /> Performance Details
                            </h2>
                            <div className="bg-white border border-[#d4c4a8] rounded-xl overflow-hidden shadow-sm">
                                {registration.competition_item === 'Alapana' && songData.alapana ? (
                                    <>
                                        <div className="p-4 bg-[#faf5eb] border-b border-[#d4c4a8] grid grid-cols-3 text-xs font-bold text-[#7a5c3a] uppercase tracking-wider">
                                            <div>Raga 1</div>
                                            <div>Raga 2</div>
                                            <div>Raga 3</div>
                                        </div>
                                        <div className="p-4 grid grid-cols-3 text-sm items-center hover:bg-[#faf5eb] transition-colors">
                                            <div className="font-bold text-[#3d230d] break-words pr-2">{songData.alapana.raga1}</div>
                                            <div className="font-bold text-[#3d230d] break-words pr-2">{songData.alapana.raga2}</div>
                                            <div className="font-bold text-[#3d230d] break-words pr-2">{songData.alapana.raga3}</div>
                                        </div>
                                    </>
                                ) : registration.competition_item === 'Viruttham' && songData.viruttham ? (
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <p className="text-xs font-bold text-[#7a5c3a] uppercase tracking-wider mb-1">Sahityam</p>
                                            <p className="text-sm font-medium text-[#3d230d]">{songData.viruttham.sahityam}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#7a5c3a] uppercase tracking-wider mb-2">Ragas</p>
                                            <div className="flex flex-wrap gap-2">
                                                {[songData.viruttham.raga1, songData.viruttham.raga2, songData.viruttham.raga3, songData.viruttham.raga4].filter(Boolean).map((raga, idx) => (
                                                    <span key={idx} className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-[#faf5eb] text-[#3d230d] border border-[#d4c4a8]">
                                                        {raga}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-4 bg-[#faf5eb] border-b border-[#d4c4a8] grid grid-cols-12 text-xs font-bold text-[#7a5c3a] uppercase tracking-wider">
                                            <div className="col-span-4">Song</div>
                                            <div className="col-span-3">Raga</div>
                                            <div className="col-span-3">Tala</div>
                                            <div className="col-span-2">Composer</div>
                                        </div>
                                        <div className="divide-y divide-[#d4c4a8]">
                                            {Array.isArray(songData.songs) && songData.songs.length > 0 ? (
                                                songData.songs.map((song: any, idx: number) => (
                                                    <div key={idx} className="p-4 grid grid-cols-12 text-sm items-center hover:bg-[#faf5eb] transition-colors">
                                                        <div className="col-span-4 font-bold text-[#3d230d] break-words pr-2">{song.song}</div>
                                                        <div className="col-span-3 text-[#5c3a1e] font-medium break-words pr-2">{song.raga}</div>
                                                        <div className="col-span-3 text-[#5c3a1e] font-medium break-words pr-2">{song.tala}</div>
                                                        <div className="col-span-2 text-[#7a5c3a] break-words">{song.composer}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center text-gray-500 italic">
                                                    No song details provided.
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Participant Info */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-[#d4c4a8] pb-2 text-[#3d230d]">
                                <User className="h-5 w-5 text-[#3d230d]" /> Participant Info
                            </h2>
                            <div className="bg-white border border-[#d4c4a8] rounded-xl p-6 shadow-sm">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs text-[#7a5c3a] font-bold uppercase mb-1">Full Name</label>
                                        <p className="text-[#3d230d] font-bold text-lg">{registration.student_name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#7a5c3a] font-bold uppercase mb-1">Date of Birth</label>
                                        <p className="text-[#3d230d] font-bold text-lg">{registration.dob ? new Date(registration.dob).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#7a5c3a] font-bold uppercase mb-1">Guru / School</label>
                                        <p className="text-[#3d230d] font-bold text-lg">{registration.guru_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white border border-[#d4c4a8] rounded-xl p-6 space-y-4 shadow-sm">
                            <h3 className="font-bold text-[#3d230d] flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#7a5c3a]" /> Application Status
                            </h3>
                            <div className="space-y-4">
                                <div className="relative pl-4 border-l-2 border-green-600">
                                    <p className="text-sm text-[#3d230d] font-medium">Registration Submitted</p>
                                    <p className="text-xs text-[#7a5c3a]">
                                        {new Date(registration.created_at || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={`relative pl-4 border-l-2 ${registration.status === 'confirmed' ? 'border-green-600' : 'border-[#d4c4a8]'}`}>
                                    <p className={`text-sm font-medium ${registration.status === 'confirmed' ? 'text-[#3d230d]' : 'text-[#7a5c3a]'}`}>Payment</p>
                                    {registration.status === 'pending_payment' && (
                                        <p className="text-xs text-orange-600 font-bold mt-1">Pending</p>
                                    )}
                                </div>
                                <div className="relative pl-4 border-l-2 border-[#d4c4a8]">
                                    <p className="text-sm text-[#7a5c3a]">Schedule Assigned</p>
                                    <p className="text-xs text-[#7a5c3a]">TBD</p>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-[#3d230d] border border-[#d4c4a8] rounded-xl p-6 shadow-lg">
                            <p className="text-sm text-white/90 mb-4 font-medium">
                                Need to make changes to your registration?
                            </p>
                            <Link href="/contact" className="text-xs font-bold text-[#ffd700] hover:text-white uppercase tracking-wide">
                                Contact Support &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
