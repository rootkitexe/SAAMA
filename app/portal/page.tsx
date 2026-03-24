import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Calendar, MapPin, Music, User } from 'lucide-react'

export default async function PortalPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    // Fetch real registrations
    const { data: registrations, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false })

    if (error) {
        console.error("Error fetching registrations:", JSON.stringify(error, null, 2))
    } else {
        console.log("Fetched registrations:", registrations)
    }

    // Mock schedule data mapping for demo purposes (since we don't have a schedule table yet)
    const getSchedule = (item: string) => {
        if (item.includes('Vocal')) return "April 3, 2026 @ 10:00 AM"
        if (item.includes('Violin')) return "April 4, 2026 @ 2:00 PM"
        return "TBD"
    }

    const getVenue = (item: string) => {
        if (item.includes('Vocal')) return "Room A, Seattle Center"
        if (item.includes('Violin')) return "Room B, Seattle Center"
        return "TBA"
    }

    return (
        <div className="min-h-screen bg-[#faf5eb] p-4 sm:p-8" >
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#d4c4a8] pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-[#3d230d]">Participant Portal</h1>
                        <p className="text-[#7a5c3a] mt-1 flex items-center gap-2 font-medium">
                            <User className="h-4 w-4" />
                            Welcome back, <span className="text-[#3d230d] font-bold">{user.email}</span>
                        </p>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="rounded-lg bg-white border border-[#d4c4a8] px-4 py-2 text-sm font-bold text-[#3d230d] hover:bg-[#f0ebe0] transition-colors shadow-sm">
                            Sign Out
                        </button>
                    </form>
                </header>

                {/* Dashboard Grid */}
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Main Content: Registrations */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-[#3d230d]">My Registrations</h2>

                        {registrations && registrations.length > 0 ? (
                            <div className="space-y-4">
                                {registrations.map((reg) => (
                                    <div key={reg.id} className="bg-white border border-[#d4c4a8] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20">
                                                    {reg.status === 'pending_payment' ? 'Registered' : reg.status}
                                                </span>
                                                <span className="text-xs text-[#7a5c3a] uppercase tracking-wider font-bold border border-[#d4c4a8] px-2 py-0.5 rounded-full bg-[#faf5eb]">
                                                    {reg.category}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[#3d230d]">{reg.competition_item}</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-[#7a5c3a] font-medium">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-[#3d230d]" />
                                                    {getSchedule(reg.competition_item)}
                                                </div>
                                                <div className="hidden sm:block text-[#d4c4a8]">•</div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-[#3d230d]" />
                                                    {getVenue(reg.competition_item)}
                                                </div>
                                            </div>
                                        </div>

                                        <a href={`/portal/registrations/${reg.id}`} className="whitespace-nowrap rounded-lg bg-[#3d230d] px-4 py-2 text-sm font-bold text-white hover:bg-[#2a1809] transition-colors text-center shadow">
                                            View Details
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-[#d4c4a8] border-dashed shadow-sm">
                                <Music className="h-8 w-8 text-[#d4c4a8] mx-auto mb-3" />
                                <h3 className="text-[#3d230d] font-bold text-lg">No registrations yet</h3>
                                <p className="text-[#7a5c3a] text-sm mt-1">Start by browsing our competitions.</p>
                                <a href="/competitions" className="mt-4 inline-block text-[#3d230d] hover:underline text-sm font-bold">
                                    Browse Competitions &rarr;
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Quick Actions */}
                    <div className="space-y-6">
                        <div className="rounded-xl bg-[#3d230d] border border-[#d4c4a8] p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-2">New Registration</h3>
                            <p className="text-white/80 text-sm mb-6">
                                Registration for 2026 is now open! Secure your spot in the competitions.
                            </p>
                            <a href="/portal/register" className="block w-full rounded-lg bg-[#faf5eb] px-3 py-2 text-center text-sm font-bold text-[#3d230d] shadow-sm hover:bg-white transition-colors">
                                Register New Entry
                            </a>
                        </div>

                        <div className="rounded-xl bg-white border border-[#d4c4a8] p-6 shadow-sm">
                            <h3 className="text-[#3d230d] font-bold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-[#7a5c3a]">
                                <li>
                                    <a href="/portal/profile" className="hover:text-[#3d230d] font-bold transition-colors flex items-center justify-between">
                                        Edit Profile <span>&rarr;</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/competitions" className="hover:text-[#3d230d] font-bold transition-colors flex items-center justify-between">
                                        Competition Rules <span>&rarr;</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:text-[#3d230d] font-bold transition-colors flex items-center justify-between">
                                        Contact Support <span>&rarr;</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

