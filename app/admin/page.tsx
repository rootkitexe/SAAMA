import { createClient } from '@/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import AdminClient from './AdminClient';

const ADMIN_EMAILS = ['saama.seattle@gmail.com', 'testuser@example.com', 'adminuser@saama.com'];

export default async function AdminPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return redirect('/portal'); // Redirect non-admins to their portal dashboard
    }

    // Instantiate admin client to bypass RLS
    const adminSupabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch all profiles
    const { data: profiles, error: profilesError } = await adminSupabase
        .from('profiles')
        .select('*')
        .order('full_name', { ascending: true });

    // Fetch all registrations
    const { data: registrations, error: regError } = await adminSupabase
        .from('registrations')
        .select('*')
        .order('id', { ascending: false });

    // Fetch all events
    const { data: events, error: eventsError } = await adminSupabase
        .from('upcoming_events')
        .select('*')
        .order('id', { ascending: false });

    // Fetch all blog posts
    const { data: blogPosts, error: blogError } = await adminSupabase
        .from('blog_posts')
        .select('*')
        .order('id', { ascending: false });

    // Note: Due to Row Level Security, these might return empty arrays unless we add Admin RLS policies.
    // We will instruct the user to add those policies.

    if (profilesError) console.error("Profiles Error:", profilesError);
    if (regError) console.error("Registrations Error:", regError);
    if (eventsError) console.error("Events Error:", eventsError);
    if (blogError) console.error("Blog Error:", blogError);

    return (
        <div className="min-h-screen bg-[#faf5eb] py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-[#5c3a1e]">SaaMa Admin Area</h1>
                    <p className="text-[#3d230d] font-bold mt-1 text-sm bg-white inline-block px-3 py-1 rounded shadow-sm border border-[#d4c4a8]">
                        Logged in as Administrator: {user.email}
                    </p>
                </div>

                {/* If data fetch failed or returned nothing, it might be RLS blocking us */}
                {(profilesError || regError) && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-6">
                        Error fetching data. Ensure Admin Row-Level-Security (RLS) policies are applied in Supabase.
                    </div>
                )}

                <AdminClient 
                    initialProfiles={profiles || []} 
                    initialRegistrations={registrations || []}
                    initialEvents={events || []} 
                    initialBlogPosts={blogPosts || []}
                />
            </div>
        </div>
    );
}

