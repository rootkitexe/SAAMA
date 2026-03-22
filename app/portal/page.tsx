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
        <div className="min-h-screen bg-background p-4 sm:p-8" >
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white">Participant Portal</h1>
                        <p className="text-gray-400 mt-1 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Welcome back, <span className="text-primary">{user.email}</span>
                        </p>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                            Sign Out
                        </button>
                    </form>
                </header>

                {/* Dashboard Grid */}
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Main Content: Registrations */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-white">My Registrations</h2>

                        {registrations && registrations.length > 0 ? (
                            <div className="space-y-4">
                                {registrations.map((reg) => (
                                    <div key={reg.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-green-400/10 text-green-400 ring-1 ring-inset ring-green-400/20">
                                                    {reg.status === 'pending_payment' ? 'Registered' : reg.status}
                                                </span>
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold border border-white/10 px-2 py-0.5 rounded">
                                                    {reg.category}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">{reg.competition_item}</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                    {getSchedule(reg.competition_item)}
                                                </div>
                                                <div className="hidden sm:block text-gray-700">•</div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-secondary" />
                                                    {getVenue(reg.competition_item)}
                                                </div>
                                            </div>
                                        </div>

                                        <a href={`/portal/registrations/${reg.id}`} className="whitespace-nowrap rounded-md bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-600/30 transition-colors text-center">
                                            View Details
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10 border-dashed">
                                <Music className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                                <h3 className="text-white font-medium">No registrations yet</h3>
                                <p className="text-gray-500 text-sm mt-1">Start by browsing our competitions.</p>
                                <a href="/competitions" className="mt-4 inline-block text-primary hover:text-white text-sm font-semibold">
                                    Browse Competitions &rarr;
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Quick Actions */}
                    <div className="space-y-6">
                        <div className="rounded-xl bg-gradient-to-br from-primary/20 to-black border border-primary/20 p-6">
                            <h3 className="text-lg font-bold text-white mb-2">New Registration</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Registration for 2026 is now open! Secure your spot in the competitions.
                            </p>
                            <a href="/portal/register" className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-bold text-white shadow-sm hover:bg-red-700">
                                Register New Entry
                            </a>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                            <h3 className="text-md font-bold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li>
                                    <a href="/portal/profile" className="hover:text-primary transition-colors flex items-center justify-between">
                                        Edit Profile <span>&rarr;</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/competitions" className="hover:text-primary transition-colors flex items-center justify-between">
                                        Competition Rules <span>&rarr;</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:text-primary transition-colors flex items-center justify-between">
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
