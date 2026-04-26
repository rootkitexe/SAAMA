'use client';

import React, { useState } from 'react';
import { Download, Users, FileText, ChevronDown, ChevronUp, Calendar, Plus, Loader2, Trash2, BookOpen, MapPin } from 'lucide-react';
import { addUpcomingEvent, deleteUpcomingEvent, addBlogPost, deleteBlogPost, addDirectoryEntry, deleteDirectoryEntry } from './actions';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

type Profile = any;
type Registration = any;

interface Props {
    initialProfiles: Profile[];
    initialRegistrations: Registration[];
    initialEvents: any[];
    initialBlogPosts: any[];
    initialDirectory: any[];
}

function SubmitButton({ pendingText = 'Saving...', defaultText = 'Confirm & Add' }: { pendingText?: string, defaultText?: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="bg-green-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-800 disabled:opacity-50 flex items-center gap-2 shadow">
            {pending ? <Loader2 className="animate-spin h-4 w-4"/> : <Plus className="h-4 w-4"/>}
            {pending ? pendingText : defaultText}
        </button>
    );
}

export default function AdminClient({ initialProfiles, initialRegistrations, initialEvents, initialBlogPosts, initialDirectory }: Props) {
    const router = useRouter();
    const [tab, setTab] = useState<'registrations' | 'users' | 'events' | 'blog' | 'directory'>('registrations');
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventFormError, setEventFormError] = useState('');
    const [eventToDelete, setEventToDelete] = useState<number | null>(null);

    const [showBlogForm, setShowBlogForm] = useState(false);
    const [blogFormError, setBlogFormError] = useState('');
    const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

    const [showDirForm, setShowDirForm] = useState(false);
    const [dirFormError, setDirFormError] = useState('');
    const [dirToDelete, setDirToDelete] = useState<number | null>(null);

    const handleAddEvent = async (formData: FormData) => {
        setEventFormError('');
        const res = await addUpcomingEvent(formData);
        if (res?.error) {
            setEventFormError(res.error);
        } else {
            setShowEventForm(false);
            router.refresh();
        }
    };

    const handleDeleteEvent = async (id: number) => {
        setEventFormError('');
        const res = await deleteUpcomingEvent(id);
        if (res?.error) {
            setEventFormError(res.error);
        } else {
            router.refresh();
        }
    };

    const handleAddBlog = async (formData: FormData) => {
        setBlogFormError('');
        const res = await addBlogPost(formData);
        if (res?.error) {
            setBlogFormError(res.error);
        } else {
            setShowBlogForm(false);
            router.refresh();
        }
    };

    const handleDeleteBlog = async (id: number) => {
        setBlogFormError('');
        const res = await deleteBlogPost(id);
        if (res?.error) {
            setBlogFormError(res.error);
        } else {
            router.refresh();
        }
    };

    const handleAddDirectory = async (formData: FormData) => {
        setDirFormError('');
        const res = await addDirectoryEntry(formData);
        if (res?.error) {
            setDirFormError(res.error);
        } else {
            setShowDirForm(false);
            router.refresh();
        }
    };

    const handleDeleteDirectory = async (id: number) => {
        setDirFormError('');
        const res = await deleteDirectoryEntry(id);
        if (res?.error) {
            setDirFormError(res.error);
        } else {
            router.refresh();
        }
    };

    // Filters for registrations
    const [categoryFilter, setCategoryFilter] = useState('');
    const [itemFilter, setItemFilter] = useState('');

    const filteredRegistrations = initialRegistrations.filter(r => {
        if (categoryFilter && r.category !== categoryFilter) return false;
        if (itemFilter && r.competition_item !== itemFilter) return false;
        return true;
    });

    const exportCsv = () => {
        if (tab === 'registrations') {
            const headers = ['ID', 'User ID', 'Student Name', 'DOB', 'Main Category', 'Competition Item', 'Status', 'Payment ID', 'Submitted Date', 'Ragas/Songs (JSON)'];
            const rows = filteredRegistrations.map(r => [
                r.id,
                r.user_id,
                `"${r.student_name || ''}"`,
                r.dob || '',
                r.category || '',
                r.competition_item || '',
                r.status || '',
                r.payment_id || '',
                new Date(r.created_at).toLocaleDateString(),
                `"${JSON.stringify(r.songs || {}).replace(/"/g, '""')}"`
            ]);
            downloadCsv(headers, rows, 'saama_registrations.csv');
        } else {
            const headers = ['ID', 'Email', 'Full Name', 'Birthday', 'Sex', 'Mobile', 'Address', 'City', 'State', 'Zip'];
            const rows = initialProfiles.map(p => [
                p.id,
                p.email || '',
                `"${p.full_name || ''}"`,
                p.birthday || '',
                p.sex || '',
                p.mobile || '',
                `"${p.address || ''}"`,
                `"${p.city || ''}"`,
                p.state || '',
                p.zip || ''
            ]);
            downloadCsv(headers, rows, 'saama_users.csv');
        }
    };

    const downloadCsv = (headers: string[], rows: (string | number)[][], filename: string) => {
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderSongDetails = (songs: any) => {
        if (!songs) return <p className="text-gray-500 italic">No details submitted.</p>;
        
        if (songs.alapana) {
            return (
                <div className="space-y-1">
                    <p className="font-semibold text-[#3d230d]">Alapana Ragas:</p>
                    <ul className="list-disc list-inside ml-2">
                        <li>Raga 1: {songs.alapana.raga1}</li>
                        <li>Raga 2: {songs.alapana.raga2}</li>
                        <li>Raga 3: {songs.alapana.raga3}</li>
                    </ul>
                </div>
            );
        }

        if (songs.viruttham) {
            return (
                <div className="space-y-1">
                    <p><span className="font-semibold text-[#3d230d]">Sahityam:</span> {songs.viruttham.sahityam}</p>
                    <p className="font-semibold text-[#3d230d] mt-2">Viruttham Ragas:</p>
                    <ul className="list-disc list-inside ml-2">
                        <li>{songs.viruttham.raga1}</li>
                        <li>{songs.viruttham.raga2}</li>
                        <li>{songs.viruttham.raga3}</li>
                        <li>{songs.viruttham.raga4}</li>
                    </ul>
                </div>
            );
        }

        if (songs.songs && Array.isArray(songs.songs)) {
            return (
                <table className="min-w-full divide-y border border-[#d4c4a8] mt-2 text-sm">
                    <thead className="bg-[#faf5eb]">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-[#5c3a1e]">Song</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-[#5c3a1e]">Raga</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-[#5c3a1e]">Tala</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-[#5c3a1e]">Composer</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y border-t border-[#d4c4a8]">
                        {songs.songs.map((s: any, idx: number) => (
                            <tr key={idx} className="bg-white">
                                <td className="px-3 py-2">{s.song}</td>
                                <td className="px-3 py-2">{s.raga}</td>
                                <td className="px-3 py-2">{s.tala}</td>
                                <td className="px-3 py-2">{s.composer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        return <pre className="text-xs bg-gray-50 p-2 rounded">{JSON.stringify(songs, null, 2)}</pre>;
    };

    return (
        <div className="bg-white/90 border border-[#d4c4a8] rounded-xl shadow-sm overflow-hidden">
            
            {/* Tabs & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-[#d4c4a8] bg-[#faf5eb]/50">
                <div className="flex space-x-1 border border-[#d4c4a8] p-1 rounded-lg bg-white">
                    <button
                        onClick={() => setTab('registrations')}
                        className={`flex items-center px-4 py-2 text-sm font-bold rounded-md transition-colors ${tab === 'registrations' ? 'bg-[#3d230d] text-white shadow' : 'text-[#7a5c3a] hover:bg-[#faf5eb]'}`}
                    >
                        <FileText className="h-4 w-4 mr-2" /> Registrations ({initialRegistrations.length})
                    </button>
                    <button
                        onClick={() => setTab('users')}
                        className={`flex items-center px-4 py-2 text-sm font-bold rounded-md transition-colors ${tab === 'users' ? 'bg-[#3d230d] text-white shadow' : 'text-[#7a5c3a] hover:bg-[#faf5eb]'}`}
                    >
                        <Users className="h-4 w-4 mr-2" /> Users ({initialProfiles.length})
                    </button>
                    <button
                        onClick={() => setTab('events')}
                        className={`flex items-center px-4 py-2 text-sm font-bold rounded-md transition-colors ${tab === 'events' ? 'bg-[#3d230d] text-white shadow' : 'text-[#7a5c3a] hover:bg-[#faf5eb]'}`}
                    >
                        <Calendar className="h-4 w-4 mr-2" /> Events ({initialEvents.length})
                    </button>
                    <button
                        onClick={() => setTab('blog')}
                        className={`flex items-center px-4 py-2 text-sm font-bold rounded-md transition-colors ${tab === 'blog' ? 'bg-[#3d230d] text-white shadow' : 'text-[#7a5c3a] hover:bg-[#faf5eb]'}`}
                    >
                        <BookOpen className="h-4 w-4 mr-2" /> Blog ({initialBlogPosts.length})
                    </button>
                    <button
                        onClick={() => setTab('directory')}
                        className={`flex items-center px-4 py-2 text-sm font-bold rounded-md transition-colors ${tab === 'directory' ? 'bg-[#3d230d] text-white shadow' : 'text-[#7a5c3a] hover:bg-[#faf5eb]'}`}
                    >
                        <MapPin className="h-4 w-4 mr-2" /> Directory ({initialDirectory.length})
                    </button>
                </div>
                <button
                    onClick={exportCsv}
                    className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-green-700 text-white text-sm font-bold rounded-md hover:bg-green-800 transition-colors shadow"
                >
                    <Download className="h-4 w-4 mr-2" /> Export to CSV
                </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
                
                {tab === 'registrations' && (
                    <div className="space-y-4">
                        {/* Filters */}
                        <div className="flex gap-4 mb-6">
                            <select 
                                value={itemFilter} 
                                onChange={(e) => setItemFilter(e.target.value)}
                                className="border border-[#d4c4a8] rounded px-3 py-2 text-sm text-[#5c3a1e] bg-white"
                            >
                                <option value="">All Categories</option>
                                <option value="Geetham">Geetham</option>
                                <option value="Varnam">Varnam</option>
                                <option value="Krithi">Krithi</option>
                                <option value="Thillana">Thillana</option>
                                <option value="Viruttham">Viruttham</option>
                                <option value="Alapana">Alapana</option>
                            </select>
                        </div>

                        {/* Registrations Table */}
                        <div className="overflow-x-auto border border-[#d4c4a8] rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#3d230d] text-white font-medium uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3">Student Name</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3 text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#d4c4a8] bg-white">
                                    {filteredRegistrations.map((reg) => (
                                        <React.Fragment key={reg.id}>
                                            <tr className="hover:bg-[#faf5eb] transition-colors">
                                                <td className="px-4 py-3 font-semibold text-[#5c3a1e]">{reg.student_name}</td>
                                                <td className="px-4 py-3 text-[#7a5c3a] font-medium">{reg.competition_item}</td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        {reg.status === 'pending_payment' ? 'Registered' : reg.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-[#7a5c3a]">{new Date(reg.created_at).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button 
                                                        onClick={() => setExpandedRowId(expandedRowId === reg.id ? null : reg.id)}
                                                        className="inline-flex items-center text-[#3d230d] hover:underline font-bold"
                                                    >
                                                        {expandedRowId === reg.id ? <><ChevronUp className="h-4 w-4 mr-1"/> Hide Details</> : <><ChevronDown className="h-4 w-4 mr-1"/> View Details</>}
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Expanded Details Row */}
                                            {expandedRowId === reg.id && (
                                                <tr className="bg-orange-50/50">
                                                    <td colSpan={5} className="px-6 py-4 border-l-4 border-[#3d230d]">
                                                        <div className="text-[#5c3a1e]">
                                                            <div className="mb-4 text-xs">
                                                                <span className="font-bold">Payment ID:</span> {reg.payment_id || 'N/A'} <br/>
                                                                <span className="font-bold">Birthday:</span> {reg.dob}
                                                            </div>
                                                            <h4 className="font-bold mb-2">Submitted Repertoire:</h4>
                                                            {renderSongDetails(reg.songs)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    {filteredRegistrations.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-[#7a5c3a]">
                                                No registrations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {tab === 'users' && (
                    <div className="overflow-x-auto border border-[#d4c4a8] rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#5c3a1e] text-white font-medium uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Full Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Birthday</th>
                                    <th className="px-4 py-3">Mobile</th>
                                    <th className="px-4 py-3">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#d4c4a8] bg-white">
                                {initialProfiles.map((profile) => (
                                    <tr key={profile.id} className="hover:bg-[#faf5eb] transition-colors">
                                        <td className="px-4 py-3 font-semibold text-[#5c3a1e]">{profile.full_name || '—'}</td>
                                        <td className="px-4 py-3 text-[#7a5c3a]">{profile.email}</td>
                                        <td className="px-4 py-3 text-[#7a5c3a]">{profile.birthday || '—'}</td>
                                        <td className="px-4 py-3 text-[#7a5c3a]">{profile.mobile || '—'}</td>
                                        <td className="px-4 py-3 text-[#7a5c3a]">{profile.city ? `${profile.city}, ${profile.state}` : '—'}</td>
                                    </tr>
                                ))}
                                {initialProfiles.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-[#7a5c3a]">
                                            No user profiles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {tab === 'events' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-[#d4c4a8] pb-4">
                            <h3 className="text-xl font-bold text-[#3d230d]">Upcoming Events Platform</h3>
                            <button onClick={() => setShowEventForm(!showEventForm)} className="flex items-center gap-2 bg-[#3d230d] text-white px-4 py-2 rounded-lg hover:bg-[#2a1809] font-bold shadow">
                                <Plus className="h-4 w-4" /> Add Event
                            </button>
                        </div>
                        
                        {showEventForm && (
                            <form action={handleAddEvent} className="bg-[#faf5eb] p-6 rounded-xl border border-[#d4c4a8] space-y-5 shadow-sm">
                                <h4 className="font-bold text-[#5c3a1e] text-lg border-b border-[#d4c4a8] pb-2">Publish New Event</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Event Title *</label>
                                        <input type="text" name="title" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="e.g. Masterclass with Vid. XYZ" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Date & Time *</label>
                                        <input type="text" name="date" required placeholder="e.g. May 24th | 11 AM" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Venue *</label>
                                        <input type="text" name="venue" required placeholder="e.g. Town Hall, Redmond" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Upload Event Image *</label>
                                        <input type="file" name="image" accept="image/*" required className="w-full text-sm text-[#5c3a1e] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e2be93] file:text-[#3d230d] hover:file:bg-[#d4c4a8] file:cursor-pointer p-1" />
                                    </div>
                                </div>

                                {eventFormError && <p className="text-red-700 bg-red-100 p-2 rounded text-sm font-bold border border-red-300">{eventFormError}</p>}
                                
                                <div className="flex justify-end pt-2">
                                    <SubmitButton pendingText="Publishing Event..." defaultText="Confirm & Add Event" />
                                </div>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            {initialEvents.map(ev => (
                                <div key={ev.id} className="border border-[#d4c4a8] rounded-xl overflow-hidden shadow-sm bg-white flex flex-col relative group">
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEventToDelete(ev.id);
                                        }}
                                        className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-50 cursor-pointer"
                                        title="Delete Event"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <div className="h-40 bg-gray-200 relative border-b border-[#d4c4a8]">
                                        <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h4 className="font-bold text-[#3d230d] text-lg leading-tight mb-3 line-clamp-2">{ev.title}</h4>
                                        <div className="mt-auto space-y-1">
                                            <p className="text-sm text-[#7a5c3a] font-medium flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5"/> {ev.date}</p>
                                            <p className="text-sm text-[#7a5c3a] flex items-center gap-1.5"><FileText className="h-3.5 w-3.5"/> {ev.venue}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {initialEvents.length === 0 && !showEventForm && (
                                <div className="col-span-3 text-center py-12 bg-white rounded border border-[#d4c4a8] border-dashed">
                                    <Calendar className="h-8 w-8 text-[#d4c4a8] mx-auto mb-2" />
                                    <p className="text-[#3d230d] font-bold">No upcoming events setup yet.</p>
                                    <p className="text-sm text-[#7a5c3a] mt-1">Click "Add Event" to publish one to the homepage.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {tab === 'blog' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-[#d4c4a8] pb-4">
                            <h3 className="text-xl font-bold text-[#3d230d]">Blog Platform</h3>
                            <button onClick={() => setShowBlogForm(!showBlogForm)} className="flex items-center gap-2 bg-[#3d230d] text-white px-4 py-2 rounded-lg hover:bg-[#2a1809] font-bold shadow">
                                <Plus className="h-4 w-4" /> Add Article
                            </button>
                        </div>
                        
                        {showBlogForm && (
                            <form action={handleAddBlog} className="bg-[#faf5eb] p-6 rounded-xl border border-[#d4c4a8] space-y-5 shadow-sm">
                                <h4 className="font-bold text-[#5c3a1e] text-lg border-b border-[#d4c4a8] pb-2">Publish New Article</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Article Title *</label>
                                        <input type="text" name="title" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="e.g. The Evolution of Carnatic Ragas" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Author *</label>
                                        <input type="text" name="author" required placeholder="e.g. Vid.XYZ" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Estimated Read Time *</label>
                                        <input type="text" name="readTime" required placeholder="e.g. 5 min read" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Upload Cover Image *</label>
                                        <input type="file" name="image" accept="image/*" required className="w-full text-sm text-[#5c3a1e] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e2be93] file:text-[#3d230d] hover:file:bg-[#d4c4a8] file:cursor-pointer p-1" />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Article Content *</label>
                                        <textarea name="content" required rows={10} className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="Write your full article here..."></textarea>
                                    </div>
                                </div>

                                {blogFormError && <p className="text-red-700 bg-red-100 p-2 rounded text-sm font-bold border border-red-300">{blogFormError}</p>}
                                
                                <div className="flex justify-end pt-2">
                                    <SubmitButton pendingText="Publishing Article..." defaultText="Confirm & Post Article" />
                                </div>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            {initialBlogPosts.map(post => (
                                <div key={post.id} className="border border-[#d4c4a8] rounded-xl overflow-hidden shadow-sm bg-white flex flex-col relative group">
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setBlogToDelete(post.id);
                                        }}
                                        className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-50 cursor-pointer"
                                        title="Delete Article"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <div className="h-40 bg-gray-200 relative border-b border-[#d4c4a8]">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h4 className="font-bold text-[#3d230d] text-lg leading-tight mb-3 line-clamp-2">{post.title}</h4>
                                        <div className="mt-auto space-y-1">
                                            <p className="text-sm text-[#7a5c3a] font-medium flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5"/> {post.read_time}</p>
                                            <p className="text-sm text-[#7a5c3a] flex items-center gap-1.5"><Users className="h-3.5 w-3.5"/> {post.author}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {initialBlogPosts.length === 0 && !showBlogForm && (
                                <div className="col-span-3 text-center py-12 bg-white rounded border border-[#d4c4a8] border-dashed">
                                    <BookOpen className="h-8 w-8 text-[#d4c4a8] mx-auto mb-2" />
                                    <p className="text-[#3d230d] font-bold">No blog articles published yet.</p>
                                    <p className="text-sm text-[#7a5c3a] mt-1">Click "Add Article" to post one to the blog.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {tab === 'directory' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-[#d4c4a8] pb-4">
                            <h3 className="text-xl font-bold text-[#3d230d]">Teacher Directory Management</h3>
                            <button onClick={() => setShowDirForm(!showDirForm)} className="flex items-center gap-2 bg-[#3d230d] text-white px-4 py-2 rounded-lg hover:bg-[#2a1809] font-bold shadow">
                                <Plus className="h-4 w-4" /> Add Entry
                            </button>
                        </div>
                        
                        {showDirForm && (
                            <form action={handleAddDirectory} className="bg-[#faf5eb] p-6 rounded-xl border border-[#d4c4a8] space-y-5 shadow-sm">
                                <h4 className="font-bold text-[#5c3a1e] text-lg border-b border-[#d4c4a8] pb-2">Add New Directory Entry</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Organization Name *</label>
                                        <input type="text" name="name" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="e.g. Seattle Violin Academy" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Email *</label>
                                        <input type="email" name="email" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="contact@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Phone *</label>
                                        <input type="tel" name="phone" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="(425) 555-0100" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Location *</label>
                                        <input type="text" name="location" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="e.g. Redmond, WA" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Services * <span className="font-normal text-xs text-[#7a5c3a]">(comma-separated)</span></label>
                                        <input type="text" name="services" required className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="e.g. Vocal Carnatic, Violin Lessons, Workshops" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Website <span className="font-normal text-xs text-[#7a5c3a]">(optional)</span></label>
                                        <input type="url" name="website" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Facebook <span className="font-normal text-xs text-[#7a5c3a]">(optional)</span></label>
                                        <input type="url" name="facebook" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="https://facebook.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Instagram <span className="font-normal text-xs text-[#7a5c3a]">(optional)</span></label>
                                        <input type="url" name="instagram" className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-[#3d230d] focus:border-[#3d230d]" placeholder="https://instagram.com/..." />
                                    </div>
                                </div>

                                {dirFormError && <p className="text-red-700 bg-red-100 p-2 rounded text-sm font-bold border border-red-300">{dirFormError}</p>}
                                
                                <div className="flex justify-end pt-2">
                                    <SubmitButton pendingText="Adding..." defaultText="Confirm & Add Entry" />
                                </div>
                            </form>
                        )}

                        {/* Directory Entries Table */}
                        <div className="overflow-x-auto border border-[#d4c4a8] rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#3d230d] text-white font-medium uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3">Organization</th>
                                        <th className="px-4 py-3">Contact</th>
                                        <th className="px-4 py-3">Services</th>
                                        <th className="px-4 py-3">Location</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#d4c4a8] bg-white">
                                    {initialDirectory.map((entry: any) => (
                                        <tr key={entry.id} className="hover:bg-[#faf5eb] transition-colors">
                                            <td className="px-4 py-3 font-semibold text-[#3d230d]">{entry.name}</td>
                                            <td className="px-4 py-3 text-[#7a5c3a]">
                                                <div>{entry.email}</div>
                                                <div className="text-xs">{entry.phone}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {(entry.services || []).map((s: string, i: number) => (
                                                        <span key={i} className="bg-[#5c3a1e] text-white text-xs px-2 py-0.5 rounded-full">{s}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-[#7a5c3a]">{entry.location}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setDirToDelete(entry.id)}
                                                    className="text-red-600 hover:text-red-800 font-bold text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {initialDirectory.length === 0 && !showDirForm && (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-[#7a5c3a]">
                                                <MapPin className="h-8 w-8 text-[#d4c4a8] mx-auto mb-2" />
                                                <p className="text-[#3d230d] font-bold">No directory entries yet.</p>
                                                <p className="text-sm mt-1">Click "Add Entry" to add a school or teacher to the directory.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Confirmation Modal */}
            {eventToDelete !== null && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#faf5eb] rounded-xl shadow-xl max-w-sm w-full p-6 border border-[#d4c4a8]">
                        <h3 className="text-xl font-bold text-[#3d230d] mb-2 font-serif">Delete Event?</h3>
                        <p className="text-[#7a5c3a] text-sm mb-6">Are you absolutely sure you want to permanently delete this event? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => setEventToDelete(null)}
                                className="px-4 py-2 border border-[#d4c4a8] rounded-md text-[#5c3a1e] font-bold hover:bg-white transition-colors shadow-sm bg-[#faf5eb]"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    handleDeleteEvent(eventToDelete);
                                    setEventToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors shadow-sm"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {blogToDelete !== null && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#faf5eb] rounded-xl shadow-xl max-w-sm w-full p-6 border border-[#d4c4a8]">
                        <h3 className="text-xl font-bold text-[#3d230d] mb-2 font-serif">Delete Article?</h3>
                        <p className="text-[#7a5c3a] text-sm mb-6">Are you absolutely sure you want to permanently delete this article? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => setBlogToDelete(null)}
                                className="px-4 py-2 border border-[#d4c4a8] rounded-md text-[#5c3a1e] font-bold hover:bg-white transition-colors shadow-sm bg-[#faf5eb]"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    handleDeleteBlog(blogToDelete);
                                    setBlogToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors shadow-sm"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {dirToDelete !== null && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#faf5eb] rounded-xl shadow-xl max-w-sm w-full p-6 border border-[#d4c4a8]">
                        <h3 className="text-xl font-bold text-[#3d230d] mb-2 font-serif">Delete Entry?</h3>
                        <p className="text-[#7a5c3a] text-sm mb-6">Are you sure you want to remove this directory entry? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => setDirToDelete(null)}
                                className="px-4 py-2 border border-[#d4c4a8] rounded-md text-[#5c3a1e] font-bold hover:bg-white transition-colors shadow-sm bg-[#faf5eb]"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    handleDeleteDirectory(dirToDelete);
                                    setDirToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors shadow-sm"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

