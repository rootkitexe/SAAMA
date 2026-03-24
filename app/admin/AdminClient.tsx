'use client';

import React, { useState } from 'react';
import { Download, Users, FileText, ChevronDown, ChevronUp } from 'lucide-react';

type Profile = any;
type Registration = any;

interface Props {
    initialProfiles: Profile[];
    initialRegistrations: Registration[];
}

export default function AdminClient({ initialProfiles, initialRegistrations }: Props) {
    const [tab, setTab] = useState<'registrations' | 'users'>('registrations');
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

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
            </div>
        </div>
    );
}

