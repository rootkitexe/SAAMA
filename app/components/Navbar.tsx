'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

type NavItem = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
    {
        label: 'About',
        href: '/about',
        children: [
            { label: 'The Committee', href: '/about/committee' },
            { label: 'Titles & Awards', href: '/about/awards' },
            { label: 'Blog', href: '/about/blog' },
            { label: 'Code of Conduct', href: '/about/code-of-conduct' }
        ]
    },
    {
        label: 'The Festival',
        href: '/festival',
        children: [
            { label: 'Schedule', href: '/festival' },
            { label: 'Tickets', href: '/festival/tickets' },
            { label: 'Pancharathnam', href: '/festival/pancharathnam' },
            { label: 'Directions', href: '/festival/directions' },
            { label: 'Accommodations', href: '/festival/accommodations' }
        ]
    },
    { label: 'Competitions', href: '/competitions' },
    { label: 'Support Us', href: '/support' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

    const toggleMobileSubmenu = (label: string) => {
        setMobileSubmenuOpen(mobileSubmenuOpen === label ? null : label);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary" /> {/* Placeholder for Logo */}
                    <span className="text-xl font-bold tracking-tight text-white">
                        SAAMA <span className="text-primary font-normal">Seattle</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                href={item.href}
                                className="flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                            >
                                {item.label}
                                {item.children && <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-white" />}
                            </Link>

                            {/* Desktop Dropdown */}
                            {item.children && (
                                <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-48">
                                    <div className="rounded-md border border-white/10 bg-black shadow-xl ring-1 ring-black ring-opacity-5 py-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/login"
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                    >
                        Portal Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white md:hidden"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="border-t border-white/10 bg-black md:hidden max-h-[85vh] overflow-y-auto">
                    <div className="flex flex-col space-y-1 px-4 py-4">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleMobileSubmenu(item.label)}
                                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === item.label ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                        {mobileSubmenuOpen === item.label && (
                                            <div className="ml-4 flex flex-col space-y-1 border-l border-white/10 pl-4">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:text-white"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link
                                href="/portal"
                                onClick={() => setIsOpen(false)}
                                className="block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-semibold text-white"
                            >
                                Portal Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
