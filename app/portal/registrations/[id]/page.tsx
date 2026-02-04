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
    const songs = registration.songs || []

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8">
            <div className="mx-auto max-w-4xl">
                <Link href="/portal" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Portal
                </Link>

                {/* Header Section */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium bg-green-400/10 text-green-400 ring-1 ring-inset ring-green-400/20">
                                    {registration.status === 'pending_payment' ? 'Registered' : registration.status}
                                </span>
                                <span className="text-sm text-gray-500 font-semibold border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                                    {registration.category}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                                {registration.competition_item}
                            </h1>
                            <p className="text-gray-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                Registration ID: <span className="font-mono text-white/70">#{registration.id}</span>
                            </p>
                        </div>

                        {/* Payment Action (Placeholder for now) */}
                        {registration.status === 'pending_payment' && (
                            <button className="whitespace-nowrap rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700 shadow-lg shadow-primary/20 transition-all">
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
                            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                                <Mic2 className="h-5 w-5 text-primary" /> Performance Details
                            </h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                <div className="p-4 bg-white/5 border-b border-white/5 grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <div className="col-span-4">Song</div>
                                    <div className="col-span-3">Raga</div>
                                    <div className="col-span-3">Tala</div>
                                    <div className="col-span-2">Composer</div>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {Array.isArray(songs) && songs.map((song: any, idx: number) => (
                                        <div key={idx} className="p-4 grid grid-cols-12 text-sm items-center hover:bg-white/5 transition-colors">
                                            <div className="col-span-4 font-medium text-white break-words pr-2">{song.song}</div>
                                            <div className="col-span-3 text-gray-300 break-words pr-2">{song.raga}</div>
                                            <div className="col-span-3 text-gray-300 break-words pr-2">{song.tala}</div>
                                            <div className="col-span-2 text-gray-400 break-words">{song.composer}</div>
                                        </div>
                                    ))}
                                    {(!Array.isArray(songs) || songs.length === 0) && (
                                        <div className="p-8 text-center text-gray-500 italic">
                                            No song details provided.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Participant Info */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                                <User className="h-5 w-5 text-primary" /> Participant Info
                            </h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">Full Name</label>
                                        <p className="text-white font-medium text-lg">{registration.student_name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">Date of Birth</label>
                                        <p className="text-white font-medium text-lg">{registration.dob ? new Date(registration.dob).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">Guru / School</label>
                                        <p className="text-white font-medium text-lg">{registration.guru_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" /> Application Status
                            </h3>
                            <div className="space-y-4">
                                <div className="relative pl-4 border-l-2 border-green-500">
                                    <p className="text-sm text-gray-300">Registration Submitted</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(registration.created_at || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={`relative pl-4 border-l-2 ${registration.status === 'confirmed' ? 'border-green-500' : 'border-gray-700'}`}>
                                    <p className={`text-sm ${registration.status === 'confirmed' ? 'text-gray-300' : 'text-gray-600'}`}>Payment</p>
                                    {registration.status === 'pending_payment' && (
                                        <p className="text-xs text-yellow-500 mt-1">Pending</p>
                                    )}
                                </div>
                                <div className="relative pl-4 border-l-2 border-gray-700">
                                    <p className="text-sm text-gray-600">Schedule Assigned</p>
                                    <p className="text-xs text-gray-600">TBD</p>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-xl p-6">
                            <p className="text-sm text-blue-200 mb-4">
                                Need to make changes to your registration?
                            </p>
                            <Link href="/contact" className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wide">
                                Contact Support &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
