'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToContent() {
    const pathname = usePathname();

    useEffect(() => {
        // Only scroll on non-homepage routes
        if (pathname === '/') return;

        // Skip on mobile — banner is compact, no need to scroll past it
        if (window.innerWidth < 768) return;

        // Check if the URL has #content hash
        if (window.location.hash === '#content') {
            // Start at top
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

            // After 2 seconds, smooth scroll to content
            const timer = setTimeout(() => {
                const el = document.getElementById('content');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return null;
}
