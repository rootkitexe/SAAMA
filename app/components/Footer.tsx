import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-[#d4c4a8] bg-[#faf5eb] py-12">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-[#7a5c3a] font-medium">
                    &copy; {new Date().getFullYear()} SAAMA Seattle Festival. All rights reserved.
                </p>
                <div className="mt-4 flex justify-center gap-6">
                    <Link href="/privacy" className="text-xs font-bold text-[#7a5c3a] hover:text-[#3d230d] transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/contact" className="text-xs font-bold text-[#7a5c3a] hover:text-[#3d230d] transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}

